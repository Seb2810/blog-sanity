/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
// <-- ton type TS
import { urlFor } from "@/sanity/lib/image";
import { CardGallery } from "../types/types";

type Props = {
  data: CardGallery; // une cardGallery entière
};


export function CardGrid({ data }: Props) {

    console.log('CardGrid ' , data)
    
  return (
    <>
      <div className="p-8">
        <div className="flex felx-col items-center justify-center">
          <span className="rounded-full bg-indigo-500 px-2 py-1 text-white uppercase text-sm">
            Insight
          </span>
        </div>
        <h1 className="text-4xl font-medium text-gray-700 text-center mt-6">
          Full-Funnel Social Analytics
        </h1>
        <p className="text-center mt-6 text-lg font-light text-gray-500">
          The time is now for it to be okay to be great. For being a bright
          color. For standing out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {data.images?.map((item, i) => {
          // récupère le média (image ou svg)
          const media = item.media?.[0];

          return (
            <div key={i} className="p-8">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex justify-center items-center text-indigo-500 shadow-2xl overflow-hidden">
           {media?._type === "image" && (
  <img src={urlFor(media).width(64).height(64).url()} alt={item.title || ""} />
)}
              {media?._type === "svgIcon" && (
  <span dangerouslySetInnerHTML={{ __html: media.code }} />
)}
              </div>

              <h2 className="uppercase mt-6 text-indigo-500 font-medium mb-3">
                {item.title}
              </h2>

              <p className="font-light text-sm text-gray-500 mb-3">
                {item.content}
              </p>

              {item.slug?.current && (
                <a
                  className="text-indigo-500 flex items-center hover:text-indigo-600"
                  href={`/${item.slug.current}`}
                >
                  {item.label || "En savoir plus"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
