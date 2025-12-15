/* eslint-disable @next/next/no-img-element */
//* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/[slug]/page.tsx

import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import { CommentForm } from "../components/comment";
import { Comments } from "../components/commentaires";

import PostPageClient from "../components/postclient";
import { Post } from "../types/types";
import { form } from "sanity/desk";
import FormBlockClient from "../components/FormBlockClient";
import { GridRowComponent } from "../components/grid";
import { CardComponent } from "../components/card";
import { CarouselComponent } from "../components/Carousel";
import { GalleryComponent } from "../components/Gallery";
import { AccordionComponent } from "../components/Accordion";
import { HeroComponent} from "../components/Hero";
import { HeroComponentCenter} from "../components/Herocenter";
import FormClientComponent from "../components/Signin";
import LoginPage from "../components/Login";
import { CtaComponent } from "../components/ctaComponent";
import ArticlesGrid from "../components/Gridarticles";
import { articlesGridQuery } from "@/sanity/queries";
import { CardGrid } from "../components/CardGrid";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

//const PAGE_OR_POST_QUERY = `*[(_type == "post" || _type == "page") && slug.current == $slug][0]`;
const PAGE_OR_POST_QUERY = `*[(_type == "post" || _type == "page") && slug.current == $slug][0]{
  ...,
  content[] {
    ...,
    // postGrid
    _type == "postGrid" => {
      _type,
      _key,
      items[]->{
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        author->{name, image}
      }
    },

    // accordion
    _type == "accordion" => {
      _type,
      _key,
      items[] {
        title,
        content
      }
    },

    // cardGallery
    _type == "cardGallery" => {
      _type,
      _key,
      images[] {
        title,
        content,
        label,
        slug,
        "media": media[0]{
          // if image
          ...select(
            _type == "image" => {
              "type": "image",
              "url": asset->url
            },
            // if svgIcon
            _type == "svgIcon" => {
              "type": "svg",
              "svg": code
            }
          )
        }
      }
    },

    // formBlock
    _type == "formBlock" => {
      _type,
      _key,
      title,
      description,
      successMessage,
      submitLabel,
      formKey,
      fields[] {
        label,
        type,
        name,
        required
      }
    }
  }
}`;





//const COMMENTS_QUERY = `*[_type == "comment" && post._ref == $postId] | order(createdAt desc)`;
/*const PAGE_OR_POST_QUERY = `
*[
  (_type == "post" || _type == "page") && slug.current == $slug
][0]{
  ...,
  content[] {
    ...,
    _type == "carousel" => {
      _type,
      _key,
      images[] {
        _key,
        image,
        label,
        slug {
          current
        }
      }
    }
  }
}
`;*/


//const QUERY_GRID = `*[_type == "grid-row" && slug.current == $slug][0]`;
//const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();

