import { useState, type ReactNode } from "react";
import { SearchContext, type Shelf } from "./SearchContext";
import {
    getBooksByName,
    getPopularBooks,
    renderBooks,
    type BookCard,
    type OpenLibraryResponse,
} from "@/api/openLibrary";

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [books, setBooks] = useState<BookCard[]>([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [yearFilterValue, setYearFilterValue] = useState("None");
    const [genreFilterValue, setGenreFilterValue] = useState("None");
    const [otherFilterValue, setOtherFilterValue] = useState("None");
    const [backButtonPath, setBackButtonPath] = useState("/books");
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

    const searchSubmit = async (pageNumber: number) => {
        try {
            setIsLoading(true);

            const offset = (pageNumber - 1) * 50;
            let booksData: OpenLibraryResponse;
            if (query) {
                booksData = (await getBooksByName(
                    query,
                    offset,
                    yearFilterValue,
                    genreFilterValue,
                    otherFilterValue,
                )) as OpenLibraryResponse;
            } else {
                booksData = (await getPopularBooks(
                    offset,
                )) as OpenLibraryResponse;
            }

            if (booksData && booksData.docs) {
                const PagesCount = Math.ceil(booksData.num_found / 50);
                setTotalPages(PagesCount < 1000 ? PagesCount : 999);
                setBooks(renderBooks(booksData));
            } else {
                setBooks([]);
                setTotalPages(1);
            }
        } catch (err) {
            setError("Failed to load books");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const toNextPage = () => {
        if (currentPage < totalPages) {
            searchSubmit(currentPage + 1);
            setCurrentPage((prev) => prev + 1);
        }
    };

    const toPrevPage = () => {
        if (currentPage > 1) {
            searchSubmit(currentPage - 1);
            setCurrentPage((prev) => prev - 1);
        }
    };

    const onAddToShelf = (
        shelfId: number,
        bookId: string,
        bookTitle: string,
        bookAuthors: string[],
        bookThumbnail: string,
        bookPublishYear: number,
    ) => {
        const newBook = {
            id: bookId,
            title: bookTitle,
            authors: bookAuthors,
            thumbnail: bookThumbnail,
            publishedDate: String(bookPublishYear),
        };
        const updatedShelves = shelves.map((shelf) => {
            if (shelf.id === shelfId) {
                return {
                    ...shelf,
                    books: [...shelf.books, newBook],
                };
            }
            return shelf;
        });

        setShelves(updatedShelves);
        localStorage.setItem("bookboxdShelves", JSON.stringify(updatedShelves));
    };

    const onRemoveFromShelf = (shelfId: number, bookId: string) => {
        const updatedShelves = shelves.map((shelf) => {
            if (shelf.id === shelfId) {
                return {
                    ...shelf,
                    books: shelf.books.filter((book) => book.id !== bookId),
                };
            }
            return shelf;
        });

        setShelves(updatedShelves);
        localStorage.setItem("bookboxdShelves", JSON.stringify(updatedShelves));
    };

    return (
        <SearchContext.Provider
            value={{
                query,
                setQuery,
                isLoading,
                setIsLoading,
                error,
                setError,
                books,
                setBooks,
                searchSubmit,
                totalPages,
                toNextPage,
                toPrevPage,
                currentPage,
                setCurrentPage,
                yearFilterValue,
                setYearFilterValue,
                genreFilterValue,
                setGenreFilterValue,
                otherFilterValue,
                setOtherFilterValue,
                shelves,
                setShelves,
                onAddToShelf,
                onRemoveFromShelf,
                backButtonPath,
                setBackButtonPath,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
