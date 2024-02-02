import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:any){
    try {
        const body=await req.json();
        const {views,blog_id}=body;
        await prismadb.views.create({
            data:{
               blog_id,
               views
            }
        })
       
        return NextResponse.json({success:"Successfully added views"},{status: 200});
        
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
        
    }
}