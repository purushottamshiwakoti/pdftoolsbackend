import { BackButton } from "@/components/common/back-button";
import { EditChooseUsForm } from "@/components/forms/edit-choose-us-form";
import prismadb from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

async function getData(id: string) {
  try {
    const data = await prismadb.chooseUs.findUnique({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

const EditChooseUsPage = async ({ params }: { params: any }) => {
  const data = await getData(params.id);
  if (!data) {
    redirect("/choose-us");
  }
  return (
    <>
      <div>
        <BackButton href="/choose-us" />
        <div className="mt-3">
          <EditChooseUsForm
            description={data.description}
            id={data.id}
            image={data.image}
            imageAlt={data.imageAlt}
            title={data.title}
          />
        </div>
      </div>
    </>
  );
};

export default EditChooseUsPage;
