"use server"

import prismadb from "@/lib/db";
export const updateCommentStatus=async(id:string,value:boolean)=>{
    try {
      

        const commentExists=await prismadb.comment.findUnique({
            where:{
                id
            }
        });
        if(!commentExists){
            return {error:"No comment exists"};
        }
        await prismadb.comment.update({
            where:{
                id
            },
            data:{
                published:{
                    set:value
                }
            }
        })
        return {success:"Successfully updated comment"}
        
    } catch (error) {
        return {error:"Something went wrong"};
        
    }
}