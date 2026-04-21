import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchContext } from "@/context/SearchContext";
import { BookPlus, Check, Library } from "lucide-react";
import { useState } from "react";

type AddToShelfButtonProps = {
    bookId: string;
    bookTitle: string;
    bookThumbnail: string;
    bookPublishYear: number;
    bookAuthors: string[];
};

export const AddToShelfButton = ({
    bookId,
    bookTitle,
    bookThumbnail,
    bookAuthors,
    bookPublishYear,
}: AddToShelfButtonProps) => {
    const { shelves, onAddToShelf, onRemoveFromShelf } = useSearchContext();
    const [selectedShelves, setSelectedShelves] = useState<number[]>(() => {
        return shelves
            .filter((shelf) => shelf.books.some((book) => book.id === bookId))
            .map((shelf) => shelf.id);
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            const currentShelvesWithBook = shelves
                .filter((shelf) =>
                    shelf.books.some((book) => book.id === bookId),
                )
                .map((shelf) => shelf.id);
            setSelectedShelves(currentShelvesWithBook);
        }
    };

    const handleAddToShelf = (shelfId: number) => {
        const isAlreadyOnShelf = selectedShelves.includes(shelfId);

        if (isAlreadyOnShelf) {
            onRemoveFromShelf?.(shelfId, bookId);
            setSelectedShelves((prev) => prev.filter((id) => id !== shelfId));
        } else {
            onAddToShelf(
                shelfId,
                bookId,
                bookTitle,
                bookAuthors,
                bookThumbnail,
                bookPublishYear,
            );
            setSelectedShelves((prev) => [...prev, shelfId]);
        }
    };

    const isOnShelf = (shelfId: number) => selectedShelves.includes(shelfId);

    return (
        <div className="lg:absolute lg:bottom-10 lg:right-5">
            <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 lg:px-10 px-5 py-5 bg-indigo-950/60 hover:bg-indigo-800 border-indigo-800 text-white transition-all cursor-pointer"
                    >
                        <BookPlus className="w-5 h-5" />
                        <span className="text-base font-medium">
                            {selectedShelves.length > 0
                                ? `On ${selectedShelves.length} shel${selectedShelves.length > 1 ? "ves" : "f"}`
                                : "Add to shelf"}
                        </span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="w-64 bg-[#1e2a3a] border-gray-700 text-white"
                    align="end"
                >
                    <DropdownMenuLabel className="text-sm text-gray-400 font-normal">
                        Choose shelves (can select multiple)
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />

                    {shelves.map((shelf) => (
                        <DropdownMenuItem
                            key={shelf.id}
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddToShelf(shelf.id);
                            }}
                            className="cursor-pointer hover:bg-indigo-600/20 focus:bg-indigo-600/20 group"
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <Library className="w-4 h-4 text-gray-400 group-hover:text-indigo-400" />
                                    <span className="text-sm">
                                        {shelf.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">
                                        {shelf.books.length}
                                    </span>
                                    {isOnShelf(shelf.id) && (
                                        <Check className="w-4 h-4 text-green-500" />
                                    )}
                                </div>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
