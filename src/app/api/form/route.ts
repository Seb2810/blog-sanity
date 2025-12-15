// /app/api/form/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { z } from "zod"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.NEXT_SANITY_API_WRITE_TOKEN!, // token avec droits d'écriture
  apiVersion: '2025-01-01',
  useCdn: false
})

const formSchema = z.object({
  formId: z.string().min(1),
  data: z.object({
    nom: z.string().min(3),
    email: z.email(),
    message: z.string().min(10),
  }),
})


export async function POST(req: Request) {
  const body = await req.json()
  
  const parsed = formSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 })
  }
  await client.create({
    _type: 'formSubmission',
    formId: body.formId,
    data: body.data,
    submittedAt: new Date().toISOString()
  })

  return NextResponse.json({ success: true })
}
