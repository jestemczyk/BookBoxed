import { useSearchContext } from "@/context/SearchContext";

export const SearchComponent = () => {
    const { setQuery } = useSearchContext();
    return (
        <div className="mb-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for books by title, author, or ISBN..."
                    className="w-full px-4 py-2 pl-10 bg-[#1E2A3A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                    style={{ backgroundColor: "#1E2A3A" }}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <svg
                    className="absolute left-3 top-2.5 w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        </div>
    );
};
