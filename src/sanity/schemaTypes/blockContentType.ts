//import React from "react";
import { defineType, defineField, defineArrayMember } from 'sanity'
import { textColors } from './colors'

// Petite fonction utilitaire pour rendre un rond coloré probleme ici 
/*const ColorIcon = (color: string) => () => React.createElement("span", {
    style: {
      display: "inline-block",
      width: 14,
      height: 14,
      borderRadius: "50%",
      backgroundColor: color,
    },
  });*/

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike'},
          {title: 'Code', value: 'code'},
           // Couleurs dynamiques
          //...textColors.map(c => ({ title: c.title, value: c.value })),
        ],
        annotations: [
          {
            type: 'object',
            name: 'link',
            fields: [
              {type: 'string', name: 'href'},
            ],
            
          },
            // Annotation couleur (nécessite le plugin)
          {
            name: 'color',
            title: 'Color',
            type: 'color',
          },
        ]
      }
    },
    {type: 'image'},
    // Tu peux ajouter d'autres types personnalisés ici
  ]
})
