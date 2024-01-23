"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Check, Pen, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteFeatures, updateFeatures } from "@/actions/pages";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FearuresProps {
  Features:
    | {
        id: string;
        page_id: string;
        icon: string;
        title: string;
        description: string;
        updated_at: Date;
      }[]
    | null;
}

export const Features = ({ Features }: FearuresProps) => {
  const router = useRouter();

  const [editableId, setEditableId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const [isPending, startTransistion] = useTransition();

  const handleUpdateFeatures = (id: string) => {
    startTransistion(() => {
      updateFeatures(id, title, description, icon).then((data) => {
        if (data?.success) {
          setEditableId("");
          setTitle("");
          setDescription("");
          setIcon("");
          router.refresh();
          toast.success(data.success);
        }
        if (data?.error) {
          setEditableId("");
          setTitle("");
          router.refresh();
          toast.error(data.error);
        }
      });
    });
  };

  const handleDeleteFeature = (id: string) => {
    startTransistion(() => {
      deleteFeatures(id).then((data) => {
        if (data?.success) {
          setEditableId("");
          setTitle("");
          setDescription("");
          setIcon("");
          router.refresh();
          toast.success(data.success);
        }
        if (data?.error) {
          setEditableId("");
          setTitle("");
          router.refresh();
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <>
      <div className="mt-10  ml-[20rem] mb-40">
        <Card className="w-[45rem]">
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Feature Added</AccordionTrigger>
                {Features?.length ? (
                  Features.map((item) => (
                    <>
                      <AccordionContent key={item.id}>
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <div className="flex items-center justify-between w-full mr-3">
                                <h2>{item.title}</h2>
                                <div className=" space-x-3">
                                  {editableId === item.id ? (
                                    <Button
                                      size={"icon"}
                                      variant={"success"}
                                      onClick={(e) => {
                                        e.preventDefault(),
                                          handleUpdateFeatures(item.id);
                                      }}
                                      disabled={isPending}
                                    >
                                      <Check className="w-4 h-4 " />
                                    </Button>
                                  ) : (
                                    <Button
                                      size={"icon"}
                                      variant={"success"}
                                      onClick={(e) => {
                                        e.preventDefault(),
                                          setEditableId(item.id),
                                          setTitle(item.title),
                                          setDescription(item.description),
                                          setIcon(item.icon);
                                      }}
                                      disabled={isPending}
                                    >
                                      <Pen className="w-4 h-4 " />
                                    </Button>
                                  )}

                                  <Button
                                    size={"icon"}
                                    className=""
                                    variant={"destructive"}
                                    disabled={isPending}
                                    onClick={(e) => {
                                      e.preventDefault(),
                                        handleDeleteFeature(item.id);
                                    }}
                                  >
                                    <XCircle className="w-4 h-4 " />
                                  </Button>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                <div className="space-y-2">
                                  <h2>Title</h2>
                                  <Input
                                    value={
                                      editableId === item.id
                                        ? title
                                        : item.title
                                    }
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={editableId !== item.id}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <h2>Description</h2>
                                  <Textarea
                                    value={
                                      editableId === item.id
                                        ? description
                                        : item.description
                                    }
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                    disabled={editableId !== item.id}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <h2>Icon</h2>
                                  <Input
                                    value={
                                      editableId === item.id ? icon : item.icon
                                    }
                                    disabled={editableId !== item.id}
                                    onChange={(e) => setIcon(e.target.value)}
                                  />
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </AccordionContent>
                      <Separator />
                    </>
                  ))
                ) : (
                  <p>No features added yet!</p>
                )}
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
