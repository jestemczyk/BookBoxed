import { useState, type ReactNode } from "react";
import { SearchContext } from "./SearchContext";
import {
    getBooksByName,
    getPopularBooks,
    renderBooks,
    type Book,
    type OpenLibraryResponse,
} from "@/api/openLibrary";

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const searchSubmit = async (isSearch: boolean) => {
        try {
            setIsLoading(true);

            const offset = (currentPage - 1) * 30;
            let booksData: OpenLibraryResponse;
            if (isSearch) {
                booksData = (await getBooksByName(
                    query,
                    offset,
                )) as OpenLibraryResponse;
            } else {
                booksData = (await getPopularBooks(
                    offset,
                )) as OpenLibraryResponse;
            }

            if (booksData && booksData.docs) {
                const totalResults = booksData.num_found || 0;
                setTotalPages(Math.ceil(totalResults / 30));
                setBooks(renderBooks(booksData));
            } else {
                setBooks([]);
                setTotalPages(1);
            }
        } catch (err) {
            setError("Failed to load books");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const toNextPage = (isSearchMode: boolean) => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
            searchSubmit(isSearchMode);
        }
    };

    const toPrevPage = (isSearchMode: boolean) => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            searchSubmit(isSearchMode);
        }
    };

    return (
        <SearchContext.Provider
            value={{
                query,
                setQuery,
                isLoading,
                setIsLoading,
                error,
                setError,
                books,
                setBooks,
                searchSubmit,
                totalPages,
                toNextPage,
                toPrevPage,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