/*const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
*/

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
 params: { slug: string } | Promise<{ slug: string }>;
}) {

  /*
  au lieu de  params: { slug: string }
  utiliser   params: { slug: string } | Promise<{ slug: string }>;
  `params` should be awaited before using its properties
Next.js peut injecter params comme une Promise dans certains scénarios (app router + rendu asynchrone). 
Si tu utilises directement params.slug, Next.js t’avertit et lève l’erreur.
La solution simple : const { slug } = await params;.

  */
  const { slug } = await params;

  const doc = await client.fetch(PAGE_OR_POST_QUERY, { slug }, options);

const gridBlog = await client.fetch(articlesGridQuery, { slug }, options);
console.log('gridBlog --> ' , gridBlog)

  if (!doc) {
    // Gérer le 404
    return <div>Not found</div>;
  }

    if(slug==="login"){
console.log('**********login slug***********')
return (

  <LoginPage/>
)

    }

if (doc._type === "post") {
  //if(slug == 'post-test'){

  console.log('slug ' , slug)


  const post = await client.fetch<Post>(POST_QUERY, { slug }, options);

  // Récupération des commentaires liés à ce post
  //const comments = await client.fetch(COMMENTS_QUERY, { postId: post._id }, options);



   const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const builder = urlFor(post.mainImage);

const postImageUrl = builder ? builder.width(800).height(600).url() : undefined;

    // compteur initial géré côté serveur
  const initialCommentsCount = await client.fetch(
    `count(*[_type == "comment" && post._ref == $postId])`,
    { postId: post._id },
    options
  );

  return (
    <main  className="mt-10 mb-10 mx-auto">
   
<PostPageClient
      post={post}
      postImageUrl={postImageUrl}
     
    />


    </main>
  );
}
if (doc._type === "page") {
    // Rendu d'une page (exemple simple)
      console.log('slug ' , slug)

console.log('doc ===>' ,doc)
  
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : undefined;

    //console.log('doc.mainImage ==> ' ,doc.mainImage)
const builder = urlFor(doc.mainImage);

const imageUrl =
  doc.mainImage
    ? urlFor(doc.mainImage)?.width(800).height(600).url()
    : undefined;

console.log('--->imageUrl MainImage ' , imageUrl)

    const bodyPart= doc.body ;

console.log('bodyPart docBody ' , bodyPart)

//showBody
const showBodyOne = doc.showBody
console.log('showBodyOne  ' , showBodyOne)
//showMainImage
const showMainImageOne = doc.showMainImage
console.log('showMainImageOne  ' , showMainImageOne)


    // Vérifie si un FormClientComponent existe pour décider si on rend doc.body
    //const hasFormClient = doc.body?.some((b: any) => b._type === "formClient");
// conditionne l'affichage su contenu sur le cas formClient
//const hasFormClientBlock = doc.content?.some((b: { _type: string }) => b._type === 'formClient');

    return (
      <main>
       

        {showMainImageOne && <img className="h-auto mx-auto max-w-full rounded-lg" 
                       src={urlFor(doc.mainImage)?.width(1000).height(600).url()}
                       alt={ "gallery image "}
                     />}

         {showBodyOne &&   <PortableText value={bodyPart} />}

       

    {/* Nouveau : rendu du pageBuilder */}
      {doc.content?.map( (block: any, index: number) => {
        switch (block._type) {
          case 'hero':
            return (
              <HeroComponent key={index} data={block} />
            )
            case 'ctaHero':
            return (
              <CtaComponent key={index} data={block} />
            )
      
       case 'heroCenter':
            return (
              <HeroComponentCenter key={index} data={block} />
            )
          case 'blockContent':
            return <PortableText key={index} value={block} />
         
         case 'formBlock':
      return (
      <FormBlockClient
          key={index}
          title={block.title}
          description={block.description}
          successMessage={block.successMessage}
          submitLabel={block.submitLabel}
          fields={block.fields}
          formKey={block._key}     />
      )

       case "formClient":
        console.log('doc.body ' , doc.body)
  return <FormClientComponent 
    key={index}
    data={block}
    imgPage={doc.showMainImage ? imageUrl : undefined}
    body={doc.showBody ? doc.body : undefined}
    showBody={doc.showBody} 
    successMessage={""} 
    formKey={""} />;

    
      //  Utilisation du composant
         case "cardGallery":
 return <CardGrid key={index} data={block} />

     case "postGrid":
 return <ArticlesGrid key={index} data={block.items} /> // ✅ items résolus via -> dans la requête

    case "grid-row":
      return <GridRowComponent key={index} data={block} />;
         
      case "card":
          return <CardComponent key={index} data={block}/>;
          
          case "carousel":
           // console.log('doc images ' ,block)
            return <CarouselComponent key={index}  data ={block}/>
  
            case "gallery":
            //console.log('doc gallery ' ,block)
            return <GalleryComponent key={index}  data ={block}/>

                   case "accordion":
            console.log('doc accordion ' ,block)
            return <AccordionComponent key={index}  data ={block}/>

            default:
            return null
        }
      })}

        {/* Affiche le contenu riche si présent */}
        {/*doc.body && <PortableText value={doc.body} />*/}
         {/*!hasFormClientBlock && doc.body && <PortableText value={doc.body} />*/}
        {/* Ou ton pageBuilder si tu utilises ce système */}
      </main>
    );
  }


  // Fallback
  return <div>Type inconnu</div>;
}
