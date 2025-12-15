// ./schemas/pageType.ts
import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),

    // Toggle pour l'image principale
    defineField({
      name: 'showMainImage',
      type: 'boolean',
      title: 'Show Main Image',
      initialValue: false,
    }),

    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.showMainImage === false, // 👈 condition
    }),

    // Contenu construit via builder (sections, blocs, etc.)
    defineField({
      name: 'content',
      type: 'pageBuilder',
      title: 'Content',
    }),

    // Toggle pour le body
    defineField({
      name: 'showBody',
      type: 'boolean',
      title: 'Show Body',
      initialValue: false,
    }),

    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
      hidden: ({ parent }) => parent?.showBody === false, // 👈 condition
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'mainImage'
    },
  },
})
