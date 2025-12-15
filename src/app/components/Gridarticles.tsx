/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import Pagination from "./pagination/Pagination"
import { useState } from "react"

type Post = {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  publishedAt?: string
  author?: {
    name: string
    image?: any
  }
}

type Props = {
  data: Post[]
  total: number
  limit?: number
}

export default function ArticlesGrid({ data, total, limit = 3 }: Props) {
  const [pageNumber, setPageNumber] = useState<number>(1)

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">Aucun article trouvé.</p>
  }

  const totalPages = Math.ceil(total / limit)

  // Découper les articles selon la page
  const startIndex = (pageNumber - 1) * limit
  const endIndex = startIndex + limit
  const displayedPosts = data.slice(startIndex, endIndex)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-10 ml-5 mr-5">
      {displayedPosts.map((post) => (
        <div key={post._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition animate-fade-up">
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(600).height(400).url()}
              alt={post.title}
              className="object-cover w-full h-48"
            />
          )}
          <div className="p-4">
            <div className="text-lg font-semibold">
              <Link href={`/${post.slug.current}`}>
                {post.title}
              </Link>
            </div>
            {post.author && <span>{post.author.name}</span>}
            {post.publishedAt && <p>{new Date(post.publishedAt).toLocaleDateString()}</p>}
          </div>
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 col-span-full">
          <Pagination totalPages={totalPages} currentPage={pageNumber} setPageNumber={setPageNumber} />
        </div>
      )}
    </div>
  )
}

