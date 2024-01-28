"use server"

import * as z from "zod"

import { chooseUsSchema } from "@/schemas"
import prismadb from "@/lib/db"

export const addChooseUs=async(values: z.infer<typeof chooseUsSchema>)=>{
    try {
        const isValidated=chooseUsSchema.safeParse(values)
        if(!isValidated.success){
            return {error:"Please validate feilds"}
        }
        await prismadb.chooseUs.create({
            data:{
                ...values
            }
        });

        return {success:"Successfully created choose us"}
        
    } catch (error) {
        return {error:"Somethin went wrong"};
    }

}

export const updateChooseUs=async(values: z.infer<typeof chooseUsSchema>,id:string)=>{
    try {
        const isValidated=chooseUsSchema.safeParse(values)
        if(!isValidated.success){
            return {error:"Please validate feilds"}
        }

        const data=await prismadb.chooseUs.findUnique({
            where:{
                id
            }
        });
        if(!data){
            return {error:"Nothing found dude"}
        }
        await prismadb.chooseUs.update({
            where:{
                id
            },
            data:{
                ...values
            }
        });

        return {success:"Successfully updated choose us"}
        
    } catch (error) {
        return {error:"Somethin went wrong"};
    }

}

export const deleteChooseUs=async(id:string)=>{
    try {
       

        const data=await prismadb.chooseUs.findUnique({
            where:{
                id
            }
        });
        if(!data){
            return {error:"Nothing found dude"}
        }
        await prismadb.chooseUs.delete({
            where:{
                id
            },
           
        });

        return {success:"Successfully deleted choose us"}
        
    } catch (error) {
        return {error:"Somethin went wrong"};
    }

}