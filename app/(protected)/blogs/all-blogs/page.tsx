import { AddButton } from "@/components/common/add-button";
import { AddBlogForm } from "@/components/forms/add-blog-form";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/db";
import React from "react";
import { columns } from "./column";

async function getData() {
  try {
    const data = await prismadb.blog.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

const AllBlogsPage = async () => {
  const blogs = await getData();
  const data = blogs?.map((item) => ({
    id: item.id,
    title:
      item.title.length > 100
        ? item.title.substring(0, 100) + "..."
        : item.title,
    description:
      item.description.length > 100
        ? item.description.substring(0, 100) + "..."
        : item.description,
    slug:
      item.slug.length > 100 ? item.slug.substring(0, 100) + "..." : item.slug,
  }));
  return (
    <div>
      <AddButton name="Add Blog" href="/blogs/all-blogs/add" />
      <div className="mt-10 pr-10 ">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
};

export default AllBlogsPage;
