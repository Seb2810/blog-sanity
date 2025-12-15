import { defineField, defineType } from "sanity";
import { FaLastfmSquare  } from "react-icons/fa";

export const galleryType = defineType({
  name: "gallery",
  type: "object",
  title: "Gallery",
   icon: FaLastfmSquare,
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          title: "Image + lien",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              type: "string",
              title: "Texte du lien",
            }),
            defineField({
              name: "slug",
              type: "slug",
              title: "Slug",
              options: {
                source: "label",
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(12),
    }),
  ],
    preview: {
    select: {
      items: "images", // Sélectionne le champ "items" pour la preview
    },
    prepare({ items }) {
      return {
        title: items?.length > 0 ?  `Gallerie : ${items[0].label } `: "Gallery", // Affiche le titre du premier élément ou un texte par défaut
        subtitle: `Nombre d'éléments : ${items?.length || 0}`, // Affiche le nombre total d'éléments
      };
    },
  },
});
