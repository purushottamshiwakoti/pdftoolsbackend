import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function  GET(req: any,params:any){
    try {
        const {slug}=params.params
        console.log({slug});
        const page=await prismadb.pages.findUnique({
            where:{
                slug
            },
            include:{
                Features:true,
                Steps:true,
            }
        })
        
        if(!page) {
            return NextResponse.json({error:"Page not found"},{status:404})
        }
        return NextResponse.json({message:"Successfully fetched page",page},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:error},{status:500})
    }

}