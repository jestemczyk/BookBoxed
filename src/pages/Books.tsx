import { FiltersComponent } from "@/components/FiltersComponent";
import { SearchComponent } from "@/components/SearchComponent";
import { BooksComponent } from "@/components/BooksComponent";
import { useSearchContext } from "@/context/SearchContext";
import { PaginationComponent } from "@/components/PaginationComponent";

export const Books = () => {
    const { searchSubmit, setIsSearchMode, setCurrentPage } =
        useSearchContext();
    return (
        <div className="border-b border-gray-800 pb-4 mb-6">
            <form
                className="p-5 bg-[#101828] rounded-lg"
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsSearchMode(true);
                    setCurrentPage(1);
                    searchSubmit(1, true);
                }}
            >
                <SearchComponent />
                <FiltersComponent />
            </form>

            <BooksComponent />
            <PaginationComponent />
        </div>
    );
};
