import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  type: "object",
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
      name: "buttontext",
      type: "string", // Assure-toi d'avoir défini ce type pour le texte riche
    }),
    defineField({
      name: "image",
      type: "image",
    }),
  ],
});
