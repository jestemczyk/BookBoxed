import { useState, type ReactNode } from "react";
import { SearchContext } from "./SearchContext";
import { getBooksByName, type Book } from "@/api/openLibrary";

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState("");

    const searchSubmit = async () => {
        try {
            setIsLoading(true);
            const booksData = await getBooksByName(query);
            setBooks(booksData);
            setError("");
        } catch (err) {
            setError("Failed to load books");
            console.error(err);
        } finally {
            setIsLoading(false);
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
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
