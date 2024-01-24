"use client";

import { GetCurrentUser } from "@/lib/getCurrentUser";
import { PersonIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import { LogoutButton } from "../auth/logout-button";

export const Navbar = () => {
  const session = GetCurrentUser();
  const date = new Date();
  return (
    <>
      <div className=" p-2 bg-white fixed z-50 w-[80%] mt-1 shadow-md rounded-md mb-3 flex items-center justify-between">
        <h1 className="text-tight text-muted-foreground flex items-center ">
          <PersonIcon className="w-5 h-5 mr-1" />
          Welcome {session?.email}
        </h1>
        <Button
          variant={"secondary"}
          onClick={() => alert("😊 Have a good day!")}
        >
          {date.getUTCDate()}-{date.getMonth() + 1}-{date.getFullYear()}{" "}
        </Button>
        <LogoutButton />
      </div>
    </>
  );
};
