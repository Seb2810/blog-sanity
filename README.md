This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Example Schema 

Accordian that can be repetead 25 times
```ts
import { defineField, defineType } from "sanity";

export const accordionType = defineType({
  name: "accordion",
  type: "object",
  title: "Accordion",
  fields: [
    defineField({
      name: "items",
      title: "Sections",
      type: "array",
      of: [
        defineType({
          name: "accordionItem",
          type: "object",
          title: "Titre + Contenu",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Titre",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              type: "string", // ou "array" avec "block" si contenu riche
              title: "Contenu",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(25),
    }),
  ],
});
```
In Sanity Studio, when you view a list of objects (or a field in a table), by default it only displays the schema title or "object" → not very informative.

⚡The preview allows you to control what is displayed visually:

title → what appears in bold.

subtitle → what appears below.

media → an image or a React icon.

⚡Preview Structure

A preview typically contains two parts:

select → choose the fields you want to retrieve.

prepare → format the display (optional but very useful).

Simple example:
```ts
preview: {
  select: {
    title: "title",      // get the "title"
    subtitle: "content", // get the "content"
  },
}
```
⚡With prepare

Sometimes you want to add logic: default text, a different icon, etc.
That's where prepare comes in.
```ts
preview: {
  select: {
    title: "title",
    subtitle: "content",
  },
  prepare({ title, subtitle }) {
    return {
      title: title || "Sans titre",          // fallback if empty
      subtitle: subtitle || "Pas de contenu",
      media: () => <FaHeading />,           // icon or image
    }
  },
}
```
⚡complete example

npm install react-icons
```ts
import { defineField, defineType } from "sanity";
import { FaListUl, FaHeading, FaAlignLeft } from "react-icons/fa";

export const accordionType = defineType({
  name: "accordion",
  type: "object",
  title: "Accordion",
  icon: FaListUl, // Icône globale pour le type
  fields: [
    defineField({
      name: "items",
      title: "Sections",
      type: "array",
      of: [
        defineType({
          name: "accordionItem",
          type: "object",
          title: "Section",
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
          preview: {
            select: {
              title: "title",
              subtitle: "content",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Sans titre",
                subtitle: subtitle || "Pas de contenu",
                media: FaHeading, // 👈 Icône affichée à gauche
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(25),
    }),
  ],
  preview: {
    select: {
      title: "items.0.title",
      subtitle: "items.0.content",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Accordion",
        subtitle: subtitle || "Sections d'accordéon",
        media: FaListUl, // 👈 Icône globale
      };
    },
  },
});
```
