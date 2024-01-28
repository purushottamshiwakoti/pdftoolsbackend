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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { icons } from "@/lib/icons";

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
  const [oldTitle, setOldTitle] = useState("");
  const [description, setDescription] = useState("");
  const [oldDescription, setOldDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [oldIcon, setOldIcon] = useState("");

  const [isPending, startTransistion] = useTransition();

  const handleUpdateFeatures = (id: string) => {
    if (oldTitle == title && oldDescription == description && oldIcon == icon) {
      setEditableId("");
      setTitle("");
      setDescription("");
      setIcon("");
    } else {
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
    }
  };

  const handleDeleteFeature = (id: string) => {
    const confirmation = confirm(
      "Are you sure you want to delete this feature"
    );

    if (confirmation) {
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
    }
  };

  return (
    <>
      <div className="mt-10 ml-[19rem]">
        <Card className="w-[40rem]">
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
                                        setEditableId(item.id),
                                          setTitle(item.title),
                                          setOldTitle(item.title),
                                          setDescription(item.description),
                                          setOldDescription(item.description),
                                          setIcon(item.icon);
                                        setOldIcon(item.icon);
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
                                  {/* <Input
                                    value={
                                      editableId === item.id ? icon : item.icon
                                    }
                                    disabled={editableId !== item.id}
                                    onChange={(e) => setIcon(e.target.value)}
                                  /> */}
                                  <Select
                                    value={
                                      editableId === item.id ? icon : item.icon
                                    }
                                    disabled={editableId !== item.id}
                                    onValueChange={(value) => setIcon(value)}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select icon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {icons.map((item) => (
                                        <SelectItem
                                          value={item.name}
                                          key={item.name}
                                        >
                                          <div className="flex items-center space-x-1">
                                            <span className="mr-2" color="blue">
                                              {<item.icon />}
                                            </span>
                                            {item.name}
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
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
