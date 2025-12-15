import { defineField, defineType, defineArrayMember } from "sanity"
import { FaLastfmSquare } from "react-icons/fa"

export const postGridType = defineType({
  name: "postGrid",
  type: "object",
  title: "Articles Grille",
  icon: FaLastfmSquare,
  fields: [
    defineField({
      name: "items",
      title: "Articles",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          title: "Post",
          to: [{ type: "post" }],
          options: {
            disableNew: true, // empêche de créer un nouveau post directement
          },
        }),
      ],
      validation: (Rule) => Rule.max(10).error("Tu ne peux pas sélectionner plus de 10 articles"),
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      return {
        title: "Grille-articles",
        subtitle: items ? `${items.length} article(s)` : "Aucun article",
      }
    },
  },
})

