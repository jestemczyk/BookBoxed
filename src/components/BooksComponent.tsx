import { getPopularBooks } from "@/api/openLibrary";
import { useEffect, useState } from "react";
import { BookMiniCard } from "./BookMiniCard";
import { useSearchContext } from "@/context/SearchContext";

export const BooksComponent: React.FC = () => {
    const [error, setError] = useState<string>("");
    const { isLoading, setIsLoading, books, setBooks } = useSearchContext();

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setIsLoading(true);
                const booksData = await getPopularBooks();
                setBooks(booksData);
                setError("");
            } catch (err) {
                setError("Failed to load books");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadBooks();
    }, []);

    if (isLoading) {
        return <div className="text-center py-8 text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">No books found</div>
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
