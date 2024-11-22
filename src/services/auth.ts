import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "../lib/db";
import { z } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";

const options: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error("Utilisateur non trouve.");
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin", // Remplace par ton chemin personnalisé si nécessaire
  },
  callbacks: {
    async session({session, token}){
      session.user.id = token.id as string
      session.user.email = token.email as string
      return session
    },
    async jwt ({token, user}){
      if(user){
        token.id = user.id
        token.email = user.email
      }

      return token
    }
  },
  
};
export const { handlers, signIn, signOut, auth } = NextAuth(options);
