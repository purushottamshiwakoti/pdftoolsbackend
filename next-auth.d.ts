import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

export type ExtendedUser=DefaultSession["user"]& {
  fullName: any;
  id: any;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser
}
}