import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";

export const AddButton = ({ name, href }: { name: string; href: string }) => {
  return (
    <>
      <Button variant={"outline"} asChild>
        <Link href={href} className=" flex">
          <PlusCircledIcon className="w-4 h-4 mr-1" />
          {name}
        </Link>
      </Button>
    </>
  );
};
