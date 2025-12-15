/* eslint-disable @typescript-eslint/no-explicit-any */
import { textColors } from "@/sanity/schemaTypes/colors";
import { PortableText } from "next-sanity";


export default function RichText({ content }: { content: any }) {
  // Génère automatiquement les décorateurs de couleur
  const colorMarks = Object.fromEntries(
    textColors.map(c => [
      c.value,
      ({ children }: { children: React.ReactNode }) => (
        <span style={{ color: c.value }}>{children}</span>
      ),
    ])
  );

  return (
    <PortableText
      value={content}
      components={{
        marks: {
          ...colorMarks,
          strong: ({ children }) => <strong>{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <span style={{ textDecoration: 'underline' }}>{children}</span>,
          strike: ({ children }) => <span style={{ textDecoration: 'line-through' }}>{children}</span>,
          code: ({ children }) => <code>{children}</code>,
        },
      }}
    />
  );
}
