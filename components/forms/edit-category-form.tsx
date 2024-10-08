"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "../ui/card";
import { categoriesSchema, stepSchema } from "@/schemas";

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
import { addCategory, deleteCategory, updateCategory } from "@/actions/blog";

export const EditCategoryForm = ({
  name,
  id,
}: {
  name: string;
  id: string;
}) => {
  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof categoriesSchema>>({
    resolver: zodResolver(categoriesSchema),
    defaultValues: {
      name: name,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof categoriesSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      updateCategory(values, id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.push("/blogs/categories");
          router.refresh();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  }

  const onDelete = () => {
    const confirmation = confirm(
      "Are you sure you want to delete this category? Deleting this category will also delete comments and blogs related to this category"
    );
    if (confirmation) {
      startTransisition(() => {
        deleteCategory(id).then((data) => {
          if (data?.success) {
            toast.success(data.success);
            router.refresh();
            router.push("/blogs/categories");
            form.reset();
          }
          if (data?.error) {
            toast.error(data.error);
          }
        });
      });
    }
  };
  return (
    <Card className=" mt-10 w-[30rem]">
      <CardContent>
        <div className="p-2 flex justify-end">
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category title here"
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
