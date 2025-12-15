/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"
import { urlFor } from "@/sanity/lib/image"
import FormBlockClient from "./components/FormBlockClient";
import ArticlesGrid from "./components/Gridarticles";
import { HeroComponent } from "./components/Hero";
import { CardGrid } from "./components/CardGrid";
import Pagination from "./components/pagination/Pagination";

/*const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;
*/

const PAGE_QUERY = `
*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[] {
    ...,
    _type == "postGrid" => {
      ...,
      "total": count(items[!(_ref in path("drafts.**")) && defined(_ref)]),
      "items": items[!(_ref in path("drafts.**")) && defined(_ref)]->{
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        author->{name, image}
      }
    }
  }
}
`




const PAGE_SIZE = 3 // nombre d’articles par page

export default async function IndexPage({ searchParams }: { searchParams?: { page?: string } }) {
  
  const currentPage = Number(searchParams?.page) || 1
  
  const offset = (currentPage - 1) * PAGE_SIZE

  const page = await client.fetch(PAGE_QUERY, {
    slug: "/",
    //offset,
    //limit: PAGE_SIZE,
  })

//  const page = await client.fetch(PAGE_QUERY, { slug: "/" }) // ou "home" si tu mets "home" dans Sanity

  if (!page) {
    return <p>Page d accueil non trouvée</p>
  }

  console.log('page =='  , page.content)

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{page.title}</h1>

      {page.mainImage && (
        <img
          src={urlFor(page.mainImage).width(1200).height(600).url()}
          alt={page.title}
          className="mb-6 rounded-lg shadow mx-auto"
        />
      )}

      {page.content?.map((block: any, index: number) => {
        switch (block._type) {
          case "blockContent": // texte
            return <PortableText key={index} value={block} />
                   case "cardGallery":
           
             return <CardGrid key={index} data={block} />

          case "hero":
            return <HeroComponent key={index} data={block} />

case "postGrid":
  console.log('total articles  ' , block.total)
  
  return block.items ? (
    <ArticlesGrid key={index} data={block.items} total={block.total} limit={3} />
  ) : null

          case "formBlock":
            return <FormBlockClient key={index} {...block} />


          default:
            return null
        }
      })}
    </main>
  )
}
