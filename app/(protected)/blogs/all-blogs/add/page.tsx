import { AddButton } from "@/components/common/add-button";
import { BackButton } from "@/components/common/back-button";
import { AddBlogForm } from "@/components/forms/add-blog-form";
import prismadb from "@/lib/db";
import React from "react";

async function getData() {
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

const AddBlogsPage = async () => {
  const categories = await getData();
  return (
    <div>
      <BackButton href="/blogs/all-blogs" />
      <div>
        <AddBlogForm categories={categories} />
      </div>
    </div>
  );
};

export default AddBlogsPage;
