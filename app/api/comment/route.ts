import prismadb from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'


export async function POST(req:any){
    try {
        const body=await req.json();
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