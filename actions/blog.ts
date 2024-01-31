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

export const updateCategory=async(values: z.infer<typeof categoriesSchema>,id:string)=>{
    try {
        const validateSchema=categoriesSchema.safeParse(values);
        if(!validateSchema.success){
            return{
                error:"Invalid feilds"
            }
        }

        const {name}=values;
        const slug=name.trim().toLowerCase().split(" ").join("-");

        const existingCategory=await prismadb.categories.findUnique({
            where:{
                id
            }
        });

        if(!existingCategory){
            return{error:"Could not find category"}
        }


        await prismadb.categories.update({
            where:{
id
            },
            data:{
                name:name,
                slug:slug
            }
        });

        return {success:"Successfully updated category"}
        
    } catch (error) {
        return {error:"Something went wrong"};
        
    }
}

export const deleteCategory=async(id:string)=>{
    try {
      

        const existingCategory=await prismadb.categories.findUnique({
            where:{
                id
            }
        });

        if(!existingCategory){
            return{error:"Could not find category"}
        }


        await prismadb.categories.delete({
            where:{
id
            }
        });

        return {success:"Successfully deleted category"}
        
    } catch (error) {
        return {error:"Something went wrong"};
        
    }
}