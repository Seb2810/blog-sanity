import { defineField, defineType } from "sanity";
import { FaLastfmSquare } from "react-icons/fa";

export const cardgridType = defineType({
  name: "cardGallery",
  type: "object",
  title: "Card-Gallery",
  icon: FaLastfmSquare,
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          title: "Image ou SVG + lien",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Titre de la card",
            }),
            defineField({
              name: "content",
              type: "string",
              title: "Contenu de la card",
              validation: (Rule) => Rule.required(),
            }),
            // Ici on autorise soit une image, soit un SVG
           defineField({
            name: "media",
            title: "Visuel",
            type: "array",
            of: [
                {
                type: "image",
                title: "Image",
                options: { hotspot: true },
                },
                {
                type: "object",
                name: "svgIcon",
                title: "SVG (inline)",
                fields: [
                    {
                    name: "code",
                    type: "text",
                    title: "Code SVG",
                    description: "Collez ici le code complet du <svg>…</svg>",
                    },
                ],
                },
            ],
            validation: (Rule) =>
                Rule.custom((val) =>
                val && val.length === 1
                    ? true
                    : "Choisissez soit une image soit un SVG"
                ),
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
      items: "images",
    },
    prepare({ items }) {
      return {
        title:
          items?.length > 0
            ? `cardGallery : ${items[0].label}`
            : "cardGallery",
        subtitle: `Nombre d'éléments : ${items?.length || 0}`,
      };
    },
  },
});
