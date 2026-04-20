import { Link } from "react-router";
import { type BookCard } from "../api/openLibrary";
export const BookMiniCard = ({
    book,
    key,
}: {
    book: BookCard;
    key: string;
}) => {
    return (
        <Link to={`/book/${book.id}`}>
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
                        <p className="text-xs text-gray-500 mt-1">
                            {book.authors[0]}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {book.publishedDate}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};
