import { useState, type ReactNode } from "react";
import { SearchContext } from "./SearchContext";
import type { Book } from "@/api/openLibrary";

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);

    return (
        <SearchContext.Provider
            value={{
                query,
                setQuery,
                isLoading,
                setIsLoading,
                books,
                setBooks,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
