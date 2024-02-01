import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:any,params:any){
    try {
        const slug=params.params.slug;
        const data=await prismadb.blog.findUnique({
            where:{
                slug
            }
        })

        if(!data){
        return NextResponse.json({error:"No blog found"},{status:404})
            
        }
        return NextResponse.json({data},{status: 200});
        
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
        
    }
}