import { defineField, defineType } from "sanity";
import { FaCartArrowDown   } from "react-icons/fa";

export const carouselType = defineType({
  name: "carousel",
  type: "object",
  title: "Carousel",
    icon: FaCartArrowDown,
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
      validation: (Rule) => Rule.max(6),
    }),
  ],
    preview: {
    select: {
      items: "images", // Sélectionne le champ "items" pour la preview
    },
    prepare({ items }) {
      return {
        title: "Carrousel", // Affiche le titre du premier élément ou un texte par défaut
        subtitle: `Nombre d'éléments : ${items?.length || 0}`, // Affiche le nombre total d'éléments
      };
    },
  },
});
