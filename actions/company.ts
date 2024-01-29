"use server"

import * as z from "zod"

import { companyImageSchema } from "@/schemas";
import prismadb from "@/lib/db";

export const updateCompanyImages=async(values: z.infer<typeof companyImageSchema>,id:string)=>{
    try {
                const companyImage=await prismadb.companyImages.findUnique({
                    where:{
                        id
                    }
                });

                if(!companyImage){
        return {error:"No company image found"};

                }

                await prismadb.companyImages.update({
                    where:{
                        id
                    },
                    data:{
                        ...values
                    }
                })
                return {success:"Successfully updated company images"}
        
    } catch (error) {
        return {error:"Something went wrong"};
        
    }

}