const BASE_URL = "https://openlibrary.org/search.json?";

export interface Book {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
    publishedDate: string;
    pageCount: number;
    categories: string[];
}

interface OpenLibraryDoc {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    publish_year?: number[];
    description?: string | { value: string };
    number_of_pages_median?: number;
    number_of_pages?: number;
    subject?: string[];
    cover_edition_key?: string;
}

interface OpenLibraryResponse {
    docs: OpenLibraryDoc[];
    num_found: number;
    start: number;
}

const renderBooks = (data: OpenLibraryResponse) => {
    const books: Book[] = data.docs.map((item) => ({
        id:
            item.key?.replace("/works/", "") ||
            item.cover_edition_key ||
            Math.random().toString(),
        title: item.title || "No name",
        authors: item.author_name || ["Unknown author"],
        thumbnail: item.cover_i
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
            : "",
        publishedDate:
            item.first_publish_year?.toString() ||
            item.publish_year?.[0]?.toString() ||
            "Unknown date",
        pageCount: item.number_of_pages_median || item.number_of_pages || 0,
        categories: item.subject || [],
    }));
    return books;
};

export const getPopularBooks = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}subject=fiction&sort=rating&limit=30`,
        );
        const data = (await response.json()) as OpenLibraryResponse;

        if (!data.docs) {
            return [];
        }

        return renderBooks(data);
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getBooksByName = async (query: string) => {
    try {
        const response = await fetch(`${BASE_URL}q=${query}&limit=30`);
        const data = (await response.json()) as OpenLibraryResponse;
        if (!data.docs) {
            return [];
        }
        return renderBooks(data);
    } catch (error) {
        console.error(error);
        return [];
    }
};
