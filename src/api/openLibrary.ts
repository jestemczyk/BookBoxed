const BASE_URL = "https://openlibrary.org/search.json?";

export interface BookCard {
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

export interface OpenLibraryOneBookResponse {
    description:
        | {
              type: string;
              value: string;
          }
        | string;
    links?: {
        title: string;
        url: string;
        type?: { key: string };
    }[];
    title: string;
    covers: number[];
    subject_places?: string[];
    first_publish_date?: string;
    subject_people?: string[];
    key: string;
    authors: {
        author: {
            key: string;
        };
        type?: { key: string };
    }[];
    subjects: string[];
    subject_times?: string[];
    excerpts?: {
        excerpt: string;
        comment?: string;
        pages?: string;
        author?: { key: string };
    }[];
    first_publish_year?: number;
    latest_revision?: number;
    revision?: number;
    created?: { type: string; value: string };
    last_modified?: { type: string; value: string };
    type?: { key: string };
    cover_edition?: { key: string };
    series?: Array<{ series: { key: string }; position: string }>;
}

export interface BookType {
    id: string;
    title: string;
    author: string;
    publishYear: number | null;
    numberOfPages: number | null;
    rating: number | null;
    subjects: string[];
    description: string;
    coverId: number | null;
    isbn13: string[];
    olid: string;
    links: { title: string; url: string }[];
    subject_people: string[];
    subject_places: string[];
}

export interface OpenLibraryAuthorResponse {
    personal_name: string;
    name: string;
    bio: string;
    remote_ids?: {
        viaf?: string;
        storygraph?: string;
        amazon?: string;
        wikidata?: string;
        isni?: string;
        goodreads?: string;
        project_gutenberg?: string;
        musicbrainz?: string;
        bookbrainz?: string;
        imdb?: string;
        lc_naf?: string;
        librarything?: string;
        librivox?: string;
        opac_sbn?: string;
    };
    birth_date: string;
    source_records?: string[];
    links?: {
        title: string;
        url: string;
        type: { key: string };
    }[];
    death_date: string;
    fuller_name: string;
    alternate_names: string[];
    photos: number[];
    key: string;
    type: { key: string };
    latest_revision: number;
    revision: number;
    created: { type: string; value: string };
    last_modified: { type: string; value: string };
}

export const renderBooks = (data: OpenLibraryResponse) => {
    const books: BookCard[] = data.docs.map((item) => ({
        id: item.key?.replace("/works/", ""),
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
            `${BASE_URL}subject=fiction&sort=rating&limit=50&offset=${offset}&fields=key,title,author_name,first_publish_year,cover_i`,
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
    let urlQuery = `(title:"${query}" OR author_name:"${query}")`;
    let additionalQuery = "";
    if (filters[0] && filters[0] !== "None") {
        if (filters[0] === "2020s")
            urlQuery += " AND first_publish_year:[2020 TO 2029]";
        else if (filters[0] === "2010s")
            urlQuery += " AND first_publish_year:[2010 TO 2019]";
        else if (filters[0] === "2000s")
            urlQuery += " AND first_publish_year:[2000 TO 2009]";
        else if (filters[0] === "1990s")
            urlQuery += " AND first_publish_year:[1990 TO 1999]";
        else if (filters[0] === "1980s")
            urlQuery += " AND first_publish_year:[1980 TO 1989]";
        else if (filters[0] === "1970s")
            urlQuery += " AND first_publish_year:[1970 TO 1979]";
        else if (filters[0] === "1960s")
            urlQuery += " AND first_publish_year:[1960 TO 1969]";
        else if (filters[0] === "1950s")
            urlQuery += " AND first_publish_year:[1950 TO 1959]";
        else if (filters[0] === "1940s")
            urlQuery += " AND first_publish_year:[1940 TO 1949]";
        else if (filters[0] === "later")
            urlQuery += " AND first_publish_year:[1900 TO 1940]";
    }

    if (filters[1] && filters[1] !== "None") {
        urlQuery += ` AND subject:"${filters[1]}"`;
    }
    if (filters[2] && filters[2] !== "None") {
        if (filters[2] === "By rating") additionalQuery = "&sort=rating";
        if (filters[2] === "By editions") additionalQuery = "&sort=editions";
        if (filters[2] === "By newest") additionalQuery = "&sort=new";
        if (filters[2] === "By latest") additionalQuery = "&sort=old";
    }
    const urlString = `${BASE_URL}q=${urlQuery}${additionalQuery}&limit=50&offset=${offset}&fields=key,title,author_name,first_publish_year,cover_i`;
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

export const getBookById = async (id: string | undefined) => {
    if (id === undefined) {
        return "No book found";
    }
    try {
        const response = await fetch(
            `https://openlibrary.org/works/${id}.json`,
        );
        const data = (await response.json()) as OpenLibraryOneBookResponse;
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getAuthorName = async (id: string) => {
    try {
        const response = await fetch(`https://openlibrary.org${id}.json`);
        const data = (await response.json()) as OpenLibraryAuthorResponse;
        if (data.name) {
            return data.name;
        }
        return "No author name";
    } catch (error) {
        console.error(error);
        return "No  author name";
    }
};
