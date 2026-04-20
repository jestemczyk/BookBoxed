import { Link } from "react-router";

export const BookPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-[#101828] text-white">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <Link
                    to="/books"
                    className="group inline-flex items-center gap-2 bg-[#1e2a3a] hover:bg-[#1e2045] px-4 py-2 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-all duration-200 mb-8"
                >
                    <svg
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span className="text-sm font-medium">Back to search</span>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 mb-8">
                    <div className="bg-[#1e2a3a] rounded-2xl shadow-xl relative overflow-hidden animate-pulse w-[340px] h-[520px]"></div>

                    <div className="bg-[#1e2a3a] rounded-2xl p-6 shadow-xl animate-pulse"></div>
                </div>

                <div className="bg-[#1e2a3a] rounded-xl p-5 shadow-xl h-50 animate-pulse"></div>
            </div>
        </div>
    );
};
