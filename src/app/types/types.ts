/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Post {
  _id: string;
  title: string;
  publishedAt: string;
  body: any;
  mainImage?: any;
}

export interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}


export interface Cta {
  _type: 'ctaHero';
  title?: string;
  bigtext?: BlockContent[];
  middletext?: BlockContent[];
  smalltext?: BlockContent[];
  buttontext?: string;
  image: SanityImage;
}

export interface Hero {
  _type: 'hero';
  title?: string;
  bigtext?: BlockContent[];
  middletext?: BlockContent[];
  smalltext?: BlockContent[];
  buttontext?: string;
  image: SanityImage;
}


export interface HeroCenter {
  _type: 'hero';
  title?: string;
  bigtext?: BlockContent[];
  middletext?: BlockContent[];
  smalltext?: BlockContent[];
  buttontext1?: string;
  buttontext2?: string;
  image: SanityImage;
    socialColumn?: {
    title?: string;
    socialLinks: Array<{
      label: string;
      url: string;
      svgIcon: string; // ⬅️ ici changement : c’est du texte brut (le <svg>…</svg>)
      blank?: boolean;
    }>;
  };
}

// Interface pour le type pageBuilder (array de Hero)
export type PageBuilder = [];

// Interface pour le type blockContent (array de blocks et images)
export type BlockContent = Block | BlockImage;

export interface Block {
  _type: 'block';
  style?: 'normal' | 'h1' | 'h2' | 'blockquote';
  listItem?: 'bullet' | 'number';
  children: BlockChild[];
  markDefs?: MarkDef[];
}

export interface BlockChild {
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface MarkDef {
  _type: 'link';
  href: string;
}

export interface BlockImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Interface pour l'image Sanity
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  // autres propriétés possibles selon ta config image
}

// Interface principale pour la page
export interface Page {
  _id: string;
  _type: 'page';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: {
    _type: 'slug';
    current: string;
  };
  mainImage?: SanityImage;
  content?: PageBuilder;
  body?: BlockContent[];
}

export interface Navbar {
  _id: string
  _type: 'navbar'
  title: string
  logo: SanityImage
  items: NavItem[]
}

export type NavItemType = 'static' | 'pages' | 'posts'

export interface NavItem {  
  _key: string
  label: string
  type: NavItemType
  // 🔥 on remplace link unique par un tableau
  links?: Link[]  
  openInNewTab: boolean
}

export interface Link {
  label?: string;
  internalReference?: {
    _type: 'reference'
    _ref: string
    slug?: { _type: 'slug'; current: string }
  }
  externalUrl?: string
  slug?: { _type: 'slug'; current: string }
}

// Résumés pour les listes
export interface PageSummary {
  _id: string
  title: string
  slug: string // 👈 string (plus simple)
}

export interface PostSummary {
  _id: string
  title: string
  slug: string // 👈 string (plus simple)
}

// Shape du résultat GROQ
export interface NavbarBundle {
  navbar: Navbar | null
  pages: PageSummary[]
  posts: PostSummary[]
}

export interface GridRow {
  _type: "grid-row";
  columns: GridColumn[];
}

export interface GridColumn {
  title: string;
  links?: GridLink[]; // optionnel, max 4
}

export interface GridLink {
  label: string;
  slug: {
    _type: "slug";
    current: string;
  };
}


export interface Footer {
  _type: "footer";
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  logo?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  columns: Array<{
    title: string;
    links: Array<{
      label: string;
      slug: {
        _type: "slug";
        current: string;
      };
    }>;
  }>;
  copyright?: string;
  socialColumn?: {
    title?: string;
    socialLinks: Array<{
      label: string;
      url: string;
      svgIcon: string; // ⬅️ ici changement : c’est du texte brut (le <svg>…</svg>)
      blank?: boolean;
    }>;
  };
}

export interface Card {
  _type: 'card';
  title?: string;
  text?: BlockContent[];
  image?: SanityImage | undefined ;
  submit?:string;
}

export interface CarouselImage {
  _type: "carouselImage";
  _key: string;
  image: SanityImage; // 👈 si tu utilises SanityImage
  label: string;
  slug: {
    _type: "slug";
    current: string;
  };
}

export interface Carousel {
  _type: "carousel";
  _key: string;
  images: CarouselImage[];
}



export interface GalleryImage {
  _type: "galleryImage";
  _key: string;
  image: SanityImage; // 👈 si tu utilises SanityImage
  label: string;
  slug: {
    _type: "slug";
    current: string;
  };
}

export interface Gallery {
  _type: "gallery";
  _key: string;
  images: GalleryImage[];
}


export interface Accordion {
  _type: "accordion";
  _key: string;
  items: AccordionArray[];
}


export interface AccordionArray {
  _type: "accordionArray";
  _key: string;
  title: string; // 👈 si tu utilises SanityImage
  content: string;

}

export interface SignIn {
  _type: "formClient";
  _key?: string;           // Clé interne Sanity pour les blocks
  title: string;           // Titre du formulaire
  fields: SignInData[]; // Liste des champs du formulaire
  submitLabel?: string;    // Texte du bouton d'envoi
  successMessage?: string;
}


export interface SignInData {


  label: string;           // Label affiché dans le formulaire
  name: string;            // Attribut name du champ
  type: 'text' | 'date' | 'password' | 'email'; // Type HTML du champ
  required?: boolean; 
}

export interface CardGallery {
  _type: "cardGallery";
  images?: CardGalleryItem[];
}

export interface CardGalleryItem {
  _type: "object"; // Sanity object
  title?: string;
  content: string;
  media: Media[]; // tableau qui contient soit une image, soit un SVG
  label?: string;
  slug: {
    _type: "slug";
    current: string;
  };
}

export type Media =
  | {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    }
  | {
      _type: "svgIcon";
      code: string; // <-- champ défini dans le schema
    };
