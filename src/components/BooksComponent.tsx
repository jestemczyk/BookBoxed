import { getPopularBooks, type Book } from "@/api/googleBooks";
import { useEffect, useState } from "react";
import { BookMiniCard } from "./BookMiniCard";

export const BooksComponent: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const booksData = await getPopularBooks();
                setBooks(booksData);
                setError("");
            } catch (err) {
                setError("Не удалось загрузить книги");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    if (loading) {
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
