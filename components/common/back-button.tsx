import { ArrowLeftIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";

export const BackButton = ({ href }: { href: string }) => {
  return (
    <>
      <Button variant={"outline"} asChild>
        <Link href={href} className=" flex">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Go Back
        </Link>
      </Button>
    </>
  );
};
