import React from "react";
import { AddToShelfButton } from "./AddToShelfButton";

export const BookInfo = (props: {
    title: string;
    authorName: string;
    firstPublishYear: number;
    numOfPages: number;
    rating: number;
    bookKey: string;
    thumbnail: string;
    subject: string[];
}) => {
    return (
        <div className="bg-[#1e2a3a] rounded-2xl p-6 shadow-xl relative">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                {props.title}
            </h1>

            <p className="text-indigo-300 font-medium mb-4 cursor-pointer">
                {props.authorName || "Unknown Author"}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-700 my-4">
                <div>
                    <p className="text-xs uppercase tracking-wider text-[#596272]">
                        Year
                    </p>
                    <p className="font-semibold text-white">
                        {props.firstPublishYear || "—"}
                    </p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wider text-[#596272]">
                        Pages
                    </p>
                    <p className="font-semibold text-white">
                        {props.numOfPages || "—"}
                    </p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wider text-[#596272]">
                        Rating
                    </p>
                    <p className="font-semibold text-yellow-400">
                        {props.rating
                            ? `★ ${props.rating.toFixed(1)}`
                            : "No ratings"}
                    </p>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wider text-[#596272]">
                        Id
                    </p>
                    <p className="font-semibold text-white">
                        {props.bookKey.replace("/works/", "")}
                    </p>
                </div>
            </div>
            {props.subject && props.subject.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 mb-5">
                    {props.subject.slice(0, 6).map((subject, idx) => (
                        <span
                            key={idx}
                            className="bg-indigo-950/60 text-indigo-200 text-xs px-3 py-1 rounded-full"
                        >
                            {subject}
                        </span>
                    ))}
                </div>
            )}
            <AddToShelfButton
                bookId={props.bookKey.replace("/works/", "")}
                bookTitle={props.title}
                bookThumbnail={props.thumbnail}
                bookPublishYear={props.firstPublishYear}
                bookAuthors={[props.authorName]}
            />
        </div>
    );
};
