/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// src/components/PageRenderer.tsx

import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";




import { PageBlock, PageDoc } from "../types/types";
import { AccordionComponent } from "./Accordion";
import { CardComponent } from "./card";
import { CarouselComponent } from "./Carousel";
import { CtaComponent } from "./ctaComponent";
import FormBlockClient from "./FormBlockClient";
import { GalleryComponent } from "./Gallery";
import { GridRowComponent } from "./grid";
import { HeroComponent } from "./Hero";
import { HeroComponentCenter } from "./Herocenter";
import FormClientComponent from "./Signin";

const { projectId, dataset } = client.config();
const urlFor = (source: any) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export function PageRenderer({ doc }: { doc: PageDoc }) {
  // Valeurs "globales"
  const imageUrl = doc.mainImage
    ? urlFor(doc.mainImage)?.width(1200).height(600).url()
    : undefined;

  const globalProps = {
    imgPage: doc.showMainImage ? imageUrl : undefined,
    body: doc.showBody ? doc.body : undefined,
    showBody: doc.showBody ?? false,
  };

  return (
    <main>
      <h1>{doc.title}</h1>

      {/* Image "globale" si activée */}
      {doc.showMainImage && imageUrl && (
        <img
          src={imageUrl}
          alt={doc.title}
          className="rounded-2xl shadow-md mb-8"
        />
      )}

      {/* Parcours des blocs */}
      {doc.content?.map((block: PageBlock , index: number) => {
        const props = { ...globalProps, index: block._key, data: block  };

        switch (block._type) {
          case "hero":
            return <HeroComponent data={block} imgPage={doc.showMainImage ? imageUrl : undefined} body={doc.showBody ? doc.body : undefined} showBody={doc.showBody} />

          case "ctaHero":
            return <CtaComponent {...props} />;
          case "heroCenter":
            return <HeroComponentCenter {...props} />;
          case "blockContent":
            return (
              <PortableText key={block._key} value={block.children || []} />
            );
          case "formBlock":
            return <FormBlockClient {...props} {...block} formKey={block._key} />;
          case "formClient":
            return <FormClientComponent {...props} successMessage="" formKey={block._key} />;
          case "grid-row":
            return <GridRowComponent {...props} />;
          case "card":
            return <CardComponent {...props} />;
          case "carousel":
            return <CarouselComponent {...props} />;
          case "gallery":
            return <GalleryComponent {...props} />;
          case "accordion":
            return <AccordionComponent {...props} />;
          default:
            return null;
        }
      })}

      {/* Body classique si demandé */}
      {doc.showBody && doc.body && (
        <div className="prose max-w-none">
          <PortableText value={doc.body} />
        </div>
      )}
    </main>
  );
}
