import { AddButton } from "@/components/common/add-button";
import React from "react";

const AllBlogsPage = () => {
  return (
    <div>
      <AddButton name="Add Blog" href="/blogs/all-blogs-add" />
    </div>
  );
};

export default AllBlogsPage;
