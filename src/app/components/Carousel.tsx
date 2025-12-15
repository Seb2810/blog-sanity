/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react";
import { Carousel, CarouselImage } from "../types/types";
import { urlFor } from "@/sanity/lib/image";

type Props = { data: Carousel };

export function CarouselComponent({ data  }: Props) {

const [activeIndex, setActiveIndex] = useState(0);

  // Fonction pour passer au slide suivant
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fonction pour passer au slide précédent
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
    );
  };

  // Fonction pour aller à un slide spécifique
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Auto-rotation (optionnel)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyage à la fin
  }, []);

  return (
    <div id="default-carousel" className="relative w-full mt-4 mb-5 mr-5 ml-5" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {data.images.map((item, i) => (
          <div
            key={i}
            className={`${
              activeIndex === i ? 'block' : 'hidden'
            } duration-700 ease-in-out`}
            data-carousel-item
          >
            <img
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              src={urlFor(item.image).width(800).url()}
              alt={item.label || `Carousel image ${i + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Boutons ronds pour la navigation */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {data.images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`w-3 h-3 rounded-full ${
              activeIndex === i ? 'bg-white' : 'bg-white/50'
            } hover:bg-white`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>

      {/* Flèche précédente */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Flèche suivante */}
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}