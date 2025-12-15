/* eslint-disable @next/next/no-img-element */
 "use client"
 import { useEffect, useState } from "react";
 import { Gallery, GalleryImage } from "../types/types";
 import { urlFor } from "@/sanity/lib/image";
 
 type Props = { data: Gallery };
 
 export function GalleryComponent({ data }: Props) {
 console.log('data gallery ' , data)
return(
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-5 mr-5 ml-5">
  
        {data.images.map((item, i) => (
          <div key={i}>
     <img
              className="h-auto max-w-full rounded-lg" 
              src={urlFor(item.image).url()}
              alt={item.label || `gallery image ${i + 1}`}
            />
          </div>
        ))}
    
    </div>
) 


 }
 