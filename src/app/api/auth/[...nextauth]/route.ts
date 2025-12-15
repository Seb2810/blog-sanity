import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

import bcrypt from "bcrypt"
import { client } from "@/sanity/client"

export const authOptions: NextAuthOptions = {
  providers: [
    // 🔐 Login classique (email/password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        // Récupérer l'utilisateur depuis Sanity
        const user = await client.fetch(
          `*[_type == "clientSubmission" && data.email == $email][0]`,
          { email: credentials.email }
        )
        if (!user) return null

        // Comparer le mot de passe hashé
        const isValid = await bcrypt.compare(credentials.password, user.data.password)
        if (!isValid) return null

        return { 
          id: user._id, 
          email: user.data.email, 
          name: `${user.data.name} ${user.data.surname}` 
        }
      },
    }),

    // 🌐 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🐙 GitHub Login
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      // Si c’est un provider social (Google/GitHub) ➝ vérifier ou créer l’utilisateur
      if (account?.provider === "google" || account?.provider === "github") {
        const existing = await client.fetch(
          `*[_type == "clientSubmission" && data.email == $email][0]`,
          { email: user.email }
        )

        if (!existing) {
          // Créer un utilisateur dans Sanity
          await client.create({
            _type: "clientSubmission",
            formId: `social-${account.provider}`,
            data: {
              name: user.name || "",
              surname: "",
              email: user.email!,
              birthdate: null,
              password: ""
            },
            submittedAt: new Date().toISOString()
          })
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
    if (token) {
    session.user = {
      ...session.user,   // conserve name, email, image
      id: token.id as string
    }
      }
      return session
    },
  },
  pages: {
    signIn: "/login", // page de connexion custom
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }