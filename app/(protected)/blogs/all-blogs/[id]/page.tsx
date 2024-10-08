import { BackButton } from "@/components/common/back-button";
import { EditBlogForm } from "@/components/forms/edit-blog-form";
import prismadb from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

async function getCategory() {
  try {
    const data = await prismadb.categories.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}
async function getBlog(id: string) {
  try {
    const data = await prismadb.blog.findUnique({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

const EditBlogPage = async ({ params }: { params: any }) => {
  const categories = await getCategory();
  const blog = await getBlog(params.id);
  if (!blog) {
    redirect("/blogs/all-blogs");
  }
  return (
    <div>
      <div>
        <BackButton href="/blogs/all-blogs" />
      </div>
      <div className="mt-2">
        <EditBlogForm
          categories={categories}
          category_id={blog.category_id}
          description={blog.description}
          id={blog.id}
          image={blog.image}
          imageAlt={blog.imageAlt}
          slug={blog.slug}
          title={blog.title}
          metaDescription={
            blog.metaDescription ? blog.metaDescription : undefined
          }
          metaTitle={blog.metaTitle ? blog.metaTitle : undefined}
          ogDescription={blog.ogDescription ? blog.ogDescription : undefined}
          ogImage={blog.ogImage ? blog.ogImage : undefined}
          ogImageAlt={blog.imageAlt ? blog.imageAlt : undefined}
          ogTitle={blog.ogTitle ? blog.ogTitle : undefined}
          bannerImage={blog.bannerImage ? blog.bannerImage : undefined}
          bannerImageAlt={blog.bannerImageAlt ? blog.bannerImageAlt : undefined}
        />
      </div>
    </div>
  );
};

export default EditBlogPage;
