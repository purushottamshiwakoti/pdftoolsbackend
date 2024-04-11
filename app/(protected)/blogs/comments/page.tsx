import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/db";
import React from "react";
import { columns } from "./columns";

async function getData() {
  try {
    const data = await prismadb.comment.findMany({
      include: {
        blog: true,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

const BlogCommentPage = async () => {
  const comments = await getData();
  const data = comments?.map((item) => ({
    id: item.id,
    fullName: item.fullName,
    email: item.email,
    comment:
      item.comment.length < 50
        ? item.comment.substring(0, 50) + "..."
        : item.comment,
    blog: {
      title: item.blog.title,
    },
    isPublished: item.published,
  }));
  console.log(data);
  return (
    <div>
      {data ? (
        <div className="pr-10">
          <DataTable columns={columns} data={data} />
        </div>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default BlogCommentPage;
