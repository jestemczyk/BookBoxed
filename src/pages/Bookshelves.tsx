import { useState } from "react";
import { MiniShelf } from "@/components/MiniShelf";
import { AddNewShelfForm } from "@/components/AddNewShelfForm";

type Book = {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
};

export type Shelf = {
    id: number;
    name: string;
    books: Book[];
};

export const Bookshelves = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [shelves, setShelves] = useState<Shelf[]>(() => {
        try {
            const saved = localStorage.getItem("bookboxdShelves");
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error(error);
        }
        return [];
    });

    function deleteShelf(id: number) {
        const newShelves = shelves.filter((shelf) => shelf.id !== id);
        setShelves(newShelves);
        localStorage.setItem("bookboxdShelves", JSON.stringify(newShelves));
    }

    return (
        <div className="min-h-screen text-white p-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Bookshelves</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                        + New Shelf
                    </button>
                </div>

                <div className="space-y-8">
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
                    <div className="text-center py-16 bg-gray-700/50 rounded-xl">
                        <svg
                            className="w-16 h-16 text-gray-500 mx-auto mb-4"
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
                        <h3 className="text-xl font-semibold mb-2">
                            No shelves yet
                        </h3>
                        <p className="text-gray-400 mb-4">
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
