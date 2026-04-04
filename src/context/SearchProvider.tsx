import { useState, type ReactNode } from "react";
import { SearchContext } from "./SearchContext";
import { getBooksByName, getPopularBooks, type Book } from "@/api/openLibrary";

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
            const booksData = isSearch
                ? await getBooksByName(query, offset)
                : await getPopularBooks(offset);

            setBooks(booksData);
            setError("");
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
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
