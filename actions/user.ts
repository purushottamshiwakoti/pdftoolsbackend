"use server"
import * as z from "zod"
import { loginSchema, registerSchema } from "@/schemas"
import { getUserByEmail, getUserById } from "@/lib/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

import { signOut } from "@/auth"
import prismadb from "@/lib/db";

import bcrypt from "bcryptjs"


export const login=async(values: z.infer<typeof loginSchema>,callbackUrl?:string|null)=>{
const validateFeilds=loginSchema.safeParse(values);

if(!validateFeilds.success) return {error:"Invalid feilds"}

const {email,password}=validateFeilds.data;
const user=await getUserByEmail(email);
if(!user){
    return {error:"Invalid credentials"}
}

const comparePassword=await bcrypt.compare(password,user.password);

if(!comparePassword){
    return {error:"Invalid credentials"}

}

try {
    await signIn("credentials",{email,password,
    redirectTo: callbackUrl||DEFAULT_LOGIN_REDIRECT
    })
    
   } catch (error) {
    if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
                return {
                    error:"Invalid credentials!"
                }
                default:
                    return {
                        error:"Invalid credentials!"
                    }
            }
        }
        throw error
    }
   }



  

   export const logout=()=>{
    return signOut()

   }

   export const register=async(values: z.infer<typeof registerSchema>)=>{
    try {
        const validateFeilds=registerSchema.safeParse(values)
        if(!validateFeilds.success) return{error:"Invalid feilds"}

        const {fullName, email,password}=validateFeilds.data

        const existingUser=await getUserByEmail(email)

        if(existingUser) return {error:"User already exists"}

        const hashedPassword=await bcrypt.hash(password,10)

        await prismadb.user.create({
            data:{
                fullName,
                email,
                password:hashedPassword
            }
        })

        return {success:"Sucessfully created new admin"}


        
    } catch (error) {
        return {error:"Something went wrong"}
    }


   }


   export const deleteUser=async(id:string)=>{
    try {
        await prismadb.user.delete({
            where:{
                id
            }
        })
        return {success:"Successfully deleted admin"}
    } catch (error) {
        return {error:"Something went wrong"}
    }

   }

   export const updateUser=async(values: z.infer<typeof registerSchema>,id:string)=>{
   

    try {
        const validateFeilds=registerSchema.safeParse(values);
        if(!validateFeilds.success) return {error:"Invalid feilds"}
    
        const user=await getUserById(id);
        if(!user) return {error:"User doesnot exists"}
        await prismadb.user.update({
            where:{
                id
            },
            data:{
                ...values
            }
        })
        return {success:"Successfully updated admin"}
    } catch (error) {
        return {error:"Something went wrong"}
    }

   }