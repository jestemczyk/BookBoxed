import { useSearchContext } from "@/context/SearchContext";
import { BackButton } from "./BackButton";

export const BookPageSkeleton = () => {
    const { backButtonPath } = useSearchContext();
    return (
        <div className="min-h-screen bg-[#101828] text-white">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <BackButton path={backButtonPath} />

                <div className="flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-[340px_1fr] gap-8 mb-8">
                    <div className="bg-[#1e2a3a] rounded-2xl shadow-xl relative overflow-hidden animate-pulse w-[340px] h-[520px]"></div>

                    <div className="bg-[#1e2a3a] rounded-2xl p-6 shadow-xl animate-pulse w-full h-60 lg:h-full"></div>
                </div>

                <div className="bg-[#1e2a3a] rounded-xl p-5 shadow-xl h-50 animate-pulse"></div>
            </div>
        </div>
    );
};
