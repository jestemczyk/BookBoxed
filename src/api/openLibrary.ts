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

export interface OpenLibraryResponse {
    docs: OpenLibraryDoc[];
    num_found: number;
    start: number;
}

export const renderBooks = (data: OpenLibraryResponse) => {
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

export const getPopularBooks = async (offset: number) => {
    try {
        const response = await fetch(
            `${BASE_URL}subject=fiction&sort=rating&limit=50&offset=${offset}`,
        );
        const data = (await response.json()) as OpenLibraryResponse;

        if (!data.docs) {
            return { docs: [], num_found: 0, start: 0 };
        }

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const mkUrl = (query: string, offset: number, filters: string[]) => {
    const urlQuery = `title:(${query}) OR author_name:(${query})`;
    let urlString = `${BASE_URL}q=${urlQuery}&limit=50&offset=${offset}`;
    if (filters[0] && filters[0] !== "None") {
        if (filters[0] === "2020s") urlString += "&year=2020-2029";
        else if (filters[0] === "2010s") urlString += "&year=2010-2019";
        else if (filters[0] === "2000s") urlString += "&year=2000-2009";
        else if (filters[0] === "1990s") urlString += "&year=1990-1999";
        else if (filters[0] === "1980s") urlString += "&year=1980-1989";
        else if (filters[0] === "1970s") urlString += "&year=1970-1979";
        else if (filters[0] === "1960s") urlString += "&year=1960-1969";
        else if (filters[0] === "1950s") urlString += "&year=1950-1959";
        else if (filters[0] === "1940s") urlString += "&year=1940-1949";
        else if (filters[0] === "later") urlString += "&year=1900-1940";
    }
    if (filters[1] && filters[1] !== "None") {
        urlString += `&subject=${filters[1].toLowerCase()}`;
    }
    if (filters[2] && filters[2] !== "None") {
        if (filters[2] === "By rating") urlString += "&sort=rating";
        if (filters[2] === "By editions") urlString += "&sort=editions";
    }
    return urlString;
};

export const getBooksByName = async (
    query: string,
    offset: number,
    yearFilterValue: string,
    genreFilterValue: string,
    otherFilterValue: string,
) => {
    try {
        const filters = [yearFilterValue, genreFilterValue, otherFilterValue];
        const url = mkUrl(query, offset, filters);
        const response = await fetch(url);
        const data = (await response.json()) as OpenLibraryResponse;
        if (!data.docs) {
            return { docs: [], num_found: 0, start: 0 };
        }
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
