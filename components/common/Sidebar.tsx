"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { adminNavLinks } from "@/lib/nav";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="p-4 bg-[#FAFBFD] shadow-xl  h-full   z-50 w-[250px] overflow-y-auto fixed   ">
      <div>
        <Link
          href="/admin/dashboard"
          className="font-semibold tracking-tight text-xl text-primary text-center mt-2"
        >
          Admin Dashboard
        </Link>
        <div className="mt-6">
          <Separator />
        </div>
        <div className="mt-7 space-y-4  ">
          {adminNavLinks.map((item) => {
            return !item.hasChildren ? (
              <div>
                <Button
                  className="w-full flex items-start justify-start"
                  key={item.name}
                  variant={pathname.includes(item.href) ? "default" : "link"}
                  asChild
                >
                  <Link href={item.href} className="text-end">
                    <item.icon className="w-5 h-5 mr-2 " />
                    {item.name}
                  </Link>
                </Button>
                <Separator />
              </div>
            ) : (
              <div>
                {/* <Button
                  className="w-full flex items-start justify-start"
                  key={item.name}
                  variant={"default"}
                >
                  <div className="flex items-center justify-between w-full">
                    {item.name}
                    <ChevronDown />
                    <ChevronUp />
                  </div>
                </Button> */}

                <Accordion type="single" collapsible key={item.name}>
                  <AccordionItem value="item-1">
                    <Button
                      className="w-full flex items-start justify-start"
                      key={item.name}
                      variant={"link"}
                      asChild
                    >
                      <AccordionTrigger>
                        <div className="flex">
                          <item.icon className="w-5 h-5 mr-2 " />
                          <h2>{item.name}</h2>
                        </div>
                      </AccordionTrigger>
                    </Button>
                    <AccordionContent>
                      <div className="">
                        <div className="">
                          {item.searchable ? (
                            <Command>
                              <CommandInput
                                placeholder={`Search ${item.name}...`}
                              />
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading={item.name}>
                                  {item.children?.map((child, index) => (
                                    <Button
                                      variant={
                                        pathname.includes(child)
                                          ? "default"
                                          : "outline"
                                      }
                                      className="w-full mb-2 flex items-start justify-start"
                                      asChild
                                      key={index}
                                    >
                                      <CommandItem>
                                        <Link href={item.href + `/${child}`}>
                                          {child}
                                        </Link>
                                      </CommandItem>
                                    </Button>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          ) : (
                            item.children &&
                            item.children.map((child, index) => (
                              <Button
                                variant={
                                  pathname.includes(child)
                                    ? "default"
                                    : "outline"
                                }
                                className="w-full mb-2 flex items-start justify-start"
                                asChild
                                key={index}
                              >
                                <Link href={item.href + `/${child}`}>
                                  {child}
                                </Link>
                              </Button>
                            ))
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
