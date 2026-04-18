import { useEffect } from "react";
import { BookMiniCard } from "./BookMiniCard";
import { useSearchContext } from "@/context/SearchContext";
import { BookMiniCardSkeleton } from "./BookMiniCardSkeleton";

export const BooksComponent: React.FC = () => {
    const {
        isLoading,
        books,
        error,
        searchSubmit,
        isSearchMode,
        setIsSearchMode,
        currentPage,
    } = useSearchContext();

    useEffect(() => {
        setIsSearchMode(false);
        searchSubmit(currentPage, isSearchMode);
    }, []);

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {Array(10)
                    .fill(null)
                    .map((_, index) => (
                        <BookMiniCardSkeleton key={index} />
                    ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 ">
                No books found
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {books.map((book) => (
                <BookMiniCard key={book.id} book={book} />
            ))}
        </div>
    );
};
