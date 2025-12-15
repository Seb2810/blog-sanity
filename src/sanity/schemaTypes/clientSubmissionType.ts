import { defineType, defineField } from 'sanity'
import { FaPaperclip } from "react-icons/fa";

export const clientSubmissionType = defineType({
  name: 'clientSubmission',
  title: 'Clients',
  type: 'document',
  icon:FaPaperclip,
  fields: [
    defineField({
      name: 'formId',
      type: 'string',
      title: 'Formulaire d\'inscription'
    }),
    defineField({
      name: 'data',
      type: 'object',
      title: 'Données clients',
      fields: [
        { name: 'name', type: 'text', title: 'Nom' },
        { name: 'surname', type: 'text', title: 'Prénomm' },
        { name: 'email', type: 'text', title: 'Email' },
        { name: 'birthdate', type: 'date', title: 'date de naissance' },
        { name: 'password', type: 'string', title: 'Mot de passe' }
      ]
    }),
    defineField({
      name: 'submittedAt',
      type: 'datetime',
      title: 'Date de soumission'
    })
  ]
})
