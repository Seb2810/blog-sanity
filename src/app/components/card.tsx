/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card } from "../types/types";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
 // helper pour les images


type Props = {
  data: Card; // <--- plus un tableau, juste une carte
};

export function CardComponent({ data }: Props) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Image */}
      {data.image && (
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={urlFor(data.image).width(400).url()}
          alt={data.title || "Card image"}
        />
      )}

      <div className="p-5">
        {/* Title */}
        {data.title && (
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h5>
        )}

        {/* Text */}
        {data.text && (
          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <PortableText value={data.text} />
          </div>
        )}

        {/* Submit button */}
        {data.submit && (
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {data.submit}
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
