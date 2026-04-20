import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import { ShelfMiniBook } from "./ShelfMiniBook";

interface MiniShelfProps {
    id: number;
    name: string;
    books?: Array<{ title: string; author: string; coverUrl?: string }>;
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

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        deleteShelf(id);
    };

    return (
        <Link
            to={`/bookshelves/${id}`}
            className="flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 hover:bg-gray-800/70 transition-all duration-300 group/shelf border border-gray-700/50 hover:border-gray-600"
        >
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-white group-hover/shelf:text-indigo-300 transition-colors">
                        {name}
                    </h2>
                    <span className="text-gray-400 text-sm group-hover/shelf:text-indigo-300 transition-colors">
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 group/delete cursor-pointer"
                >
                    <Trash2 className="w-3.5 h-3.5 text-red-400 group-hover/delete:text-red-300 transition-colors" />
                    <span className="text-xs text-red-400 group-hover/delete:text-red-300 transition-colors">
                        Delete
                    </span>
                </button>
            </div>

            <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {displayBooks.map((book, idx) => (
                        <ShelfMiniBook
                            key={idx}
                            title={book.title}
                            author={book.author}
                            coverUrl={book.coverUrl}
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
};
