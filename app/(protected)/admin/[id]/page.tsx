import { BackButton } from "@/components/common/back-button";
import { AddAdminForm } from "@/components/forms/AddAdminForm";
import { EditAdminForm } from "@/components/forms/EditAdminForm";
import prismadb from "@/lib/db";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

async function getUser(id: string): Promise<User> {
  const data = await prismadb.user.findUnique({
    where: {
      id,
    },
  });

  return data as User;
}

const AddAdminPage = async ({ params }: { params: any }) => {
  const data = await getUser(params.id);
  if (!data) redirect("/admin");
  return (
    <div>
      <div>
        <BackButton href="/admin" />
      </div>
      <div className="flex items-center justify-center">
        {data && (
          <EditAdminForm
            fullName={data.fullName}
            email={data.email}
            password={data.password}
            id={params.id}
          />
        )}
      </div>
    </div>
  );
};

export default AddAdminPage;
