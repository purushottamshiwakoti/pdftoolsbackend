import { DataCard } from "@/components/data-card";
import prismadb from "@/lib/db";
import React from "react";

const getData = async () => {
  try {
    const pages = prismadb.pages.aggregate({
      _count: true,
    });

    return pages;
  } catch (error) {
    return null;
  }
};

const DashboardPage = async () => {
  const data = await getData();
  return (
    <>
      <div className="grid grid-cols-3">
        <DataCard
          title="Total Added Pages"
          content={`The total number of added pages are ${data?._count}`}
        />
      </div>
    </>
  );
};

export default DashboardPage;
