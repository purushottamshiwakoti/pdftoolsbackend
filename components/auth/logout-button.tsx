"use client";

import { logout } from "@/actions/user";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { DialogClose } from "@radix-ui/react-dialog";
import { PopoverClose } from "@radix-ui/react-popover";

export const LogoutButton = ({ name }: { name: string }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="mr-10">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="capitalize">{name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                onClick={handleLogout}
                variant={"outline"}
                className="w-full"
              >
                Logout
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button asChild variant={"outline"} className="w-full">
                <Link href={"/admin/change-password"}>Change Password</Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
