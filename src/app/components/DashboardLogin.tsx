"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) return (
  
  <Link
        href={"/login"}
        className="py-2 px-3 bg-indigo-500 text-white hover:bg-white  hover:text-indigo-500 rounded transition duration-300"
        >
      SignUp
        </Link>
        
  )

  return (
    
      <p className="text-sm font-bold">Bienvenue {session.user?.name || session.user?.email}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="py-2 px-3 bg-green-400 hover:bg-green-300 text-green-900 hover:text-green-800 rounded transition duration-300"
      >
        Déconnexion
      </button>
  </p>
  )
}

