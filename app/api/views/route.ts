import prismadb from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'


export async function POST(req:any){
    try {
        const body=await req.json();
        const {blog_id}=body;
        const findBlog=await prismadb.views.findFirst({
            where:{
                blog_id
            }
        });

        if(!findBlog){
            await prismadb.views.create({
                data:{
                    blog_id,
                    views:1
                }
            })
        }else{
            await prismadb.views.update({
                where:{
                    id:findBlog.id
                },
                data:{
                    views:{increment:1}
                }
            })
        }
       
        return NextResponse.json({success:"Successfully added views"},{status: 200});
        
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
        
    }
}