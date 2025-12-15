/* eslint-disable @typescript-eslint/no-explicit-any */

//* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/NavbarUI.tsx
/* eslint-disable @next/next/no-img-element */
// src/components/NavbarUI.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Navbar, PageSummary, PostSummary } from '@/app/types/types'
import { urlFor } from "@/sanity/lib/image";
import Dashboard from './DashboardLogin';
import RegisterTag from './registerTag';

type Props = {
  navbar: Navbar
  pages: PageSummary[]
  posts: PostSummary[]
}

export default function NavbarUI({ navbar, pages, posts }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  let closeTimeout: NodeJS.Timeout

 /* const getHrefFromLink = (link: any) => {
    if (link?.slug?.current) return `/${link.slug.current}`
    if (link?.internalReference?.slug?.current) return `/${link.internalReference.slug.current}`
    if (link?.externalUrl) return link.externalUrl
    return '#'
  }*/
const getHrefFromLink = (link: any) => {
  // on accepte string ou objet
  const slugObj = link?.slug
  const slugStr =
    typeof slugObj === 'string'
      ? slugObj
      : slugObj?.current

  if (slugStr) return `/${slugStr}`
  if (link?.internalReference?.slug) return `/${link.internalReference.slug}`
  if (link?.externalUrl) return link.externalUrl
  return '#'
}

  const renderDropdown = (list: (PageSummary | PostSummary)[]) => (
    <div className="absolute left-0 mt-2 bg-gradient-to-r from-gray-200 to-white-500  shadow-lg rounded-md w-56 z-50 animate-fade-up">
      {list.map((entry) => (
        <Link
          key={entry._id}
          href={`/${entry.slug}`}
          className="block px-4 py-2 text-indigo-500 first-letter:uppercase hover:bg-gray-100 hover:text-gray-600"
        >
          {entry.title}
        </Link>
      ))}
    </div>
  )

  console.log('navbar.items ' , navbar.items)

  return (
    <nav className="bg-gray-100">
      <div className="max-w-8xl mx-auto px-4 max-sm:mx-auto">
        <div className="flex justify-between">
          <div className="flex w-full">
            <div>
              <a href="#" className="flex py-5 px-2 text-indigo-500 hover:text-gray-900 space-x-3">
                <img
                  className="h-14 w-14  rounded-full object-contain"
                  src={urlFor(navbar.logo).url()}
                  alt="logo"
                />
                <span className="font-bold text-2xl text-left mt-3 first-letter:uppercase">{navbar.title}</span>
              </a>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex justify-center space-x-1 w-5xl mt-2">
              {navbar.items.map((item) => (
                <div
                  key={item._key}
                  className="relative"
                  onMouseEnter={() => {
                    clearTimeout(closeTimeout)
                    setOpenDropdown(item._key)
                  }}
                  onMouseLeave={() => {
                    closeTimeout = setTimeout(() => setOpenDropdown(null), 150)
                  }}
                >
                 {item.type === 'static' ? (
  <>
    <button className="py-4 px-3 mt-3 text-indigo-500 font-semibold hover:text-gray-900 transition-colors relative inline-block group">
      {item.label}
      <span className="absolute left-0 bottom-0 h-[4px] w-0 bg-gradient-to-r from-white-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
    </button>

    {openDropdown === item._key && (
      <div className="absolute left-0 mt-2 bg-gradient-to-r from-gray-200 to-white-500 shadow-lg rounded-md w-56 z-50 animate-fade-up">
        {item.links?.map((link, idx) => (
          <Link
            key={idx}
            href={getHrefFromLink(link)}
            target={item.openInNewTab ? '_blank' : '_self'}
            className="block px-4 py-2 text-indigo-500 first-letter:uppercase hover:bg-gray-100 hover:text-gray-600"
          >
            {link.label || item.label}
          </Link>
        ))}
      </div>
    )}
  </>
                  ) : (
                    <button className="py-4 px-3 mt-3 text-indigo-500 font-semibold hover:text-gray-900 transition-colors relative inline-block  group">
                      {item.label}
                      <span className="absolute left-0 bottom-0 h-[4px] w-0 bg-gradient-to-r from-white-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  )}

                  {item.type === 'pages' && openDropdown === item._key && renderDropdown(pages)}
                  {item.type === 'posts' && openDropdown === item._key && renderDropdown(posts)}
                </div>
              ))}
            </div>

            <div className="hidden mb-3 md:flex items-center space-x-1">
              <Dashboard />
              <RegisterTag />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      {isOpen && (
       <div className={`mobile-menu md:hidden ${isOpen ? 'block' : 'hidden'}`}>
    {navbar.items.map((item) => (
      <div key={item._key}>

        {item.type === 'static' && (
                <>
                  <button
                    className="block w-full text-indigo-500 text-left px-4 py-2 font-semibold"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item._key ? null : item._key)
                    }
                  >
                    {item.label}
                  </button>
                  {openDropdown === item._key && (
                    <div className="pl-4 py-2">
                      {item.links?.map((link, idx) => (
                        <Link
                          key={idx}
                          href={getHrefFromLink(link)}
                          target={item.openInNewTab ? "_blank" : "_self"}
                          className="block py-2  text-indigo-500  px-4 text-sm hover:bg-gray-200"
                        >
                          {link.label || item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Pages */}
              {item.type === 'pages' && (
                <>
                  <button
                    className="block w-full text-indigo-500 text-left px-4 py-2 font-semibold"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item._key ? null : item._key)
                    }
                  >
                    {item.label}
                  </button>
                  {openDropdown === item._key && (
                    <div className="pl-4 py-2">
                      {pages.map((p) => (
                        <Link key={p._id} href={`/${p.slug}`} className="block py-2 px-4 text-indigo-500 text-sm hover:bg-gray-200">
                          {p.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Posts */}
              {item.type === 'posts' && (
                <>
                  <button
                    className="block w-full text-left px-4 py-2 text-indigo-500 font-semibold"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item._key ? null : item._key)
                    }
                  >
                    {item.label}
                  </button>
                  {openDropdown === item._key && (
                    <div className="pl-4 py-2">
                      {posts.map((post) => (
                        <Link key={post._id} href={`/${post.slug}`} className="block py-2 px-4  text-indigo-500 text-sm hover:bg-gray-200">
                          {post.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
      </div>
    ))}

    <div className="sm:flex items-center space-x-1 ml-2 mb-5">
      <Dashboard />
          </div>
        </div>
      )}
    </nav>
  )
}
