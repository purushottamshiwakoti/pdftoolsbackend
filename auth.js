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
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser) return false;
      // if(existingUser.twoFactorEnabled) return false;

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.fullName = token.fullName;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
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
