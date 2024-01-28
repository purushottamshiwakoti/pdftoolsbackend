import { AddButton } from "@/components/common/add-button";
import { AddChooseUsForm } from "@/components/forms/add-choose-us-form";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/db";
import React from "react";
import { columns } from "./column";

async function getData() {
  try {
    const data = await prismadb.chooseUs.findMany({});

    return data;
  } catch (error) {
    return null;
  }
}

const ChooseUsPage = async () => {
  const data = await getData();
  return (
    <>
      <div>
        {data && data?.length <= 5 && (
          <AddButton href="/choose-us/add" name="Add ChooseUs" />
        )}
      </div>
      <div className="mt-3 mr-10">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
};

export default ChooseUsPage;
