import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchContext } from "@/context/SearchContext";

export const PaginationComponent = () => {
    const { currentPage, totalPages, toNextPage, toPrevPage } =
        useSearchContext();

    const handlePrev = () => {
        toPrevPage();
        window.scrollTo(0, 0);
    };

    const handleNext = () => {
        toNextPage();
        window.scrollTo(0, 0);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={handlePrev}
                        className={
                            currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        onClick={handleNext}
                        className={
                            currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
