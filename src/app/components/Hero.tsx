/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
 "use client"
 import { useEffect, useState } from "react";
 import { Hero, PageBuilder } from "../types/types";
 import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

type Props = { data: Hero ;
  imgPage?: string;
  body?: any;
  showBody?: boolean;

};

export function HeroComponent({ data }: Props) {


 console.log('data Hero ' , data)



return(


 
    <section className="bg-white ">
     
       {/*<!-- Hero -->*/}
      <div className="relative">
       
          <div>
        <div className="absolute text-red-600 w-full h-full z-0 hero-pattern top-0"></div>
        {/* <!-- Grid -->*/}
        <div
          className="px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-32 bg-gradient-to-b from-transparent to-white to-[50%] relative z-1">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center max-w-[85rem] mx-auto relative overflow-hidden">
            <div className="space-y-4">
              <div className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl lg:leading-tight">
           {Array.isArray(data.bigtext) && <PortableText value={data.bigtext} />}
              </div>
              <div className="mt-3 text-lg text-gray-800 dark:text-gray-400">
                {Array.isArray(data.middletext) && <PortableText value={data.middletext} />}
              </div>

              {/* <!-- search bar -->*/}
              <div className="mt-7 grid gap-3 w-full sm:inline-flex relative">
                <form action="" className="flex border p-2 rounded-full w-full">
                  <select
                    name=""
                    id=""
                    className="grow-0 shrink-0 w-16 sm:w-24 truncate">
                    <option value="">Restauration rapide</option>
                    <option value="">Café</option>
                    <option value="">Boulangerie</option>
                  </select>
                  <div className="flex-1  relative">
                    <input
                      type="search"
                      placeholder="où allez-vous manger?"
                      title="Search"
                      role="searchbox"
                      aria-label="Search"
                      aria-controls="typeahead_results"
                      aria-autocomplete="list"
                      
                      className="w-full py-2 pl-2 pr-12 outline-none focus:outline-none" />
                    <button
                      type="submit"
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 h-full px-4 rounded-full text-white">
                      {data.buttontext}
                    </button>
                  </div>
                </form>
              </div>
             {/* <!-- end search bar -->*/} 

                {/* <!-- trust -->*/} 
              <div className="mt-0 relative">
                <div className="py-5">
                  <div className="mt-3 text-sm text-gray-800 max-w-sm">
                       {Array.isArray(data.smalltext) && <PortableText value={data.smalltext} />}
                  </div>
                </div>
              </div>
              {/* <!-- End trust -->*/} 
            </div>
            {/* <!-- End Col -->*/} 

            <div className="relative ms-4">
              <div className="px-4 text-red-600">
             
           {data.image ? (
  <img
    className="h-auto max-w-full rounded-lg"
    src={urlFor(data.image).url()}
    alt="gallery image"
  />
) : (
  <div className="h-64 w-full bg-gray-200 rounded-lg flex items-center justify-center">
    <span className="text-gray-500">No image available</span>
  </div>
)}
              </div>

              {/* <!-- End SVG-->*/}
            </div>
             {/*<!-- End Col -->*/}
          </div>
        </div>
         {/*<!-- End Grid -->*/}
          </div>
       
      </div>
       {/*<!-- End Hero -->*/}
    </section>



)
 }