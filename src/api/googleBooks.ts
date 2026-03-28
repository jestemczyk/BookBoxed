const BASE_URL = "https://www.googleapis.com/books/v1";

export interface Book {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    categories: string[];
}

const getBetterThumbnail = (thumbnailUrl: string) => {
    if (!thumbnailUrl) return "";

    return thumbnailUrl
        .replace("&edge=curl", "")
        .replace("zoom=1", "zoom=3")
        .replace("&zoom=1", "&zoom=3");
};

export const getBooks = async (maxResults: number = 20, query: string) => {
    try {
        const response = await fetch(
            `${BASE_URL}/volumes?q=${query}&maxResults=${maxResults}&orderBy=newest`,
        );
        const data = await response.json();

        if (!data.items) {
            return [];
        }
        const books: Book[] = data.items.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title || "No name",
            authors: item.volumeInfo.authors || ["Unknown author"],
            thumbnail: getBetterThumbnail(
                item.volumeInfo.imageLinks?.thumbnail || "",
            ),
            publishedDate: item.volumeInfo.publishedDate || "Unknown date",
            description: item.volumeInfo.description || "No description",
            pageCount: item.volumeInfo.pageCount || 0,
            categories: item.volumeInfo.categories || [],
        }));

        return books;
    } catch (error) {
        console.error(error);
        return [];
    }
};
