import { useState } from "react";
import { FILTERS } from "../constants";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const FiltersComponent = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [position, setPosition] = useState("bottom");
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

                    {FILTERS.map((filter) => (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="" asChild>
                                <Button
                                    variant="outline"
                                    className="border-[#6a7282] text-white hover:bg-[#101828] hover:text-white transition-colors"
                                >
                                    {filter.title}
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-32 bg-[#131313] border border-[#6a7282] shadow-lg rounded-lg">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="text-white font-semibold">
                                        Choose option
                                    </DropdownMenuLabel>

                                    <DropdownMenuRadioGroup
                                        value={position}
                                        onValueChange={setPosition}
                                    >
                                        <DropdownMenuRadioItem
                                            value="top"
                                            className="text-[#6a7282] hover:text-white hover:bg-[#101828] focus:bg-[#101828] focus:text-white cursor-pointer"
                                        >
                                            Top
                                        </DropdownMenuRadioItem>

                                        <DropdownMenuRadioItem
                                            value="bottom"
                                            className="text-[#6a7282] hover:text-white hover:bg-[#101828] focus:bg-[#101828] focus:text-white cursor-pointer"
                                        >
                                            Bottom
                                        </DropdownMenuRadioItem>

                                        <DropdownMenuRadioItem
                                            value="right"
                                            className="text-[#6a7282] hover:text-white hover:bg-[#101828] focus:bg-[#101828] focus:text-white cursor-pointer"
                                        >
                                            Right
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
                    <button className="cursor-pointer px-4 py-2 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-800 hover:border-gray-500 transition-all md:ml-auto w-full md:w-auto md:text-xs text-center mt-2 md:mt-0 mr-2 font-medium">
                        FIND A BOOK
                    </button>
                </div>
            </div>
        </div>
    );
};
