import prismadb from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const data=await prismadb.blog.findMany({
            include:{
                category:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return NextResponse.json({data},{status: 200});
        
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
        
    }
}