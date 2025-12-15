import { FaGgCircle } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export const heroCenterType = defineType({
  name: "heroCenter",
  type: "object",
   icon: FaGgCircle,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "bigtext",
      type: "blockContent", // Assure-toi d'avoir défini ce type pour le texte riche
    }),
       defineField({
      name: "middletext",
      type: "blockContent", // Assure-toi d'avoir défini ce type pour le texte riche
    }),
       defineField({
      name: "smalltext",
      type: "blockContent", // Assure-toi d'avoir défini ce type pour le texte riche
    }),
       defineField({
      name: "buttontext1",
      type: "string", // Assure-toi d'avoir défini ce type pour le texte riche
    }),
         defineField({
      name: "buttontext2",
      type: "string", // Assure-toi d'avoir défini ce type pour le texte riche
    }),
    defineField({
      name: "image",
      type: "image",
    }),
   // Colonne Réseaux sociaux
    defineField({
      name: "socialColumn",
      title: "Colonne réseaux sociaux",
      type: "object",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Titre de la colonne (ex: Suivez-nous)",
          initialValue: "Suivez-nous",
        }),
        defineField({
          name: "socialLinks",
          title: "Liens sociaux",
          type: "array",
          of: [
            {
              type: "object",
              name: "socialLink",
              title: "Lien social",
              fields: [
                defineField({
                  name: "label",
                  type: "string",
                  title: "Nom du réseau (Facebook, Twitter, Instagram...)",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "url",
                  type: "url",
                  title: "URL",
                  validation: (Rule) =>
                    Rule.required().uri({ scheme: ["http", "https"] }),
                }),
            defineField({
                  name: "svgIcon",
                  type: "text",
                  title: "SVG (inline)",
                  description: "Collez ici le code complet du <svg>…</svg>",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "blank",
                  type: "boolean",
                  title: "Ouvrir dans un nouvel onglet ?",
                  initialValue: true,
                }),
              ],
            },
          ],
          validation: (Rule) => Rule.min(3), // min 3 réseaux sociaux obligatoires
        }),
      ],
    }),
  ],
});
