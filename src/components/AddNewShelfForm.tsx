import type { Shelf } from "@/pages/Bookshelves";
import { X, BookMarked } from "lucide-react";
import { useRef } from "react";

export const AddNewShelfForm = (props: {
    setIsModalOpen: (value: boolean) => void;
    setShelves: (value: Shelf[]) => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    function addNewShelf() {
        if (inputRef.current) {
            const currentData = JSON.parse(
                localStorage.getItem("bookboxdShelves") || "[]",
            );
            currentData.push({
                id: Date.now(),
                name: inputRef.current.value,
                books: [],
            });
            localStorage.setItem(
                "bookboxdShelves",
                JSON.stringify(currentData),
            );
            props.setShelves(currentData);

            inputRef.current.value = "";
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addNewShelf();
                props.setIsModalOpen(false);
            }}
        >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
                <div className="bg-gray-800 rounded-xl shadow-xl">
                    <div className="flex items-center justify-between p-5 border-b border-gray-700">
                        <div className="flex items-center gap-2">
                            <BookMarked size={20} className="text-indigo-400" />
                            <h2 className="text-lg font-semibold">
                                Create new shelf
                            </h2>
                        </div>
                        <button
                            onClick={() => props.setIsModalOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-5">
                        <input
                            type="text"
                            ref={inputRef}
                            placeholder="Shelf name..."
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex gap-3 p-5 pt-0">
                        <button
                            onClick={() => props.setIsModalOpen(false)}
                            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
