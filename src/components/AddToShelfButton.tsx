import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookPlus, Plus, Check, Library } from "lucide-react";
import { useState } from "react";

const MOCK_SHELVES = [
    { id: 1, name: "Currently Reading", bookCount: 3 },
    { id: 2, name: "Want to Read", bookCount: 12 },
    { id: 3, name: "Read", bookCount: 8 },
    { id: 4, name: "Favorites", bookCount: 5 },
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
    const [selectedShelf, setSelectedShelf] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleAddToShelf = (shelfId: number, shelfName: string) => {
        setSelectedShelf(shelfId);
        onAddToShelf?.(shelfId, bookId);

        // Показываем уведомление (можно заменить на toast)
        console.log(`Книга "${bookTitle}" добавлена на полку "${shelfName}"`);

        // Закрываем меню через секунду
        setTimeout(() => setIsOpen(false), 500);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-[#1e2a3a] border-gray-700 hover:bg-indigo-600 hover:border-indigo-500 text-white transition-all"
                >
                    <BookPlus className="w-4 h-4" />
                    {selectedShelf ? (
                        <span className="text-xs">Added to shelf</span>
                    ) : (
                        <span className="text-xs">Add to shelf</span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-56 bg-[#1e2a3a] border-gray-700 text-white"
                align="end"
            >
                <DropdownMenuLabel className="text-xs text-gray-400 font-normal">
                    Choose a shelf
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />

                {MOCK_SHELVES.map((shelf) => (
                    <DropdownMenuItem
                        key={shelf.id}
                        onClick={() => handleAddToShelf(shelf.id, shelf.name)}
                        className="cursor-pointer hover:bg-indigo-600/20 focus:bg-indigo-600/20 group"
                    >
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Library className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-400" />
                                <span className="text-sm">{shelf.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                    {shelf.bookCount}
                                </span>
                                {selectedShelf === shelf.id && (
                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                )}
                            </div>
                        </div>
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator className="bg-gray-700" />

                <DropdownMenuItem
                    className="cursor-pointer hover:bg-indigo-600/20 focus:bg-indigo-600/20 text-indigo-400"
                    onClick={() => console.log("Create new shelf")}
                >
                    <div className="flex items-center gap-2">
                        <Plus className="w-3.5 h-3.5" />
                        <span className="text-sm">Create new shelf</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
