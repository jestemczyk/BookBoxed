import { getBooks, type Book } from "@/api/googleBooks";
import { useEffect, useState } from "react";

export const BooksComponent: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const booksData = await getBooks(20, "");
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
            <div className="text-center py-8 text-gray-500">Find a book</div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="border border-gray-200 rounded-lg cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
                >
                    {book.thumbnail ? (
                        <img
                            src={book.thumbnail}
                            alt={book.title}
                            className="w-full h-80 object-cover"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                            Нет обложки
                        </div>
                    )}

                    <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-2">
                            {book.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {book.authors[0]}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
