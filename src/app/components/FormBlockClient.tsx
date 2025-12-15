'use client'


import React, { useRef, useState } from 'react'
import { z, ZodObject, ZodString, ZodTypeAny } from 'zod'

interface FormField {
  label: string
  type: string
  name: string
  required?: boolean
}

interface FormBlockProps {
  title: string
  description?: string
  successMessage?: string
  submitLabel?: string
  fields?: FormField[]
  formKey?: string
}

export default function FormBlockClient({
  title,
  description,
  successMessage,
  submitLabel = 'Envoyer',
  fields = [],
  formKey,
}: FormBlockProps) {
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({})
  const [globalError, setGlobalError] = useState<string | null >(null)
const formRef = useRef<HTMLFormElement>(null)
  // 🔹 Construire le schéma Zod dynamiquement
  const buildSchema = () => {
  const shape: Record<string, ZodTypeAny> = {} // <-- déclarer ici, pas dans la boucle

  fields.forEach((field) => {
    let validator: ZodTypeAny = z.string()

    if (field.type === 'email') {
      validator = z.email("Adresse email invalide")
    }

    if (field.required) {
      validator = z.string().min(2, `${field.label} est requis`)
    } else {
      validator = validator.optional().transform((v) => v ?? "")
    }

    if (field.name === 'message') {
      validator = z.string().min(10, "Le message doit faire au moins 10 caractères")
    }

    shape[field.name] = validator
  })

  return z.object(shape)
}


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setGlobalError(null)

    const formData = new FormData(e.currentTarget)
    const data: Record<string, string > = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })

    // Validation Zod dynamique
    const schema = buildSchema()
    const result = schema.safeParse(data)

    if (!result.success) {
      const { fieldErrors, formErrors } = result.error.flatten()
     
      const normalizedErrors: Record<string, string[]> = {}
for (const key in fieldErrors) {
  normalizedErrors[key] = fieldErrors[key] ?? []
}
      setErrors(normalizedErrors)
      if (formErrors.length > 0) {
        setGlobalError(formErrors.join(', '))
      }
      return
    }

    try {
      const res = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: formKey || 'contact-form',
          data,
        }),
      })

      if (!res.ok) {
        throw new Error('Erreur réseau')
      }

      alert(successMessage || 'Formulaire envoyé !')
     // e.currentTarget.reset()
     formRef.current?.reset()
    } catch (err) {
      console.error(err)
      setGlobalError('Erreur lors de l’envoi du formulaire')
    }
  }

  return (
    <section className="form-section mt-10 mb-10 mx-auto">
      <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
        <div className="text-center text-indigo-500 font-bold text-2xl uppercase mb-10">
          {title}
        </div>

        <form ref={formRef} onSubmit={handleSubmit}  noValidate>
          {fields.map((field, i) => (
            <div key={i}>
              <label className="block mb-2 font-bold text-indigo-500">
                {field.label}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  className="border border-gray-300 shadow p-3 w-full rounded mb-2"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  className="border border-gray-300 shadow p-3 w-full rounded mb-2"
                />
              )}

              {/* erreurs par champ */}

                  {errors[field.name]?.length ? (
          <p className="text-red-500 text-sm mt-1">
            {errors[field.name]?.join(', ')}
          </p>
        ) : null}

            </div>
          ))}

          {/* erreur globale */}
          {globalError && (
            <p className="text-red-600 text-center mb-4">{globalError}</p>
          )}

          <button
            className="block w-full bg-indigo-500 text-white font-bold p-4 rounded-lg"
            type="submit"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  )
}



