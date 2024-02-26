import { NextRequest, NextResponse } from "next/server";

import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req:NextRequest){
    try {
     
        const data=await req.formData();
        console.log(data);
        const file:any=data.get('file');
        console.log(file);
        console.log(file.type.includes('video'));
        console.log(file.type.includes('audio'));
        console.log(file.type.includes('image'));
      
   

         const byteData=await file.arrayBuffer();
         const buffer=Buffer.from(byteData)
         const path=`./public/hello-topik/${file.name}`
    
        await  writeFile(path,buffer)


       

     

      return NextResponse.json({message:"Successfully created pet"},{status:200})

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error},{status:500})
    }

};

