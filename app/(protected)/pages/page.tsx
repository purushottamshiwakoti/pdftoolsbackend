import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  redirect("/other-pages/home");
};

export default page;
