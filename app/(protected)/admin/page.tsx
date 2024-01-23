import { AddButton } from "@/components/common/add-button";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import prismadb from "@/lib/db";

async function getData() {
  try {
    const data = await prismadb.user.findMany({
      select: {
        fullName: true,
        email: true,
        id: true,
      },
    });

    return data;
  } catch (error) {
    return [];
  }
}

const AdminPage = async () => {
  const data = await getData();
  return (
    <div>
      <div>
        <AddButton name="Add Admin" href="/admin/add" />
      </div>
      <div className="mt-3 mr-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminPage;
