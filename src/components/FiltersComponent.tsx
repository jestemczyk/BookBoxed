import { useState } from "react";
import { FILTERS } from "../constants";

import { useSearchContext } from "@/context/SearchContext";
import { FilterComponent } from "./FilterComponent";

export const FiltersComponent = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const {
        isLoading,
        yearFilterValue,
        setYearFilterValue,
        genreFilterValue,
        setGenreFilterValue,
        otherFilterValue,
        setOtherFilterValue,
    } = useSearchContext();
    return (
        <div>
            <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden flex items-center justify-between w-full text-sm font-medium text-gray-300 hover:text-white mb-2"
            >
                <span>BROWSE BY</span>
                <svg
                    className={`w-5 h-5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            <div className={`${isFilterOpen ? "block" : "hidden"} md:block`}>
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
                    <span className="font-medium text-gray-300 hidden md:block">
                        BROWSE BY
                    </span>
                    <FilterComponent
                        title="YEAR"
                        filters={FILTERS.YEAR}
                        value={yearFilterValue}
                        setValue={setYearFilterValue}
                    />
                    <FilterComponent
                        title="GENRE"
                        filters={FILTERS.GENRE}
                        value={genreFilterValue}
                        setValue={setGenreFilterValue}
                    />
                    <FilterComponent
                        title="OTHER"
                        filters={FILTERS.OTHER}
                        value={otherFilterValue}
                        setValue={setOtherFilterValue}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer px-4 py-2 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-800 hover:border-gray-500 transition-all md:ml-auto w-full md:w-auto md:text-xs text-center mt-2 md:mt-0 mr-2 font-medium"
                    >
                        {isLoading ? "FINDING..." : "FIND A BOOK"}
                    </button>
                </div>
            </div>
        </div>
    );
};
