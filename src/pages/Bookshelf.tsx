import { BackButton } from "@/components/BackButton";
import { BookMiniCard } from "@/components/BookMiniCard";
import { useSearchContext, type Shelf } from "@/context/SearchContext";
import { useParams } from "react-router";

export const Bookshelf = () => {
    const { shelves } = useSearchContext();
    const { shelfId } = useParams();
    const currentShelf = shelves.find(
        (shelf: Shelf) => shelf.id === Number(shelfId),
    );
    if (currentShelf) {
        return (
            <section>
                <BackButton path="/bookshelves" title="Back to shelves" />
                <h1 className="mb-5 text-3xl font-bold ">
                    {currentShelf.name}
                </h1>
                <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                    {currentShelf.books.map((book) => (
                        <BookMiniCard key={book.id} book={book} />
                    ))}
                </div>
            </section>
        );
    } else {
        return (
            <section>
                <h1 className="text-red-600">Something went wrong</h1>
            </section>
        );
    }
};
