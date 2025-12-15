/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineType, defineField, defineArrayMember } from 'sanity'
// /sanity/schemaTypes/navbar.ts


export const navbarType = defineType({
  name: 'navbar',
  title: 'Site Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Navigation Title',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Links',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'type',
              type: 'string',
              title: 'Type de lien',
              options: {
                list: [
                  { title: 'Liens statiques (liste)', value: 'static' },
                  { title: 'Toutes les pages', value: 'pages' },
                  { title: 'Tous les articles', value: 'posts' },
                ],
                layout: 'radio',
              },
              initialValue: 'static',
              validation: (r) => r.required(),
            }),

            // 👉 Plusieurs liens statiques
            defineField({
              name: 'links',
              title: 'Liens statiques',
              type: 'array',
              hidden: ({ parent }) => parent?.type !== 'static',
              of: [
                defineArrayMember({
                  name: 'link',
                  type: 'object',
                  title: 'Lien',
                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                      title: 'Label du lien',
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      name: 'internalReference',
                      type: 'reference',
                      title: 'Lien interne',
                      to: [{ type: 'page' }, { type: 'post' }],
                      // weak: true, // <- optionnel si tu veux tolérer la suppression de la cible
                    }),
                    defineField({
                      name: 'externalUrl',
                      type: 'url',
                      title: 'URL externe',
                    }),
                    defineField({
                      name: 'slug',
                      type: 'slug',
                      title: 'Slug (optionnel)',
                      options: { source: 'label', maxLength: 96 },
                    }),
                  ],
                  // 🔎 Au moins UNE cible (interne OU externe OU slug)
                  validation: (r) =>
                    r.custom((val) => {
                      const hasRef = !!val?.internalReference
                      const hasUrl = !!val?.externalUrl
                      const hasSlug = !!val?.slug
                      if (!hasRef && !hasUrl && !hasSlug) {
                        return 'Choisis un lien interne, une URL externe ou un slug.'
                      }
                      return true
                    }),
                  preview: {
                    select: {
                      title: 'label',
                      slug: 'slug.current',
                      url: 'externalUrl',
                      refSlug: 'internalReference.slug.current',
                      refType: 'internalReference._type',
                    },
                    prepare({ title, slug, url, refSlug, refType }) {
                      const sub =
                        (refSlug && `/${refSlug} (${refType})`) ||
                        (slug && `/${slug}`) ||
                        (url && url) ||
                        'Lien'
                      return { title: title || 'Lien', subtitle: sub }
                    },
                  },
                }),
              ],
              validation: (r) =>
                r.custom((links, ctx) => {
                  const parent = (ctx?.parent as any) || {}
                  if (parent?.type === 'static') {
                    if (!links || links.length === 0) {
                      return 'Ajoute au moins un lien statique.'
                    }
                  }
                  return true
                }),
            }),

            defineField({
              name: 'openInNewTab',
              type: 'boolean',
              title: 'Ouvrir dans un nouvel onglet',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              type: 'type',
              links: 'links',
            },
            prepare({ title, type, links }) {
              const count = Array.isArray(links) ? links.length : 0
              const subtitle =
                type === 'static'
                  ? `Liens statiques (${count})`
                  : type === 'pages'
                  ? 'Toutes les pages'
                  : 'Tous les articles'
              return { title, subtitle }
            },
          },
        }),
      ],
    }),
  ],
})
