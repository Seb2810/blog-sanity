/* eslint-disable @next/next/no-img-element */
'use client'
import React from "react";
import { Footer } from "../types/types"; // ton interface définie plus haut
import imageUrlBuilder from "@sanity/image-url"
import { urlFor } from "@/sanity/lib/image"

interface FooterProps {
  data: Footer;
}

const FooterComponent: React.FC<FooterProps> = ({ data }) => {

     if (!data) return null;
     
  return (
    <footer className="mt-auto px-4 divide-y bg-gray-100 dark:bg-gray-100 dark:text-gray-800  mt-5">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        
        {/* Logo + Brand */}
        <div className="lg:w-1/3">
          <a
            href="/"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            {data.logo ? (
              <img
               
                src={urlFor(data.logo).width(200).height(200).url()}
                alt={data.title}
                className="w-12 h-12 rounded-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-600">
                <span className="text-white text-lg font-bold">.</span>
              </div>
            )}
            <span className="self-center text-2xl text-indigo-500 font-semibold">
              {data.title}
            </span>
          </a>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          {data.columns?.map((col, i) => (
            <div key={i} className="space-y-3">
              <h2 className="tracking-wide uppercasetext-gray-700 text-indigo-500  font-semibold hover:text-gray-900 ">
                {col.title}
              </h2>
              <ul className="space-y-1">
                {col.links?.map((link, j) => (
                  <li key={j}>
                    <a
                      href={`/${link.slug.current}`}
                      className="hover:underline text-indigo-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media */}
          {data.socialColumn && (
            <div className="space-y-3">
              <h3 className="uppercase  text-indigo-500">
                {data.socialColumn.title || "Social media"}
              </h3>
              <div className="flex justify-start space-x-3 ">
                {data.socialColumn.socialLinks?.map((social, k) => (
                  <a
                    key={k}
                    href={social.url}
                    target={social.blank ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    title={social.label}
                    className="flex items-center p-1 "
                  >
                    <span
                      className="w-5 h-5"
                      dangerouslySetInnerHTML={{ __html: social.svgIcon }}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Copyright */}
      {data.copyright && (
        <div className="py-6 text-sm text-center text-indigo-500 dark:text-gray-600">
          {data.copyright}
        </div>
      )}
    </footer>
  );
};

export default FooterComponent;
