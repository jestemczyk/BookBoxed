import { createContext, useState, type ReactNode } from "react";

interface booksContextType {
    query: string;
    setQuery: (query: string) => void;
    isLoading: boolean;
    setIsLoading: (query: boolean) => void;
}

const SearchContext = createContext<booksContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <SearchContext.Provider
            value={{
                query,
                setQuery,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
