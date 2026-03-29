import { FiltersComponent } from "@/components/FiltersComponent";
import { SearchComponent } from "@/components/SearchComponent";
import { BooksComponent } from "@/components/BooksComponent";

export const Books = () => {
    return (
        <div className="border-b border-gray-800 pb-4 mb-6">
            <div className="p-5 bg-[#101828] rounded-lg">
                <SearchComponent />
                <FiltersComponent />
            </div>

            <BooksComponent />
        </div>
    );
};
