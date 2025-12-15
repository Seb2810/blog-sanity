/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { PortableText } from "next-sanity";

export interface SignIn {
  _type: "formClient";
  _key?: string;
  title: string;
  fields: SignInData[];
  submitLabel?: string;
  successMessage?: string;
  formKey?: string;
}

export interface SignInData {
  label: string;
  name: string;
  type: "text" | "date" | "password" | "email";
  required?: boolean;
}

export default function FormClientComponent({
  data,
  imgPage,
  body,
  showBody = false,
  successMessage,
  formKey,
}: {
  data: SignIn;
  imgPage?: string | undefined;
  body?: any | undefined;
  showBody?: boolean;
  successMessage: string;
  formKey: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget; // capture avant async
    const formData = new FormData(formEl);
    const dataToSend: Record<string, string> = {};

    formData.forEach((value, key) => {
      dataToSend[key] = value.toString();
    });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: formKey || "unknown-form",
          data: dataToSend,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur réseau");
      }

      alert(successMessage || "Formulaire envoyé !");
      formEl.reset(); // <-- on reset bien le formulaire ici
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’envoi du formulaire");
    }
  };

  // ✅ le rendu conditionnel doit être ici, pas dans handleSubmit
  if (submitted) {
    return (
      <div className="p-4 bg-green-100 text-green-800 rounded-xl">
        {data.successMessage}
      </div>
    );
  }

  return (
    <div className="mt-6 mb-15 mx-auto  rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      {/*imgPage && <img src={imgPage} alt="" width={800} height={600} />*/}

      {/*showBody && body && <PortableText value={body} />*/}

      <form onSubmit={handleSubmit} className="space-y-4 p-4  rounded-xl">

        <div className="text-xl text-center text-indigo-500 font-bold">{data.title}</div>



        {data.fields?.map((field, i) => (
          <div key={i} className="flex flex-col">
            <label className="font-medium mb-1 text-indigo-500">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          {data.submitLabel || "Envoyer"}
        </button>
      </form>
    </div>
  );
}

