 "use client"
 import { useEffect, useRef, useState } from "react";
 import { Accordion, AccordionArray } from "../types/types";
 import { urlFor } from "@/sanity/lib/image";
 
 type Props = { data: Accordion };
 
 export function AccordionComponent({ data }: Props) {
 console.log('data  Accordion ' , data)

 const [openIndex, setOpenIndex] = useState<number | null>(null);

 const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // const contentRef = useRef<HTMLDivElement>(null);

   /* const [openItems, setOpenItems] = useState<boolean[]>(
    new Array(data.items.length).fill(false)
  );*/
    
  //const [isOpen, setOpen] = useState(false);

  //const toggleMBar = () => setOpen(!isOpen);

return(

    
<div id="accordion-collapse" data-accordion="collapse" className="mt-4 mb-5 mr-5 ml-5">
  
   {data.items.map((item, i) => (
 
          <div key={i}>
  <h2 id="accordion-collapse-heading-1">
    <button type="button"  onClick={() => toggleItem(i)}
     className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
    aria-expanded={openIndex === i}  aria-controls={`accordion-collapse-body-${i}`}>
      
      <span>{item.title}</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
    {openIndex === i && (
  <div id={`accordion-collapse-body-${i}`} 
  className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900 overflow-hidden transition-all animate-fade-up" 
  aria-labelledby={`accordion-collapse-heading-${i}`}  
>

<div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2 text-gray-500 dark:text-gray-400">{item.content}</p>
      
    </div>
 </div>
    )}

  </div>


   ))}

 </div>

)
 }