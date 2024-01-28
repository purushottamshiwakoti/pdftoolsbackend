"use client";

import React, { useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardWrapper } from "../card-wrapper";
import { Card, CardContent } from "../ui/card";
import { Check, Delete, Pen, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateStep, deleteStep } from "@/actions/pages";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface StepsProps {
  Steps:
    | {
        id: string;
        page_id: string;
        title: string;
        updated_at: Date;
      }[]
    | null;
}

export const Steps = ({ Steps }: StepsProps) => {
  const router = useRouter();
  const [editableId, setEditableId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [newTitle, setTitle] = useState("");
  const [oldTitle, setOldTitle] = useState("");
  const [isPending, startTransistion] = useTransition();

  const handleUpdateStep = () => {
    console.log(newTitle);
    console.log(oldTitle == newTitle);
    if (oldTitle == newTitle) {
      setEditableId("");
      setTitle("");
    } else {
      startTransistion(() => {
        updateStep(editableId, newTitle).then((data) => {
          if (data?.success) {
            setEditableId("");
            setTitle("");
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
    }
  };

  const handleDeleteStep = (id: string) => {
    const confirmation = confirm("Are you sure you want to delete this step");

    if (confirmation) {
      startTransistion(() => {
        deleteStep(id).then((data) => {
          if (data?.success) {
            setDeleteId("");
            router.refresh();
            toast.success(data.success);
          }
          if (data?.error) {
            setDeleteId("");
            router.refresh();
            toast.error(data.error);
          }
        });
      });
    }
  };

  return (
    <>
      <div className="mt-10 ml-[19rem]">
        <Card className="w-[40rem]">
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Steps Added</AccordionTrigger>
                {Steps?.length ? (
                  Steps.map(
                    ({
                      id,
                      page_id,
                      title,
                    }: {
                      id: string;
                      page_id: string;
                      title: string;
                      updated_at: Date;
                    }) => (
                      <div key={id}>
                        <AccordionContent className="flex justify-between w-full items-cen">
                          {editableId !== id ? (
                            <Textarea className="max-w-[30rem]" disabled>
                              {title}
                            </Textarea>
                          ) : (
                            <Textarea
                              value={newTitle}
                              onChange={(e) => setTitle(e.target.value)}
                              className="max-w-[30rem]"
                            />
                          )}

                          <div className="space-x-4">
                            {id === editableId ? (
                              <Button
                                size={"icon"}
                                className=""
                                variant={"success"}
                                onClick={handleUpdateStep}
                                disabled={isPending}
                              >
                                <Check className="w-4 h-4 " />
                              </Button>
                            ) : (
                              <Button
                                size={"icon"}
                                className=""
                                variant={"success"}
                                onClick={() => {
                                  setEditableId(id);
                                  setTitle(title);
                                  setOldTitle(title);
                                }}
                                disabled={isPending}
                              >
                                <Pen className="w-4 h-4 " />
                              </Button>
                            )}

                            <Button
                              size={"icon"}
                              variant={"destructive"}
                              disabled={isPending}
                              onClick={() => {
                                handleDeleteStep(id);
                              }}
                            >
                              <XCircle className="w-4 h-4 " />
                            </Button>
                          </div>
                        </AccordionContent>
                      </div>
                    )
                  )
                ) : (
                  <p>No steps added yet</p>
                )}
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
