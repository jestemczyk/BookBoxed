import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import { ShelfMiniBook } from "./ShelfMiniBook";
import type { BookCard } from "@/api/openLibrary";

interface MiniShelfProps {
    id: number;
    name: string;
    books?: Array<BookCard>;
    deleteShelf: (id: number) => void;
}

export const MiniShelf = ({
    id,
    name,
    books = [],
    deleteShelf,
}: MiniShelfProps) => {
    const displayBooks = books.slice(0, 7);
    const count = books.length;
    const hasMoreBooks = books.length > 7;

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        deleteShelf(id);
    };

    return (
        <Link
            to={`/bookshelves/${id}`}
            className="flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 hover:bg-gray-800/70 transition-all duration-300 group/shelf border border-gray-700/50 hover:border-gray-600"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-white group-hover/shelf:text-indigo-300 transition-colors">
                        {name}
                    </h2>
                    <span className="text-gray-400 text-xs sm:text-sm group-hover/shelf:text-indigo-300 transition-colors">
                        ({count} books)
                    </span>
                    <svg
                        className="w-4 h-4 text-gray-500 group-hover/shelf:text-indigo-300 group-hover/shelf:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>

                <button
                    onClick={handleDelete}
                    className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 group/delete cursor-pointer"
                >
                    <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400 group-hover/delete:text-red-300 transition-colors" />
                    <span className="text-xs text-red-400 group-hover/delete:text-red-300 transition-colors">
                        Delete
                    </span>
                </button>
            </div>

            <div className="relative">
                <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {displayBooks.map((book, idx) => (
                        <ShelfMiniBook
                            key={idx}
                            title={book.title}
                            author={book.authors[0]}
                            coverUrl={book.thumbnail}
                        />
                    ))}

                    {hasMoreBooks && (
                        <div className="flex items-center justify-center min-w-[100px] group/seeall">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-500 group-hover/shelf:text-indigo-400 transition-colors">
                                    +{books.length - 7}
                                </div>
                                <div className="text-xs text-gray-500 group-hover/shelf:text-indigo-400 transition-colors mt-1">
                                    more
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};
