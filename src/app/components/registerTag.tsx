"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function RegisterTag() {
  const { data: session } = useSession()

  if (!session) return ( 
  
  <Link
        href={"/register"}
        className="py-2 px-3 text-indigo-500 hover:bg-indigo-500  hover:text-white"
        >
      Register
        </Link>
  )
 


}

