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