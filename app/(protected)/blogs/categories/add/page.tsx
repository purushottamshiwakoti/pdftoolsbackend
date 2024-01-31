import { BackButton } from "@/components/common/back-button";
import { AddCategoryForm } from "@/components/forms/add-category-form";
import React from "react";

const AddCategoriesPage = () => {
  return (
    <div>
      <div>
        <BackButton href="/blogs/categories" />
      </div>
      <div>
        <AddCategoryForm />
      </div>
    </div>
  );
};

export default AddCategoriesPage;
