import { BackButton } from "@/components/common/back-button";
import { EditCategoryForm } from "@/components/forms/edit-category-form";
import prismadb from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

async function getData(id: string) {
  try {
    const data = await prismadb.categories.findUnique({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}
const EditCategoryPage = async ({ params }: { params: any }) => {
  const data = await getData(params.id);
  if (!data) {
    redirect("/categories");
  }
  return (
    <>
      <div>
        <BackButton href="/categories" />
        <div className="mt-3">
          <EditCategoryForm id={data.id} name={data.name} />
        </div>
      </div>
    </>
  );
};

export default EditCategoryPage;
