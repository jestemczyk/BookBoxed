import { Link } from "react-router";
import { type BookCard } from "../api/openLibrary";
import { Trash2 } from "lucide-react";
import { useSearchContext } from "@/context/SearchContext";

export const BookMiniCard = ({
    book,
    key,
    onRemoveFromShelf,
    shelfId,
}: {
    book: BookCard;
    key: string;
    onRemoveFromShelf?: (shelfId: number, bookId: string) => void;
    shelfId?: number;
}) => {
    const { setBackButtonPath } = useSearchContext();

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onRemoveFromShelf && shelfId) {
            onRemoveFromShelf(shelfId, book.id);
        }
    };

    return (
        <div className="relative group">
            <Link
                to={`/book/${book.id}`}
                onClick={() => {
                    if (onRemoveFromShelf) {
                        setBackButtonPath(`/bookshelves/${shelfId}`);
                    } else {
                        setBackButtonPath("/books");
                    }
                }}
            >
                <div
                    key={key}
                    className="border border-gray-800 rounded-lg cursor-pointer overflow-hidden hover:shadow-lg transition-shadow w-80 h-120 sm:w-auto"
                >
                    {book.thumbnail ? (
                        <img
                            src={book.thumbnail}
                            alt={book.title}
                            className="w-full h-100 object-fill"
                        />
                    ) : (
                        <div className="w-full h-100 bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
                            No thumbnail
                        </div>
                    )}

                    <div className="p-3 h-15">
                        <h3 className="font-medium text-sm line-clamp-2 text-white">
                            {book.title}
                        </h3>
                        <div className="flex justify-between">
                            <p className="text-xs text-gray-500 mt-1">{book.authors[0]}</p>
                            <p className="text-xs text-gray-500 mt-1">{book.publishedDate}</p>
                        </div>
                    </div>
                </div>
            </Link>
            {onRemoveFromShelf && shelfId && (
                <button
                    onClick={handleRemove}
                    className="absolute top-2 right-2 p-2 bg-red-700 hover:bg-red-800 rounded-lg opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-200 shadow-lg cursor-pointer z-10"
                    title="Remove from shelf"
                >
                    <Trash2 className="w-4 h-4 text-white" />
                </button>
            )}
        </div>
    );
};
