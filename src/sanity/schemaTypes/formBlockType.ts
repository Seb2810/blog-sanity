// schemaTypes/formBlock.ts
import { defineType, defineField, defineArrayMember } from 'sanity'

export const formBlockType = defineType({
  name: 'formBlock',
  title: 'Formulaire',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre du formulaire'
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'fields',
      type: 'array',
      title: 'Champs du formulaire',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'formField',
          title: 'Champ',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label'
            }),
            defineField({
              name: 'name',
              type: 'string',
              title: 'Nom du champ (attribut name)'
            }),
            defineField({
              name: 'type',
              type: 'string',
              title: 'Type de champ',
              options: {
                list: [
                  { title: 'Texte', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Textarea', value: 'textarea' }
                ]
              }
            }),
            defineField({
              name: 'required',
              type: 'boolean',
              title: 'Obligatoire ?',
              initialValue: false
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'submitLabel',
      type: 'string',
      title: 'Texte du bouton',
      initialValue: 'Envoyer'
    }),
    defineField({
      name: 'successMessage',
      type: 'string',
      title: 'Message de succès',
      initialValue: 'Merci pour votre envoi !'
    })
  ]
})
