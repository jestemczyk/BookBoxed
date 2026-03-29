import { useState, type ReactNode } from "react";
import { SearchContext } from "./SearchContext";

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
