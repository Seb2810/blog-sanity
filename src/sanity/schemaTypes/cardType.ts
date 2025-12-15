import { defineField, defineType } from "sanity";

export const cardType = defineType({
  name: "card",
  type: "object",
  fields: [

    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "text",
      type: "blockContent", // Assure-toi d'avoir défini ce type pour le texte riche
    }),
      defineField({
      name: "submit",
      type: "string",
    }),
  ],
});
