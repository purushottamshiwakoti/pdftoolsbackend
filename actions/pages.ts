import { error } from 'console';
"use server"

import prismadb from "@/lib/db"
import { getOtherPageById, getPageBySlug } from "@/lib/pages"
import { featuresSchema, otherPageSchema, pageSchema, stepSchema } from "@/schemas"

import * as z from "zod"

export const updatePage=async(values: z.infer<typeof pageSchema>,slug:string)=>{
 

    try {
        const page=await getPageBySlug(slug)
        if(!page) return {error:"Page not found"}
        await prismadb.pages.update({
            where:{
                slug
            },
            data:{
                ...values
            }
        })

        return {success:"Page updated successfully"}
    } catch (error) {
        return({error:"SOmething went wrong"})
    }

}

export const addStep=async(values: z.infer<typeof stepSchema>,id:string)=>{
    try {
        const validateFeilds=stepSchema.safeParse(values);
        if(!validateFeilds.success) return {error:"Invalid feilds"};
        const {title} = validateFeilds.data;
      const step=  await prismadb.steps.create({
            data:{
                title,
                page_id:id,
            },
        });
        return {success:"Successfully added new step"}

    } catch (error) {
        console.log(error);
        return({error:"SOmething went wrong"})
        
    }

}

export const addFeatures=async(values: z.infer<typeof featuresSchema>,id:string)=>{
    try {
        const validateFeilds=featuresSchema.safeParse(values);
        if(!validateFeilds.success) return {error:"Invalid feilds"};
        const {title,description,icon} = validateFeilds.data;
      const step=  await prismadb.features.create({
            data:{
                title,
                description,
                icon,
                page_id:id,
            },
        });
        return {success:"Successfully added new step"}
        
    } catch (error) {
        console.log(error);
        return({error:"SOmething went wrong"})
        
    }

}

export const updateStep=async(id:string,title:string)=>{
    try {
        const step=await prismadb.steps.findUnique({
            where:{id}
        });
        if(!step) return {error:"No step found"}

        await prismadb.steps.update({
            where:{
                id
            },
            data:{
                title
            }
        });

        return {success:"Successfully updated step"}
        
    } catch (error) {
        return{error:"Something went wrong"}
    }
}

export const deleteStep=async(id:string)=>{
    try {
        const step=await prismadb.steps.findUnique({
            where:{id}
        });
        if(!step) return {error:"No step found"}

        await prismadb.steps.delete({
            where:{
                id
            }
        });
        return {success:"Successfully deleted step"}

        
    } catch (error) {
        return{error:"Something went wrong"}
        
    }

}

export const updateFeatures=async(id:string,title:string,description:string,icon:string)=>{
    try {
        const step=await prismadb.features.findUnique({
            where:{id}
        });
        if(!step) return {error:"No features found"}

        await prismadb.features.update({
            where:{
                id
            },
            data:{
                title,
                description,
                icon
            }
        });

        return {success:"Successfully updated features"}
        
    } catch (error) {
        return{error:"Something went wrong"}
    }
}



export const deleteFeatures=async(id:string)=>{
    try {
        const step=await prismadb.features.findUnique({
            where:{id}
        });
        if(!step) return {error:"No features found"}

        await prismadb.features.delete({
            where:{
                id
            }
        });
        return {success:"Successfully deleted features"}

        
    } catch (error) {
        return{error:"Something went wrong"}
        
    }

}


export const updateOtherPage=async(values: z.infer<typeof otherPageSchema>,id:string)=>{
 

    try {
        const page=await getOtherPageById(id)
        if(!page) return {error:"Page not found"}
        await prismadb.otherPages.update({
            where:{
                id
            },
            data:{
                ...values
            }
        })

        return {success:"Page updated successfully"}
    } catch (error) {
        return({error:"Something went wrong"})
    }

}

export const updatesettings=async(values: z.infer<typeof otherPageSchema>,page_id?:string|null|undefined,id?:string|null|undefined)=>{
 

    try {
       if(page_id){
        const page=await getOtherPageById(page_id)
        if(!page) return {error:"Page not found"}
        await prismadb.settings.create({
           
            data:{
                other_page_id:page_id,
                ...values,
            },
            
        })
       }

        return {success:"Page updated successfully"}
    } catch (error) {
        return({error:"Something went wrong"})
    }

}

