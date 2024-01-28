import { BackButton } from "@/components/common/back-button";
import { AddChooseUsForm } from "@/components/forms/add-choose-us-form";
import React from "react";

const AddChooseUsPage = () => {
  return (
    <div>
      <BackButton href="/choose-us" />
      <div className="mt-3">
        <AddChooseUsForm />
      </div>
    </div>
  );
};

export default AddChooseUsPage;
