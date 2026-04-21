import { Link } from "react-router";

export const BackButton = (props: { path: string }) => {
    return (
        <Link
            to={props.path}
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
            <span className="text-sm font-medium">Back</span>
        </Link>
    );
};
