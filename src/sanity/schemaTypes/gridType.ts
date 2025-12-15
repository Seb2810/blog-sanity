import { defineType, defineField } from "sanity";
import { FaGgCircle } from "react-icons/fa";

export const gridRowType = defineType({
  name: "grid-row",
  title: "Grid Row",
  type: "object", // object defini ds les blocks et  document defini ds le menu de gauche
   icon: FaGgCircle,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titre du bloc",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title", // génère automatiquement le slug depuis le titre
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "columns",
      title: "Colonnes",
      type: "array",
      of: [
        {
          type: "object",
          name: "gridColumn",
          title: "Colonne",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Titre de la colonne",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              type: "array",
              title: "Liens",
              of: [
                {
                  type: "object",
                  name: "link",
                  title: "Lien",
                  fields: [
                    defineField({
                      name: "label",
                      type: "string",
                      title: "Texte du lien",
                      validation: (Rule) => Rule.required(),
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
              validation: (Rule) => Rule.max(4),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(3).max(3),
    }),
  ],
   preview: {
    select: {
      items: "columns", // Sélectionne le champ "items" pour la preview
    },
    prepare({ items }) {
      return {
        title: "Grille", // Affiche le titre du premier élément ou un texte par défaut
        subtitle: `Nombre de colonnes : ${items?.length || 0}`, // Affiche le nombre total d'éléments
      };
    },
  },
});
