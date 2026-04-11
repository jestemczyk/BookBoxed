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
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [yearFilterValue, setYearFilterValue] = useState("None");
    const [genreFilterValue, setGenreFilterValue] = useState("None");
    const [otherFilterValue, setOtherFilterValue] = useState("None");

    const searchSubmit = async (pageNumber: number, isSearch: boolean) => {
        try {
            setIsLoading(true);

            const offset = (pageNumber - 1) * 50;
            let booksData: OpenLibraryResponse;
            if (isSearch) {
                booksData = (await getBooksByName(
                    query,
                    offset,
                    yearFilterValue,
                    genreFilterValue,
                    otherFilterValue,
                )) as OpenLibraryResponse;
            } else {
                booksData = (await getPopularBooks(
                    offset,
                )) as OpenLibraryResponse;
            }

            if (booksData && booksData.docs) {
                const PagesCount = Math.ceil(booksData.num_found / 50);
                setTotalPages(PagesCount < 1000 ? PagesCount : 999);
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
            searchSubmit(currentPage + 1, isSearchMode);
            setCurrentPage((prev) => prev + 1);
        }
    };

    const toPrevPage = (isSearchMode: boolean) => {
        if (currentPage > 1) {
            searchSubmit(currentPage - 1, isSearchMode);
            setCurrentPage((prev) => prev - 1);
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
                isSearchMode,
                setIsSearchMode,
                yearFilterValue,
                setYearFilterValue,
                genreFilterValue,
                setGenreFilterValue,
                otherFilterValue,
                setOtherFilterValue,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
