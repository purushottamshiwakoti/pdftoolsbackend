import { AddButton } from "@/components/common/add-button";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/db";
import React from "react";
import { columns } from "./columns";

async function getData() {
  try {
    const data = await prismadb.categories.findMany({});

    return data;
  } catch (error) {
    return null;
  }
}

const BlogCategoriesPage = async () => {
  const data = await getData();

  return (
    <div>
      <div>
        <AddButton name="Add Category" href="/blogs/categories/add" />
      </div>
      <div className="mt-3 mr-10">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
};

export default BlogCategoriesPage;
