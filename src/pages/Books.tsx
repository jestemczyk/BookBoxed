import { FiltersComponent } from "@/components/FiltersComponent";
import { SearchComponent } from "@/components/SearchComponent";

export const Books = () => {
  return (
    <div className="border-b border-gray-800 pb-4 mb-6">
      <SearchComponent />
      <FiltersComponent />
    </div>
  );
};
