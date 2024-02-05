"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "../ui/card";
import { chooseUsSchema, stepSchema } from "@/schemas";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { addStep } from "@/actions/pages";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { ImageUpload } from "../image-upload";
import {
  addChooseUs,
  deleteChooseUs,
  updateChooseUs,
} from "@/actions/choose-us";

interface EditChooseUsFormProps {
  title: string | undefined;
  description: string | undefined;
  image: string | undefined;
  imageAlt: string | undefined;
  id: string;
}

export const EditChooseUsForm = ({
  description,
  id,
  title,
  image,
  imageAlt,
}: EditChooseUsFormProps) => {
  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof chooseUsSchema>>({
    resolver: zodResolver(chooseUsSchema),
    defaultValues: {
      title: title,
      description: description,
      image: image,
      imageAlt: imageAlt,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof chooseUsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      updateChooseUs(values, id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.push("/choose-us");
          router.refresh();
          form.reset();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  }

  function onDelete() {
    const confirmation = confirm(
      "Are you sure you want to delete this choose us?"
    );
    if (!confirmation) return null;
    startTransisition(() => {
      deleteChooseUs(id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.push("/choose-us");
          router.refresh();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  }
  return (
    <Card className=" mt-10">
      <CardContent>
        <div className="p-2 flex items-end justify-end">
          <Button
            variant={"destructive"}
            disabled={isPending}
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter  title here"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Enter  description here"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormDescription>
                    Image size must be 200*200px
                  </FormDescription>
                  <FormControl>
                    <ImageUpload
                      onChange={field.onChange}
                      value={field.value}
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageAlt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image alt text</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter  image alt text here"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
