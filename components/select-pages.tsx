"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
// import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const pages = [
  "merge-pdf",
  "compress-pdf",
  "rotate-pdf-pages",
  "remove-pdf-pages",
  "organize-pdf-pages",
  "grayscale-pdf",
  "extract-pdf-pages",
  "repair-pdf",
  "jpg-to-pdf",
  "png-to-pdf",
  "bmp-to-pdf",
  "tiff-to-pdf",
  "word-to-pdf",
  "pptx-to-pdf",
  "txt-to-pdf",
  "excel-to-pdf",
  "pdf-to-jpg",
  "pdf-to-png",
  "pdf-to-bmp",
  "pdf-to-tiff",
  "pdf-to-word",
  "pdf-to-pptx",
  "pdf-to-txt",
  "pdf-to-zip",
  "protect-pdf",
  "unlock-pdf",
];

export const SelectPages = ({ name }: { name: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const router = useRouter();

  return (
    <>
      {isClient && (
        <Select>
          <SelectTrigger className="w-[200px]">
            <div className="relative">
              <SelectValue />
            </div>
            <div className="absolute ">
              <Button variant={"link"}>{name}</Button>
            </div>
          </SelectTrigger>
          <SelectContent>
            {/* {pages.sort().map((item, index) => (
              <span className="flex flex-col space-y-2" key={index}> */}

            {/* </span>
            ))} */}
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {pages.sort().map((item, index) => (
                  <CommandItem key={item} value={item}>
                    <Button
                      key={index}
                      variant={name == item ? "default" : "outline"}
                      className="my-1"
                      asChild
                    >
                      <Link href={`/pages/${item}`}>{item}</Link>
                    </Button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </SelectContent>
        </Select>
      )}
    </>
  );
};
