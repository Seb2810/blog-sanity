/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react"
import Link from "next/link";

export function CommentForm({ postId, onCommentAdded }: { postId: string, onCommentAdded: (c:any)=>void }){

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { data: session } = useSession()


/*<CommentForm postId={post._id} />*/
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
   
    setStatus("loading");
   
    try {
        const res = await fetch("/api/create-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, author, content }),
      });
  
      const saved = await res.json(); // on suppose que l'API renvoie le doc Sanity créé
        console.log('saved : ' , saved)

      onCommentAdded(saved);
      setStatus("success");
      setAuthor("");
      setContent("");
    } catch {
      setStatus("error");
    }
  };

  if (!session) return ( 
  
  <Link
        href={"/login"}
        className="py-2  text-red-700 font-semibold mt-4 mb-4"
        >
      Vous devez être Membre pour laisser un commentaire cliquez ici pour vous Logger
        </Link>
  )
  return (

    <div className="w-96 mb-10 mt-5 flex flex-col  rounded-lg bg-white p-8">
    <h2 className="title-font mb-1 text-lg font-medium text-indigo-500 font-bold">Commentaire</h2>
    <p className="mb-5 leading-relaxed text-gray-600">Si vous aimez cet article laissez un commentaire
    </p>
    <form onSubmit={handleSubmit} className="my-8">
   
        <div className="mb-4">
       <label className="text-sm leading-7 text-gray-600">Pseudo : </label>
      <input
        type="text"
        placeholder="Votre nom"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        required
        className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" 
      />
      </div>
      <div className="mb-4">
       <label className="text-sm leading-7 text-gray-600">Commentaire : </label>
      <textarea
        placeholder="Votre commentaire"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
      </div>
      <button type="submit" className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" disabled={status === "loading"}>
        Envoyer
      </button>
      {status === "success" && <p>Commentaire envoyé !</p>}
      {status === "error" && <p>Erreur lors de l envoi.</p>}
    </form>
    </div>
  );
}
