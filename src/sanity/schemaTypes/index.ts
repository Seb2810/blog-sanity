import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { commentType } from './commentaires'
import { navbarType } from './menuType'
import { pageType } from './pageType'
import { pageBuilderType } from './pageBuilderType'
import { heroType } from './heroType'
import { formBlockType } from './formBlockType'
import { formSubmissionType } from './formSubmissionType'
import { gridRowType } from './gridType'
import { footerType } from './footerType'
import { cardType } from './cardType'
import { carouselType } from './carouselType'
import { galleryType } from './galleryType'
import { accordionType } from './accordionType'
import { formClientType } from './formClientType'
import { clientType } from './clientType'
import { clientSubmissionType } from './clientSubmissionType'
import { heroCenterType } from './HeroCenterType'
import { ctaType } from './ctaType'
import { postGridType } from './articlesGridType'
import { cardgridType } from './cardGridType'



export const schemaTypes = [
  blockContentType,
  categoryType,
  postType,
  authorType,
  commentType,
  navbarType,
  pageType,
   pageBuilderType,
   heroType,
   formBlockType,
   formSubmissionType,
   gridRowType,
   footerType,
   cardType,
   carouselType,
   galleryType,
   accordionType,
   formClientType,
   clientType,
  clientSubmissionType,
  heroCenterType,
  ctaType,
postGridType,
cardgridType

]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, 
    categoryType, 
    postType, 
    authorType ,
    commentType , 
    navbarType , 
    pageBuilderType, 
    heroType,
    pageType,
    formBlockType,
    formSubmissionType,
    gridRowType,
    footerType,
    cardType,
    carouselType,
    galleryType,
    accordionType,
    formClientType,
    clientType,
    clientSubmissionType,
    heroCenterType,
    ctaType,
   postGridType,
   cardgridType
  ]
}
