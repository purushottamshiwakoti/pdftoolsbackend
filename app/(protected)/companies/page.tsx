import { AddCompanyImageForm } from "@/components/forms/add-company-image-form";
import prismadb from "@/lib/db";
import React from "react";

async function getData() {
  try {
    const data = await prismadb.companyImages.findFirst({});

    return data;
  } catch (error) {
    return null;
  }
}

const CompaniesPage = async () => {
  const data = await getData();
  console.log(data);
  return (
    <>
      <div>
        {data && (
          <AddCompanyImageForm
            id={data.id}
            image={data.image}
            imageTwo={data.imageTwo}
            imageThree={data.imageThree}
            imageFour={data.imageFour}
          />
        )}
      </div>
    </>
  );
};

export default CompaniesPage;
