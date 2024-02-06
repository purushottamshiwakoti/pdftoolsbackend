"use server"

import prismadb from "@/lib/db";
import { blogSchema, categoriesSchema } from "@/schemas";
import { Console } from "console";
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

export const addBlog=async(values: z.infer<typeof blogSchema>)=>{
    try {
        const validateSchema=blogSchema.safeParse(values);
        if(!validateSchema.success){
            return{
                error:"Invalid feilds"
            }
        }

        const {category_id,description,image,imageAlt,slug,title}=validateSchema.data;

        const blogExists=await prismadb.blog.findUnique({
            where:{
                slug
            }
        })

        if(blogExists){
            return {error:"Blog already exists with this slug"}
        }


        await prismadb.blog.create({
            data:{
               title,
               slug,
               description,
               image,
               imageAlt,
            category_id
            }
        });

        return {success:"Successfully created blog"}
        
    } catch (error) {
        return {error:"Something went wrong"};
        
    }
}


export const updateBlog=async(values: z.infer<typeof blogSchema>,id:string)=>{
    try {
        const validateSchema=blogSchema.safeParse(values);
        if(!validateSchema.success){
            return{
                error:"Invalid feilds"
            }
        }

       
        const findBlog=await prismadb.blog.findUnique({
            where:{
                id
            }
        })

        console.log(findBlog)

        if(!findBlog){
            return {error:"No blog found"}
        }


        await prismadb.blog.update({
            where:{
                id
            },
            data:{
             ...values
            }
        });

        return {success:"Successfully updated blog"}
        
    } catch (error) {
        return {error:"Something went wrong"};
        
    }
}


export const deleteBlog=async(id:string)=>{
    try {
      
        const findBlog=await prismadb.blog.findUnique({
            where:{
                id
            }
        })

        if(!findBlog){
            return {error:"No blog found"}
        }


        await prismadb.blog.delete({
            where:{
                id
            },
           
        });

        return {success:"Successfully deleted blog"}
        
    } catch (error) {
        console.log(error)
        return {error:"Something went wrong"};
        
    }
}
