import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:any){
    try {
        const body=await req.body;
        const {fullName,email,comment,id}=body;
        await prismadb.comment.create({
            data:{
                fullName,
                email,
                comment,
                blog_id:id
            }
        })
       
        return NextResponse.json({success:"Successfully added comment"},{status: 200});
        
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
        
    }
}