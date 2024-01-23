import { BackButton } from "@/components/common/back-button";
import { AddAdminForm } from "@/components/forms/AddAdminForm";
import React from "react";

const AddAdminPage = () => {
  return (
    <div>
      <div>
        <BackButton href="/admin" />
      </div>
      <div className="flex items-center justify-center">
        <AddAdminForm />
      </div>
    </div>
  );
};

export default AddAdminPage;
