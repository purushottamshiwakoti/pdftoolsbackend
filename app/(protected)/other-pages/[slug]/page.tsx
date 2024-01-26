import { Features } from "@/components/common/features";
import { Steps } from "@/components/common/steps";
import { AddFeaturesForm } from "@/components/forms/add-features-form";
import { AddOtherPageForm } from "@/components/forms/add-other-page-form";
import { AddStepForm } from "@/components/forms/add-steps-form";
import { PageForm } from "@/components/forms/page-form";
import { FeaturesModal } from "@/components/modals/features-modal";
import { StepModal } from "@/components/modals/step-modal";
import { SelectOtherPages } from "@/components/select-other-page";
import { SelectPages } from "@/components/select-pages";
import prismadb from "@/lib/db";
import React from "react";

async function getData(slug: string) {
  try {
    const data = await prismadb.otherPages.findFirst({
      where: {
        name: slug,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

const OtherPage = async ({ params }: { params: any }) => {
  const data = await getData(params.slug);
  console.log(data);
  return (
    <>
      <div className="flex items-center justify-between w-[90%] ">
        <SelectOtherPages name={params.slug} />
      </div>
      <div className="mt-5 flex items-center justify-center w-full ">
        <AddOtherPageForm
          description={data?.description}
          title={data?.title}
          id={data?.id}
        />
      </div>
    </>
  );
};

export default OtherPage;
