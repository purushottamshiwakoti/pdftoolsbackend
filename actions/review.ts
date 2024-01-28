"use server"

import prismadb from "@/lib/db";
import { reviewsSchema } from "@/schemas"
import * as z from"zod"

export const addReviews=async(values: z.infer<typeof reviewsSchema>)=>{
    try {
       
        const validateSchema=reviewsSchema.safeParse(values);
        if(!validateSchema.success){
            return {error:"Fields not validated"}
        }

        await prismadb.reviews.create({
            data:{
                ...values
            }
        })
       

        return {success:"Successfully added review"}
        
    } catch (error) {
        return {error:"Somethin went wrong"};
    }

}

export const updateReview=async(values: z.infer<typeof reviewsSchema>,id:string)=>{
    try {
       
        const validateSchema=reviewsSchema.safeParse(values);
        if(!validateSchema.success){
            return {error:"Fields not validated"}
        }

        const findReview=await prismadb.reviews.findUnique({
            where:{
                id
            }
        })

        if(!findReview){
            return {error:"Review not found"}
        }
        await prismadb.reviews.update({
            where:{
                id
            },
            data:{
                ...values
            }
        })
       

        return {success:"Successfully updated review"}
        
    } catch (error) {
        return {error:"Somethin went wrong"};
    }

}

export const deleteReview=async(id:string)=>{
    try {
       
       

        const findReview=await prismadb.reviews.findUnique({
            where:{
                id
            }
        })

        if(!findReview){
            return {error:"Review not found"}
        }
        await prismadb.reviews.delete({
            where:{
                id
            },
           
        })
       

        return {success:"Successfully deleted review"}
        
    } catch (error) {
        return {error:"Somethin went wrong"};
    }

}
