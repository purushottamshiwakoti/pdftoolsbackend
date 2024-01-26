import prismadb from "./db";

export const getPageBySlug=async(slug:string)=>{
    try {
        const page=await prismadb.pages.findUnique({
            where:{
                slug
            }
        });
        return page
    } catch (error) {
        return null;
    }

}

export const getOtherPageById=async(id:string)=>{
    console.log(id)
    try {
        const page=await prismadb.otherPages.findUnique({
            where:{
                id
            }
        });
        return page
    } catch (error) {
        return null;
    }

}