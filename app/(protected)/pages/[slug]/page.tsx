import { Features } from "@/components/common/features";
import { Steps } from "@/components/common/steps";
import { AddFeaturesForm } from "@/components/forms/add-features-form";
import { AddStepForm } from "@/components/forms/add-steps-form";
import { PageForm } from "@/components/forms/page-form";
import { FeaturesModal } from "@/components/modals/features-modal";
import { StepModal } from "@/components/modals/step-modal";
import { SelectPages } from "@/components/select-pages";
import prismadb from "@/lib/db";
import React from "react";

async function getData(slug: string) {
  try {
    const data = await prismadb.pages.findUnique({
      where: {
        slug,
      },
      include: {
        Features: true,
        Steps: true,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

const PagesPage = async ({ params }: { params: any }) => {
  const data = await getData(params.slug);
  return (
    <>
      <div className="flex items-center justify-between w-[90%] ">
        <SelectPages name={params.slug} />
        <StepModal id={data?.id} />
        <FeaturesModal id={data?.id} />
      </div>
      <div className="mt-5">
        <PageForm
          id={data?.id}
          longDescription={data?.longDescription}
          shortDescription={data?.shortDescription}
          stepDescription={data?.stepDescription}
          slug={data?.slug}
          title={data?.title}
        />
      </div>
      <div className=" w-full items-center justify-center">
        <Steps Steps={data && data.Steps} />
      </div>
      <div className=" w-full items-center justify-center">
        <Features Features={data && data?.Features} />
      </div>
    </>
  );
};

export default PagesPage;
