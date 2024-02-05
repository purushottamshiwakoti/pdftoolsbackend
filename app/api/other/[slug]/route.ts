import prismadb from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'


export async function GET(req:any,params:any){
  try {
    const {slug}=params.params
    console.log(slug)
    const page=await prismadb.otherPages.findFirst({
      where:{
        name:slug
      },
      include:{
        Settings:true
      }
    });

    return NextResponse.json({page},{status:200})
  } catch (error) {
    return NextResponse.json({error:error},{status:500})
    
  }
}