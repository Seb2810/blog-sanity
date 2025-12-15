// schemaTypes/formSubmission.ts
import { defineType, defineField } from 'sanity'
import { FaPaperclip } from "react-icons/fa";

export const formSubmissionType = defineType({
  name: 'formSubmission',
  title: 'Réponse formulaire',
  type: 'document',
  icon:FaPaperclip,
  fields: [
    defineField({
      name: 'formId',
      type: 'string',
      title: 'Formulaire lié'
    }),
    defineField({
      name: 'data',
      type: 'object',
      title: 'Données soumises',
      fields: [
        { name: 'nom', type: 'string', title: 'Nom' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'message', type: 'text', title: 'Message' }
      ]
    }),
    defineField({
      name: 'submittedAt',
      type: 'datetime',
      title: 'Date de soumission'
    })
  ]
})
