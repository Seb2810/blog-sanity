// queries/navbar.ts
export const NAVBAR_QUERY = `
{
  "navbar": *[_type == "navbar"][0]{
    _id,
    title,
    logo,
    items[]{
      _key,
      label,
      type,
      openInNewTab,
      link{
        externalUrl,
        slug,                // objet {current}, utile pour "static"
        internalReference->{
          _type,
          _id,
          slug               // objet {current}
        }
      }
    }
  },
  "pages": *[_type == "page"]{
    _id,
    title,
    "slug": slug.current     
  },
  "posts": *[_type == "post"]{
    _id,
    title,
    "slug": slug.current  
  }
}
`;

export const FOOTER_QUERY = `
{
  "footer": *[_type == "footer"][0]{
    _id,
    title,
    logo{
      asset->{
        _id,
        url
      }
    },
    columns[]{
      title,
      links[]{
        label,
        slug
      }
    },
    socialColumn{
      title,
      socialLinks[]{
        label,
        url,
        svgIcon,
        blank
      }
    },
    copyright
  }
}
`;

export const CAROUSEL_QUERY = `*[_type == "carousel" && slug.current == $slug][0]{
  _type,
  images[] {
    _key,
    "image": image.asset->url,
    label,
    slug
  }
}`;


export const articlesGridQuery = `
*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[]{
    _key,
    _type,
    // Hydratation spécifique pour articlesGrid
    _type == "articlesGrid" => {
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
    // Tous les autres types restent inchangés
    _type != "articlesGrid" => @
  }
}
`
;




/*note sur les projections

const PAGE_OR_POST_QUERY = `
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
`;

Ici la logique est différente :
carousel n’est pas un document autonome mais un bloc dans ton pageBuilder (donc stocké à l’intérieur du tableau content[]).
Je conserve le champ image entier (pas image.asset->url) pour que tu puisses utiliser ton helper urlFor de Sanity côté frontend (ça te permet de générer des variantes .width(400).height(300).format('webp') etc.).
Le champ slug est projeté sous forme d’objet { current }, cohérent avec ton type CarouselImage.

En GROQ :

... = "prends tous les champs du niveau actuel".
Tu peux ensuite ajouter des projections personnalisées en plus de ce spread.

*[_type == "post"][0]{
  ...,
  author->{
    name,
    image
  }
}
  ici :
... inclut tous les champs du post (title, slug, body, etc.).
Ensuite j’ajoute un champ author enrichi avec une projection sur l’auteur lié.
C’est exactement ce que j’ai fait dans PAGE_OR_POST_QUERY :

{
  ...,
  content[] {
    ...,
    _type == "carousel" => { ... }
  }
}

Le ... au niveau du document → inclut tous les champs (title, slug, mainImage, etc.).
Le ... dans content[] → inclut tous les champs communs de chaque bloc.
Puis j’écrase/complète avec une projection spéciale pour les blocs carousel.
⚡ Donc les ... sont juste des raccourcis pour éviter d’écrire title, slug, mainImage, body, ... à chaque fois.

content[] explication

content[]
→ Sanity te renvoie tous les objets contenus dans content avec tous leurs champs (sauf cas particuliers).
Donc pour un bloc grid-row ou card, Sanity te renvoie déjà :
les title,
les text,
les image (sous forme d’objet SanityImage, pas directement une URL).
Et comme tes composants GridRowComponent et CardComponent savent lire ces champs (block.title, block.image, block.text), ça marche directement, même sans projection personnalisée.

-----------------------------------

*[_type == "carousel" && slug.current == $slug][0]{
  _type,
  images[] {
    _key,
    "image": image.asset->url,
    label,
    slug
  }
}
Ici, j’utilise l’opérateur de condition _type == "carousel" => { ... } pour n’enrichir que les carousels, sans impacter le reste du contenu.
Ici tu vas chercher un document Sanity de type carousel à la racine de ton dataset (comme un singleton ou un document indépendant).
Tu imposes un slug au carousel.
Et tu projettes les images en remplaçant image par image.asset->url (donc directement une URL string).

*/