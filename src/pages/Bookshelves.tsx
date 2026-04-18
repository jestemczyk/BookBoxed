import { MiniShelf } from "@/components/MiniShelf";

export const Bookshelves = () => {
    const shelves = [
        {
            id: 1,
            name: "Currently Reading",
            count: 3,
            books: [
                {
                    title: "The Hero of Ages",
                    author: "Brandon Sanderson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345678-L.jpg",
                },
                {
                    title: "The Name of the Wind",
                    author: "Patrick Rothfuss",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345679-L.jpg",
                },
                {
                    title: "The Way of Kings",
                    author: "Brandon Sanderson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345680-L.jpg",
                },
            ],
        },
        {
            id: 2,
            name: "Want to Read",
            count: 12,
            books: [
                {
                    title: "Dune",
                    author: "Frank Herbert",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345681-L.jpg",
                },
                {
                    title: "Neuromancer",
                    author: "William Gibson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345682-L.jpg",
                },
                {
                    title: "Hyperion",
                    author: "Dan Simmons",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345683-L.jpg",
                },
                {
                    title: "Snow Crash",
                    author: "Neal Stephenson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345684-L.jpg",
                },
                {
                    title: "Altered Carbon",
                    author: "Richard K. Morgan",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345685-L.jpg",
                },
                {
                    title: "The Left Hand of Darkness",
                    author: "Ursula K. Le Guin",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345686-L.jpg",
                },
            ],
        },
        {
            id: 3,
            name: "Read",
            count: 24,
            books: [
                {
                    title: "The Hobbit",
                    author: "J.R.R. Tolkien",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/14625765-L.jpg",
                },
                {
                    title: "The Fellowship of the Ring",
                    author: "J.R.R. Tolkien",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/14625766-L.jpg",
                },
                {
                    title: "The Two Towers",
                    author: "J.R.R. Tolkien",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/14625767-L.jpg",
                },
                {
                    title: "The Return of the King",
                    author: "J.R.R. Tolkien",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/14625768-L.jpg",
                },
                {
                    title: "Mistborn",
                    author: "Brandon Sanderson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345687-L.jpg",
                },
                {
                    title: "The Well of Ascension",
                    author: "Brandon Sanderson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345688-L.jpg",
                },
            ],
        },
        {
            id: 4,
            name: "Favorites",
            count: 5,
            books: [
                {
                    title: "The Hero of Ages",
                    author: "Brandon Sanderson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345678-L.jpg",
                },
                {
                    title: "The Name of the Wind",
                    author: "Patrick Rothfuss",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345679-L.jpg",
                },
                {
                    title: "The Way of Kings",
                    author: "Brandon Sanderson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345680-L.jpg",
                },
                {
                    title: "Dune",
                    author: "Frank Herbert",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345681-L.jpg",
                },
                {
                    title: "Hyperion",
                    author: "Dan Simmons",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345683-L.jpg",
                },
            ],
        },
        {
            id: 5,
            name: "Fantasy",
            count: 8,
            books: [
                {
                    title: "The Hobbit",
                    author: "J.R.R. Tolkien",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/14625765-L.jpg",
                },
                {
                    title: "The Name of the Wind",
                    author: "Patrick Rothfuss",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345679-L.jpg",
                },
                {
                    title: "The Way of Kings",
                    author: "Brandon Sanderson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345680-L.jpg",
                },
                {
                    title: "Mistborn",
                    author: "Brandon Sanderson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345687-L.jpg",
                },
                {
                    title: "The Final Empire",
                    author: "Brandon Sanderson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345689-L.jpg",
                },
                {
                    title: "The Lies of Locke Lamora",
                    author: "Scott Lynch",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345690-L.jpg",
                },
            ],
        },
        {
            id: 6,
            name: "Sci-Fi",
            count: 6,
            books: [
                {
                    title: "Dune",
                    author: "Frank Herbert",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345681-L.jpg",
                },
                {
                    title: "Neuromancer",
                    author: "William Gibson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345682-L.jpg",
                },
                {
                    title: "Hyperion",
                    author: "Dan Simmons",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345683-L.jpg",
                },
                {
                    title: "Snow Crash",
                    author: "Neal Stephenson",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345684-L.jpg",
                },
                {
                    title: "Altered Carbon",
                    author: "Richard K. Morgan",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345685-L.jpg",
                },
                {
                    title: "The Left Hand of Darkness",
                    author: "Ursula K. Le Guin",
                    coverUrl:
                        "https://covers.openlibrary.org/b/id/12345686-L.jpg",
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen text-white p-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Bookshelves</h1>
                    <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                        + New Shelf
                    </button>
                </div>

                <div className="space-y-8">
                    {shelves.map((shelf) => (
                        <MiniShelf
                            key={shelf.id}
                            id={shelf.id}
                            name={shelf.name}
                            count={shelf.count}
                            books={shelf.books}
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
                        <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
                            + Create Shelf
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
