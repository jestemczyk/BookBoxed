import { type Book } from "../api/openLibrary";
export const BookMiniCard = ({ book, key }: { book: Book; key: string }) => {
    return (
        <div
            key={key}
            className="border border-gray-200 rounded-lg cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
        >
            {book.thumbnail ? (
                <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-100 object-fill"
                />
            ) : (
                <div className="w-full h-100 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    No thumbnail
                </div>
            )}

            <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2">
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
    );
};
