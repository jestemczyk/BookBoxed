import type { BookCard } from "@/api/openLibrary";
import { createContext, useContext } from "react";

export type Shelf = {
    id: number;
    name: string;
    books: BookCard[];
};

interface booksContextType {
    query: string;
    setQuery: (query: string) => void;
    isLoading: boolean;
    setIsLoading: (query: boolean) => void;
    error: string;
    setError: (query: string) => void;
    books: BookCard[];
    setBooks: (query: BookCard[]) => void;
    searchSubmit: (pageNumber: number) => Promise<void>;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
    toNextPage: () => void;
    toPrevPage: () => void;
    yearFilterValue: string;
    setYearFilterValue: (value: string) => void;
    genreFilterValue: string;
    setGenreFilterValue: (value: string) => void;
    otherFilterValue: string;
    setOtherFilterValue: (value: string) => void;
    shelves: Shelf[];
    setShelves: (value: Shelf[]) => void;
    onAddToShelf: (
        shelfId: number,
        bookId: string,
        bookTitle: string,
        bookAuthors: string[],
        bookThumbnail: string,
        bookPublishYear: number,
    ) => void;

    onRemoveFromShelf: (shelfId: number, bookId: string) => void;
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
