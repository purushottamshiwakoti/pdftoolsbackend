"use server"

import prismadb from "@/lib/db";
import { categoriesSchema } from "@/schemas";
import * as z from "zod";


export const addCategory=async(values: z.infer<typeof categoriesSchema>)=>{
    try {
        const validateSchema=categoriesSchema.safeParse(values);
        if(!validateSchema.success){
            return{
                error:"Invalid feilds"
            }
        }

        const {name}=values;
        const slug=name.trim().toLowerCase().split(" ").join("-");


        await prismadb.categories.create({
            data:{
                name:name,
                slug:slug
            }
        });

        return {success:"Successfully created category"}
        
    } catch (error) {
        return {error:"Something went wrong"};
        
    }
}