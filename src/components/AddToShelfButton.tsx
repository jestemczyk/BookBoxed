import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookPlus, Check, Library } from "lucide-react";
import { useState } from "react";

const MOCK_SHELVES = [
    { id: 1, name: "Currently Reading", bookCount: 3 },
    { id: 2, name: "Want to Read", bookCount: 12 },
    { id: 3, name: "Read", bookCount: 8 },
    { id: 4, name: "Favorites", bookCount: 5 },
    { id: 5, name: "DNF", bookCount: 2 },
    { id: 5, name: "DNF", bookCount: 2 },
    { id: 5, name: "DNF", bookCount: 2 },
    { id: 5, name: "DNF", bookCount: 2 },
    { id: 5, name: "DNF", bookCount: 2 },
    { id: 5, name: "DNF", bookCount: 2 },
    { id: 5, name: "DNF", bookCount: 2 },
];

type AddToShelfButtonProps = {
    bookId: string;
    bookTitle: string;
    onAddToShelf?: (shelfId: number, bookId: string) => void;
};

export const AddToShelfButton = ({
    bookId,
    bookTitle,
    onAddToShelf,
}: AddToShelfButtonProps) => {
    const [selectedShelves, setSelectedShelves] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleAddToShelf = (shelfId: number, shelfName: string) => {
        setSelectedShelves((prev) => {
            if (prev.includes(shelfId)) {
                console.log(
                    `Книга "${bookTitle}" удалена с полки "${shelfName}"`,
                );
                onAddToShelf?.(shelfId, bookId);
                return prev.filter((id) => id !== shelfId);
            } else {
                console.log(
                    `Книга "${bookTitle}" добавлена на полку "${shelfName}"`,
                );
                onAddToShelf?.(shelfId, bookId);
                return [...prev, shelfId];
            }
        });
    };

    const isOnShelf = (shelfId: number) => selectedShelves.includes(shelfId);

    return (
        <div className="lg:absolute lg:bottom-10 lg:right-5">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 lg:px-10 px-5 py-5 bg-indigo-950/60 hover:bg-indigo-800 border-indigo-800  text-white transition-all cursor-pointer "
                    >
                        <BookPlus className="w-5 h-5" />
                        <span className="text-base font-medium">
                            {selectedShelves.length > 0
                                ? `Added to ${selectedShelves.length} shelf${selectedShelves.length > 1 ? "s" : ""}`
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

                    {MOCK_SHELVES.map((shelf) => (
                        <DropdownMenuItem
                            key={shelf.id}
                            onClick={() =>
                                handleAddToShelf(shelf.id, shelf.name)
                            }
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
                                        {shelf.bookCount}
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
