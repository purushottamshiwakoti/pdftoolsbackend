import { BackButton } from "@/components/common/back-button";
import { EditReviewForm } from "@/components/forms/edit-review-form";
import prismadb from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

async function getData(id: string) {
  try {
    const data = await prismadb.reviews.findUnique({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

const EditReviewPage = async ({ params }: { params: any }) => {
  const data = await getData(params.id);
  if (!data) {
    redirect("/reviews");
  }

  return (
    <div>
      <BackButton href="/reviews" />
      <div className="mt-3">
        <EditReviewForm
          description={data.description}
          id={data.id}
          name={data.name}
          rating={data.rating}
          role={data.role}
        />
      </div>
    </div>
  );
};

export default EditReviewPage;
