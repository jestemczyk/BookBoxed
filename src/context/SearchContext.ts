import type { Book } from "@/api/openLibrary";
import { createContext, useContext } from "react";

interface booksContextType {
    query: string;
    setQuery: (query: string) => void;
    isLoading: boolean;
    setIsLoading: (query: boolean) => void;
    error: string;
    setError: (query: string) => void;
    books: Book[];
    setBooks: (query: Book[]) => void;
    searchSubmit: (pageNumber: number, isSearch: boolean) => Promise<void>;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    toNextPage: (isSearch: boolean) => void;
    toPrevPage: (isSearch: boolean) => void;
    isSearchMode: boolean;
    setIsSearchMode: (query: boolean) => void;
}

export const SearchContext = createContext<booksContextType | undefined>(
    undefined,
);
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useBooks must be used within BooksProvider");
    }
    return context;
};
