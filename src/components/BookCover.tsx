export const BookCover = (props: {
    coverI: number;
    title: string;
    numOfPages: number;
}) => {
    return (
        <div className="bg-[#1e2a3a] rounded-2xl shadow-xl relative overflow-hidden w-[340px] h-[520px]">
            {props.coverI ? (
                <>
                    <img
                        src={`https://covers.openlibrary.org/b/id/${props.coverI}-L.jpg`}
                        alt={props.title}
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/340x500?text=No+Cover";
                        }}
                    />
                    <div className="absolute bottom-3 right-3 z-10">
                        <span className="text-xs bg-gray-800/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/90 font-medium shadow-lg">
                            {props.numOfPages
                                ? `${props.numOfPages} pages`
                                : "Pages unknown"}
                        </span>
                    </div>
                </>
            ) : (
                <div className="w-full aspect-[2/3] flex items-center justify-center text-[#596272]">
                    📖 No cover
                </div>
            )}
        </div>
    );
};
