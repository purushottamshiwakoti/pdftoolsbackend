import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth-config";
import { getUserById } from "./lib/user";
import prismadb from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost:true,
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      const existingUser = await getUserById(user.id as string);
      if (!existingUser) return false;
      // if(existingUser.twoFactorEnabled) return false;

      return true;
    },
    async session({ session,  }) {
   
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub as string);
      if (!existingUser) return null;
      token.fullName = existingUser.fullName;
      token.email = existingUser.email;
      token.id = existingUser.id;

      return token;
    },
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  ...authConfig,
});
