import prismadb from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'


export async function GET(){
    try {
        const data=await prismadb.pages.findMany({

            select:{
                slug:true,
            }

        });
        return NextResponse.json({message:"hello world",data},{status: 200});
        
    } catch (error) {
        console.log(error);
    }
}