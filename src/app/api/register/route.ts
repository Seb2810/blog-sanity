// /app/api/form/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import bcrypt from "bcrypt"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.NEXT_SANITY_API_WRITE_TOKEN!, // token avec droits d'écriture
  apiVersion: '2025-01-01',
  useCdn: false
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('body', body)

    // Extraire les champs depuis body.data
    const { Nom, Prenom, email, birthdate, Password } = body.data

    // Vérifier si l'email existe déjà
    const existing = await client.fetch(
      `*[_type == "clientSubmission" && data.email == $email][0]`,
      { email }
    )

    if (existing) {
      return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 })
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(Password, 10)

    // Créer le document en respectant le schéma
    await client.create({
      _type: 'clientSubmission',
      formId: body.formId || 'unknown-form',
      data: {
        name: Nom,
        surname: Prenom,
        email,
        birthdate,
        password: hashedPassword
      },
      submittedAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Erreur lors de l’enregistrement' }, { status: 500 })
  }
}
