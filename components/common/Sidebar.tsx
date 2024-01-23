"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

import { adminNavLinks } from "@/lib/nav";

export const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="p-4 bg-[#FAFBFD] shadow-md  rounded-md h-full  fixed z-50 w-[250px] overflow-y-auto">
      <div>
        <Link
          href="/admin/dashboard"
          className="font-semibold tracking-tight text-xl text-primary"
        >
          Admin Dashboard
        </Link>
        <div className="mt-7 space-y-4 ">
          {adminNavLinks.map((item) => {
            return (
              <>
                <Button
                  className="w-full"
                  key={item.name}
                  size={"lg"}
                  variant={pathname.includes(item.href) ? "default" : "link"}
                  asChild
                >
                  <Link href={item.href} className="text-end">
                    <item.icon className="w-5 h-5 mr-2 " />
                    {item.name}
                  </Link>
                </Button>
                <Separator />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
