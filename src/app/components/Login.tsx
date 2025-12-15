/* eslint-disable @next/next/no-img-element */
"use client"

import { signIn } from "next-auth/react"

export default function LoginPage() {
  
    const handleCredentialsLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/", // où rediriger après login
    })
  }

  return (

    <div className ="w-full h-screen flex flex-col items-center justify-center px-4">
  <div className="max-w-sm w-full text-gray-600 space-y-8">
      <form onSubmit={handleCredentialsLogin} >
        <h1 className="text-2xl text-center text-indigo-500 font-bold">Connexion</h1>
        <input name="email" type="email" placeholder="Email" className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
        <input name="password" type="password" placeholder="Mot de passe" className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
        <button type="submit"    className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Se connecter
        </button>
      </form>

   <div className="relative">
      <span className="block w-full h-px bg-gray-300"></span>
      <p
        className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto"
      >
        Or continue with
      </p>
    </div>
    <div className="space-y-4 text-sm font-medium"></div>
      <div className="space-y-2">

        <button     onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full  p-3 flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
            
<img
          src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
          alt="Google"
          className="w-5 h-5"
        />
           Continue with Google
</button>
        

     <button
  onClick={() => signIn("github", { callbackUrl: "/" })}
  className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
>
<img
          src="https://raw.githubusercontent.com/sidiDev/remote-assets/0d3b55a09c6bb8155ca19f43283dc6d88ff88bf5/github-icon.svg"
          alt="Github"
          className="w-5 h-5"
        />
          Continue with Github
</button>

      </div>
    </div>
       </div>
  )
}
