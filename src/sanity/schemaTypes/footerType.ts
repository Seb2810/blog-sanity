import { defineType, defineField } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document", // visible dans le menu de gauche
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
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: { hotspot: true },
    }),

    // Colonnes principales
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

    // Copyright
    defineField({
      name: "copyright",
      type: "string",
      title: "Copyright",
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
