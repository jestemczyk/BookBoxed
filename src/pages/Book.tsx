import { Link } from "react-router";

export const Book = () => {
    const workData = {
        description: {
            type: "/type/text",
            value: "Originally published from 1954 through 1956, J.R.R. Tolkien's richly complex series ushered in a new age of epic adventure storytelling. A philologist and illustrator who took inspiration from his work, Tolkien invented the modern heroic quest novel from the ground up, creating not just a world, but a domain, not just a lexicon, but a language, that would spawn countless imitators and lead to the inception of the epic fantasy genre. Today, THE LORD OF THE RINGS is considered \"the most influential fantasy novel ever written.\" (THE ENCYCLOPEDIA OF FANTASY)\r\n\r\nDuring his travels across Middle-earth, the hobbit Bilbo Baggins had found the Ring. But the simple band of gold was far from ordinary; it was in fact the One Ring - the greatest of the ancient Rings of Power. Sauron, the Dark Lord, had infused it with his own evil magic, and when it was lost, he was forced to flee into hiding.\r\n\r\nBut now Sauron's exile has ended and his power is spreading anew, fueled by the knowledge that his treasure has been found. He has gathered all the Great Rings to him, and will stop at nothing to reclaim the One that will complete his dominion. The only way to stop him is to cast the Ruling Ring deep into the Fire-Mountain at the heart of the land of Mordor--Sauron's dark realm.\r\n\r\nFate has placed the burden in the hands of Frodo Baggins, Bilbo's heir...and he is resolved to bear it to its end. Or his own.",
        },
        links: [
            {
                title: "Tolkien Estate | The Lord of the Rings",
                url: "http://www.tolkienestate.com/en/writing/tales-of-middle-earth/the-lord-of-the-rings.html",
            },
            {
                title: "The Lord of the Rings - Wikipedia",
                url: "https://en.wikipedia.org/wiki/The_Lord_of_the_Rings",
            },
        ],
        title: "The Lord of the Rings",
        covers: [
            14625765, 11658206, 13120659, 12524639, 12524640, 13217523,
            13601172, 13344549, 10515650,
        ],
        subject_places: [
            "Mordor",
            "Hornburg",
            "Isengard",
            "Cracks of Doom",
            "Fangorn Forest",
            "Middle Earth",
            "Tierra Media",
        ],
        first_publish_date: "September 3, 2001",
        subject_people: [
            "Frodo Baggins",
            "Samwise Gamgee",
            "Gandalf the Grey",
            "Aragorn",
            "Gollum",
        ],
        key: "/works/OL27448W",
        authors: [{ author: { key: "/authors/OL26320A" } }],
        subjects: [
            "The Lord of the Rings",
            "Fiction",
            "Fantasy fiction",
            "Open Library Staff Picks",
            "Middle Earth (Imaginary place)",
            "Quests (Expeditions)",
            "Wizards",
        ],
    };

    const book = {
        id: workData.key.replace("/works/", ""),
        title: workData.title,
        subtitle:
            "The Fellowship of the Ring, The Two Towers, The Return of the King",
        authors: ["J.R.R. Tolkien"],
        publishYear: workData.first_publish_date
            ? parseInt(workData.first_publish_date.split(", ")[1])
            : 1954,
        publishers: ["George Allen & Unwin"],
        numberOfPages: 1216,
        rating: 4.52,
        subjects: workData.subjects.slice(0, 6),
        description: workData.description.value,
        coverId: workData.covers[0],
        isbn13: ["9780544003415", "9780618260584"],
        olid: workData.key.replace("/works/", ""),
        links: workData.links,
        subject_people: workData.subject_people.slice(0, 6),
        subject_places: workData.subject_places.slice(0, 4),
    };

    return (
        <div className="min-h-screen bg-[#101828] text-white">
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
                                {book.subjects.map((subject, idx) => (
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
                        <div className="space-y-2">
                            <a
                                href={`https://openlibrary.org/works/${book.olid}`}
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
                            <div>
                                <p className="text-xs text-[#596272] mb-1">
                                    Characters
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {book.subject_people?.map((person, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs text-indigo-300"
                                        >
                                            {person}
                                            {idx <
                                            book.subject_people.length - 1
                                                ? ","
                                                : ""}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-[#596272] mb-1">
                                    Places
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {book.subject_places?.map((place, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs text-indigo-300"
                                        >
                                            {place}
                                            {idx <
                                            book.subject_places.length - 1
                                                ? ","
                                                : ""}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
