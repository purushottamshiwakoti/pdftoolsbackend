
import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./schemas"
import { getUserByEmail } from "./lib/user";

import bcrypt from "bcryptjs"

export default {
  providers: [
    Credentials({
        async authorize(credentials){
            const validateFeilds=await loginSchema.safeParse(credentials);
            if(validateFeilds.success) {
                const {email,password}=validateFeilds.data;
                const user=await getUserByEmail(email);
                if(!user){
                    return null;
                }

                const matchPassword=bcrypt.compare(password, user.password);

                if(!matchPassword) return null;

                return user
            }

            return null;

        }
    })
],
} satisfies NextAuthConfig