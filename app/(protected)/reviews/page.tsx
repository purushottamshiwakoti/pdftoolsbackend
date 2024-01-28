import { AddReviewForm } from "@/components/forms/add-review-form";
import { ReviewModal } from "@/components/modals/review-modal";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/db";
import React from "react";
import { columns } from "./column";
async function getData() {
  try {
    const data = await prismadb.reviews.findMany({});

    return data;
  } catch (error) {
    return null;
  }
}
const ReviewsPage = async () => {
  const data = await getData();
  return (
    <div>
      {data && data.length < 3 && (
        <div>
          <ReviewModal />
        </div>
      )}
      <div className="mt-3 mr-10">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
};

export default ReviewsPage;
