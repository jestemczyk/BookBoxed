export const ShelfMiniBook = ({
    title,
    author,
    coverUrl,
}: {
    title: string;
    author: string;
    coverUrl?: string;
}) => {
    return (
        <div className="flex-shrink-0 w-28 cursor-pointer group/book">
            <div className="bg-gray-800 rounded-lg aspect-[2/3] w-full mb-2 overflow-hidden">
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "";
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove(
                                "hidden",
                            );
                        }}
                    />
                ) : null}
                <div
                    className={`w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-gray-500 ${coverUrl ? "hidden" : ""}`}
                >
                    📖
                </div>
            </div>
            <p className="text-xs text-gray-400 truncate">{title}</p>
            <p className="text-xs text-gray-500 truncate">{author}</p>
        </div>
    );
};
