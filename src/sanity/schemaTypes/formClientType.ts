import { defineType, defineField, defineArrayMember } from 'sanity'
// schemaTypes/formBlock.ts
//formulaire pour creer le resiter client


export const formClientType = defineType({
  name: 'formClient',
  title: 'Formulaire Client',
  type: 'object',
fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre du formulaire'
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
                  { title: 'name', value: 'text' },
                  { title: 'surname', value: 'text' },
                   { title: 'email', value: 'text' },
                  { title: 'birthdate', value: 'date' },
                  { title: 'password', value: 'string' }
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
