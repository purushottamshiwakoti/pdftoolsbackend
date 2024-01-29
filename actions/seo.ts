"use server"
import prismadb from "@/lib/db";
import { seoSettingsSchema } from "@/schemas";
import * as z from "zod"

export const updateSeo=async(values: z.infer<typeof seoSettingsSchema>,id:string)=>{
    try {
        const validateFeilds=seoSettingsSchema.safeParse(values);
        if(!validateFeilds.success){
            return {error:"Invalid feilds"}
        }

        const seoSettings=await prismadb.seoSettings.findUnique({
            where:{
                id
            }
        });

        if(!seoSettings){
            return {error:"No settings found"}

        }

        await prismadb.seoSettings.update({
            where:{
id
            },
            data:{
                ...values
            }
        });

        return {success:"Successfully updated seo settings"}
        
    } catch (error) {
        return {error:"Something went wrong"};
        
    }

}