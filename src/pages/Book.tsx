import { getBookById, type BookType } from "@/api/openLibrary";

import { BackButton } from "@/components/BackButton";
import { BookCover } from "@/components/BookCover";
import { BookInfo } from "@/components/BookInfo";
import { BookInfoCard } from "@/components/BookInfoCard";
import { BookPageSkeleton } from "@/components/BookPageSkeleton";

import { useSearchContext } from "@/context/SearchContext";
import { BookCopy, Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const Book = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const { isLoading, setIsLoading } = useSearchContext();
    const [book, setBook] = useState<BookType | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            setIsLoading(true);
            try {
                const workData = (await getBookById(bookId)) as BookType;

                setBook(workData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBook();
    }, []);
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#101828] text-white">
                <BookPageSkeleton />
            </div>
        );
    }
    if (book != null) {
        return (
            <div className="min-h-screen bg-[#101828] text-white">
                <div className="container mx-auto px-4 py-6 max-w-6xl">
                    <BackButton path="/books" title="Back to search" />

                    <div className="flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-[340px_1fr] gap-8 mb-8">
                        <BookCover
                            coverI={book.cover_i}
                            title={book.title}
                            numOfPages={book.number_of_pages_median}
                        />
                        <BookInfo
                            title={book.title}
                            authorName={book.author_name[0]}
                            firstPublishYear={book.first_publish_year}
                            numOfPages={book.number_of_pages_median}
                            rating={book.ratings_average}
                            thumbnail={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                            bookKey={book.key}
                            subject={book.subject}
                        />
                    </div>

                    {book.description && (
                        <div className="bg-[#1e2a3a] rounded-2xl p-6 mb-8 shadow-xl">
                            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span>📖</span> Description
                            </h2>
                            <p className="text-white leading-relaxed">
                                {typeof book.description === "string"
                                    ? book.description
                                    : (book.description as { value: string })
                                          ?.value || "No description available"}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <BookInfoCard title="Identifiers" Icon={BookCopy}>
                            <ul className="space-y-1 text-sm text-[#596272]">
                                {book.isbn?.slice(0, 3).map((isbn, i) => (
                                    <li key={i}>ISBN-13: {isbn}</li>
                                ))}
                                {(!book.isbn || book.isbn.length === 0) && (
                                    <li>No data</li>
                                )}
                            </ul>
                        </BookInfoCard>
                        <BookInfoCard title="Links" Icon={Link}>
                            <div className="space-y-2">
                                <a
                                    href={`https://openlibrary.org/works/${book.key?.replace("/works/", "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-300 hover:text-indigo-200 text-sm block"
                                >
                                    Open on OpenLibrary →
                                </a>
                                {book.links?.slice(0, 2).map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-300 hover:text-indigo-200 text-sm block"
                                    >
                                        {link.title} →
                                    </a>
                                ))}
                            </div>
                        </BookInfoCard>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="text-center py-8 text-red-500 ">
                Something went wrong
            </div>
        );
    }
};
