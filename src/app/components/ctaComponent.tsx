/* eslint-disable @next/next/no-img-element */
 "use client"
import { urlFor } from "@/sanity/lib/image";
// import { useEffect, useState } from "react";
 import { Cta} from "../types/types";
// import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

type Props = { data: Cta };

export function CtaComponent({ data }: Props) {


 console.log('data Hero ' , data)



return (

<section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <div className="text-2xl font-bold text-gray-900 md:text-3xl">
        {Array.isArray(data.bigtext) && <PortableText value={data.bigtext} />}
      </div>

      <div className="hidden text-gray-500 md:mt-4 md:block">
        {Array.isArray(data.middletext) && <PortableText value={data.middletext} />}
      </div>

      <div className="mt-4 md:mt-8">
        <a
          href="#"
          className="inline-block rounded-sm bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
        >
         {data.buttontext}
        </a>
      </div>
    </div>
  </div>

           {data.image ? (
  <img
    className="h-56 w-full object-cover sm:h-full"
    src={urlFor(data.image).url()}
    alt="gallery image"
  />
) : (
  <div className="h-64 w-full bg-gray-200 rounded-lg flex items-center justify-center">
    <span className="text-gray-500">No image available</span>
  </div>
)}




</section>
 
   
)
 }