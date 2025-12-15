
import { defineType, defineArrayMember } from "sanity";
import { heroType } from "./heroType";
import { formBlockType } from "./formBlockType";
import { gridRowType } from "./gridType";
import { cardType } from "./cardType";
import { carouselType } from "./carouselType";
import { galleryType } from "./galleryType";
import { accordionType } from "./accordionType";
import { formClientType } from "./formClientType";
import { heroCenterType } from "./HeroCenterType";
import { ctaType } from "./ctaType";
import { postGridType } from "./articlesGridType";
import { cardgridType } from "./cardGridType";


export const pageBuilderType = defineType({
   name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember(heroType),
    defineArrayMember(formBlockType),
    defineArrayMember(gridRowType),
    defineArrayMember(cardType),
    defineArrayMember(carouselType),
    defineArrayMember(galleryType),
    defineArrayMember(accordionType),
    defineArrayMember(formClientType),
    defineArrayMember(heroCenterType),
    defineArrayMember(ctaType),
    defineArrayMember(postGridType),
    defineArrayMember(cardgridType),
    // tu peux ajouter d'autres blocs personnalisés ici
  ]
})