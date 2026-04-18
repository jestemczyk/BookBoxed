export const BookMiniCardSkeleton = () => {
    return (
        <div>
            <div className="border border-gray-800 rounded-lg cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full h-100 bg-gray-100 flex items-center justify-center text-gray-400 text-sm animate-pulse"></div>

                <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 text-white"></h3>
                    <div className="flex justify-between">
                        <p className="text-xs text-gray-500 mt-1"></p>
                        <p className="text-xs text-gray-500 mt-1"></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
