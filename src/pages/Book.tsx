import { Link } from "react-router";

export const Book = () => {
    const book = {
        id: "OL27448W",
        title: "The Hero of Ages",
        subtitle: "Mistborn Saga, Book 3",
        authors: ["Brandon Sanderson"],
        publishYear: 2008,
        publishers: ["Tor Books"],
        numberOfPages: 768,
        rating: 4.54,
        subjects: ["Fantasy", "Epic Fantasy", "Adventure", "Magic", "Mystery"],
        description:
            "Who is the Hero of Ages? To end the Final Empire and restore freedom, Vin killed the Lord Ruler. But as a result, the Deepness—the lethal form of the mists that has haunted the world for centuries—is now forced to flee from the land. In the end, the prophecies point to one conclusion: Vin is the Hero of Ages, the one who will bear the weight of the world on her shoulders. But to save the world, she must embrace her own identity and sacrifice everything she holds dear.",
        coverId: 12345678,
        isbn13: ["9780765356146", "9781427204646"],
        olid: "OL27448W",
    };

    return (
        <div className="min-h-screen  text-white">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <Link
                    to="/books"
                    className="group inline-flex items-center gap-2 bg-[#1e2a3a] hover:bg-[#1e2045] px-4 py-2 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-all duration-200 mb-8"
                >
                    <svg
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span className="text-sm font-medium">Back to search</span>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 mb-8">
                    <div className="bg-[#1e2a3a] rounded-2xl p-6 text-center shadow-xl">
                        {book.coverId ? (
                            <img
                                src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
                                alt={book.title}
                                className="w-full max-w-[260px] mx-auto rounded-xl shadow-lg mb-4"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        "https://via.placeholder.com/260x380?text=No+Cover";
                                }}
                            />
                        ) : (
                            <div className="w-full max-w-[260px] mx-auto bg-gray-700 rounded-xl aspect-[2/3] flex items-center justify-center text-[#596272] mb-4">
                                📖 No cover
                            </div>
                        )}
                        <span className="text-xs bg-gray-700/50 px-3 py-1 rounded-full text-white/80">
                            {book.numberOfPages
                                ? `${book.numberOfPages} pages`
                                : "Pages unknown"}
                        </span>
                    </div>

                    <div className="bg-[#1e2a3a] rounded-2xl p-6 shadow-xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                            {book.title}
                        </h1>
                        {book.subtitle && (
                            <p className="text-[#596272] italic mb-2">
                                {book.subtitle}
                            </p>
                        )}
                        <p className="text-indigo-300 font-medium mb-4">
                            {book.authors.join(", ")}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-700 my-4">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-[#596272]">
                                    Year
                                </p>
                                <p className="font-semibold text-white">
                                    {book.publishYear || "—"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-[#596272]">
                                    Pages
                                </p>
                                <p className="font-semibold text-white">
                                    {book.numberOfPages || "—"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-[#596272]">
                                    Rating
                                </p>
                                <p className="font-semibold text-yellow-400">
                                    {book.rating
                                        ? `★ ${book.rating.toFixed(1)}`
                                        : "No ratings"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-[#596272]">
                                    Publisher
                                </p>
                                <p className="font-semibold text-white">
                                    {book.publishers[0] || "—"}
                                </p>
                            </div>
                        </div>

                        {book.subjects.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {book.subjects
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
                        <p className="text-[#596272] leading-relaxed">
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
                            {book.isbn13?.slice(0, 3).map((isbn, i) => (
                                <li key={i}>ISBN-13: {isbn}</li>
                            ))}
                            {(!book.isbn13 || book.isbn13.length === 0) && (
                                <li>No data</li>
                            )}
                        </ul>
                    </div>

                    <div className="bg-[#1e2a3a] rounded-xl p-5 shadow-xl">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span>🔗</span> Links
                        </h3>
                        <a
                            href={`https://openlibrary.org/works/${book.olid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-300 hover:text-indigo-200 text-sm block"
                        >
                            Open on OpenLibrary →
                        </a>
                    </div>

                    <div className="bg-[#1e2a3a] rounded-xl p-5 shadow-xl">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span>📖</span> Access
                        </h3>
                        <p className="text-sm text-[#596272]">
                            {book.coverId
                                ? "Book found in catalog"
                                : "No access information available"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
