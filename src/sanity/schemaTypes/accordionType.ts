import { defineField, defineType } from "sanity";
import { FaListUl   } from "react-icons/fa";

export const accordionType = defineType({
  name: "accordion",
  type: "object",
  title: "Accordion",
   icon: FaListUl,
  fields: [
    defineField({
      name: "items",
      title: "Accordion Item",
      type: "array",
      of: [
        {
          type: "object",
          title: "titre + contenu",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Titre",
           
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              type: "string",
              title: "Contenu",

              validation: (Rule) => Rule.required(),
              
            }),
         
          ],
        },
      ],
      validation: (Rule) => Rule.max(25),
    }),
  ],
  preview: {
    select: {
      items: "items", // Sélectionne le champ "items" pour la preview
    },
    prepare({ items }) {
      return {
        title: items?.length > 0 ? `Accordéon : ${items[0].title} `: "Accordéon", // Affiche le titre du premier élément ou un texte par défaut
        subtitle: `Nombre d'éléments : ${items?.length || 0}`, // Affiche le nombre total d'éléments
      };
    },
  },
});
