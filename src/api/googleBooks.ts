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

export const getRandomBooks = async (maxResults: number = 20) => {
    try {
        const response = await fetch(
            `${BASE_URL}/volumes?q=a&maxResults=${maxResults}&orderBy=relevance`,
        );
        const data = await response.json();

        if (!data.items) {
            return [];
        }
        const books: Book[] = data.items.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title || "Без названия",
            authors: item.volumeInfo.authors || ["Автор не указан"],
            thumbnail: getBetterThumbnail(
                item.volumeInfo.imageLinks?.thumbnail || "",
            ),
            publishedDate: item.volumeInfo.publishedDate || "Дата не указана",
            description: item.volumeInfo.description || "Описание отсутствует",
            pageCount: item.volumeInfo.pageCount || 0,
            categories: item.volumeInfo.categories || [],
        }));

        return books;
    } catch (error) {
        console.error(error);
        return [];
    }
};
