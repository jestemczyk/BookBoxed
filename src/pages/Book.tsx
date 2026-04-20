import { getBookById, type BookType } from "@/api/openLibrary";

import { BackButton } from "@/components/BackButton";
import { BookPageSkeleton } from "@/components/BookPageSkeleton";

import { useSearchContext } from "@/context/SearchContext";
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

                    <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 mb-8">
                        <div className="bg-[#1e2a3a] rounded-2xl shadow-xl relative overflow-hidden w-[340px] h-[520px]">
                            {book.cover_i ? (
                                <>
                                    <img
                                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                        alt={book.title}
                                        className="w-full h-full object-cover rounded-2xl"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                "https://via.placeholder.com/340x500?text=No+Cover";
                                        }}
                                    />
                                    <div className="absolute bottom-3 right-3 z-10">
                                        <span className="text-xs bg-gray-800/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/90 font-medium shadow-lg">
                                            {book.number_of_pages_median
                                                ? `${book.number_of_pages_median} pages`
                                                : "Pages unknown"}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full aspect-[2/3] flex items-center justify-center text-[#596272]">
                                    📖 No cover
                                </div>
                            )}
                        </div>

                        <div className="bg-[#1e2a3a] rounded-2xl p-6 shadow-xl">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                                {book.title}
                            </h1>

                            <p className="text-indigo-300 font-medium mb-4 cursor-pointer">
                                {book.author_name?.[0] || "Unknown Author"}
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-700 my-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#596272]">
                                        Year
                                    </p>
                                    <p className="font-semibold text-white">
                                        {book.first_publish_year || "—"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#596272]">
                                        Pages
                                    </p>
                                    <p className="font-semibold text-white">
                                        {book.number_of_pages_median || "—"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#596272]">
                                        Rating
                                    </p>
                                    <p className="font-semibold text-yellow-400">
                                        {book.ratings_average
                                            ? `★ ${book.ratings_average.toFixed(1)}`
                                            : "No ratings"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#596272]">
                                        Id
                                    </p>
                                    <p className="font-semibold text-white">
                                        {book.key?.replace("/works/", "")}
                                    </p>
                                </div>
                            </div>

                            {book.subject && book.subject.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {book.subject
                                        .slice(0, 6)
                                        .map((subject, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-indigo-950/60 text-indigo-200 text-xs px-3 py-1 rounded-full"
                                            >
                                                {subject}
                                            </span>
                                        ))}
                                </div>
                            )}
                        </div>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#1e2a3a] rounded-xl p-5 shadow-xl">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <span>📚</span> Identifiers
                            </h3>
                            <ul className="space-y-1 text-sm text-[#596272]">
                                {book.isbn?.slice(0, 3).map((isbn, i) => (
                                    <li key={i}>ISBN-13: {isbn}</li>
                                ))}
                                {(!book.isbn || book.isbn.length === 0) && (
                                    <li>No data</li>
                                )}
                            </ul>
                        </div>

                        <div className="bg-[#1e2a3a] rounded-xl p-5 shadow-xl">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <span>🔗</span> Links
                            </h3>
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
                        </div>

                        <div className="bg-[#1e2a3a] rounded-xl p-5 shadow-xl">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <span>👥</span> Characters & Places
                            </h3>
                            <div className="space-y-2">
                                {(book.subject_people?.length || 0) > 0 ? (
                                    <div>
                                        <p className="text-xs text-[#596272] mb-1">
                                            Characters
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {(book.subject_people || [])
                                                .slice(0, 6)
                                                .map((person, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs text-indigo-300"
                                                    >
                                                        {person}
                                                        {idx <
                                                        (book.subject_people
                                                            ?.length || 0) -
                                                            1
                                                            ? ","
                                                            : ""}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-xs text-[#596272] mb-1">
                                            Characters
                                        </p>
                                        <p className="text-sm text-[#596272] italic">
                                            No characters listed
                                        </p>
                                    </div>
                                )}

                                {(book.subject_places?.length || 0) > 0 ? (
                                    <div>
                                        <p className="text-xs text-[#596272] mb-1">
                                            Places
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {(book.subject_places || [])
                                                .slice(0, 4)
                                                .map((place, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs text-indigo-300"
                                                    >
                                                        {place}
                                                        {idx <
                                                        (book.subject_places
                                                            ?.length || 0) -
                                                            1
                                                            ? ","
                                                            : ""}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-xs text-[#596272] mb-1">
                                            Places
                                        </p>
                                        <p className="text-sm text-[#596272] italic">
                                            No places listed
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
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
