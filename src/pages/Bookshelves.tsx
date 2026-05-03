import { useState } from "react";
import { MiniShelf } from "@/components/MiniShelf";
import { AddNewShelfForm } from "@/components/AddNewShelfForm";
import { useSearchContext } from "@/context/SearchContext";

export const Bookshelves = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { shelves, setShelves } = useSearchContext();

    function deleteShelf(id: number) {
        const newShelves = shelves.filter((shelf) => shelf.id !== id);
        setShelves(newShelves);
        localStorage.setItem("bookboxdShelves", JSON.stringify(newShelves));
    }

    return (
        <div className="min-h-screen text-white px-4 py-6 sm:px-6 md:p-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
                        Bookshelves
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer w-full sm:w-auto"
                    >
                        + New Shelf
                    </button>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    {shelves.map((shelf) => (
                        <MiniShelf
                            key={shelf.id}
                            id={shelf.id}
                            name={shelf.name}
                            books={shelf.books}
                            deleteShelf={deleteShelf}
                        />
                    ))}
                </div>

                {shelves.length === 0 && (
                    <div className="text-center py-12 sm:py-16 bg-gray-700/50 rounded-xl mx-2 sm:mx-0">
                        <svg
                            className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 px-4">
                            No shelves yet
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 mb-4 px-4">
                            Create your first shelf to start organizing books
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg cursor-pointer"
                        >
                            + Create Shelf
                        </button>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <AddNewShelfForm
                    setIsModalOpen={setIsModalOpen}
                    setShelves={setShelves}
                />
            )}
        </div>
    );
};
