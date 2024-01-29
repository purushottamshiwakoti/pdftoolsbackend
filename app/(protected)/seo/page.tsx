import { AddSeoSettingsForm } from "@/components/forms/add-seo-settings-form";
import prismadb from "@/lib/db";
import React from "react";

async function getData() {
  try {
    const data = await prismadb.seoSettings.findFirst({});

    return data;
  } catch (error) {
    return null;
  }
}

const SeoSettingsPage = async () => {
  const data = await getData();
  return (
    <>
      <div>
        {data && (
          <AddSeoSettingsForm
            id={data.id}
            googleSiteVerificationCode={data.googleSiteVerificationCode}
            ogDescription={data.ogDescription}
            ogImage={data.ogImage}
            ogImageAlt={data.ogImageAlt}
            ogTitle={data.ogTitle}
          />
        )}
      </div>
    </>
  );
};

export default SeoSettingsPage;
