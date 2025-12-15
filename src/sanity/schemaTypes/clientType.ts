 import { defineType, defineField } from 'sanity'
 import { FaBatteryFull } from "react-icons/fa";

 export const clientType = defineType({
   name: 'clients',
   title: 'Clients',
   type: 'document',
   icon: FaBatteryFull,
   fields: [
     defineField({
       name: 'clients',
       type: 'string',
       title: 'Clients'
     }),
     defineField({
       name: 'data',
       type: 'object',
       title: 'Données soumises',
       fields: [
         { name: 'name', type: 'string', title: 'Nom' },
           { name: 'surname', type: 'string', title: 'Prenom' },
         { name: 'email', type: 'string', title: 'Email' },
            { name: 'birthdate', type: 'date', title: 'Date de naissance' },
             { name: 'password', type: 'string', title: 'Mot de passe' },
       ]
     }),
     defineField({
       name: 'submittedAt',
       type: 'datetime',
       title: 'Date de soumission'
     })
   ]
 })