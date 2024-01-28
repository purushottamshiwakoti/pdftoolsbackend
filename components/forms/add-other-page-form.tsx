"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { otherPageSchema } from "@/schemas";

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
import { Card, CardContent } from "../ui/card";

import EditorToolbar, { formats, modules } from "@/components/editor-toolbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useTransition } from "react";
import { updateOtherPage } from "@/actions/pages";
import { useRouter } from "next/navigation";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Textarea } from "../ui/textarea";

export const AddOtherPageForm = ({
  description,
  id,
  title,
  metaDescription,
  metaTitle,
}: {
  title: string | undefined | null;
  description: string | undefined | null;
  id: string | undefined | null;
  metaTitle: string | undefined | null;
  metaDescription: string | undefined | null;
}) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransistion] = useTransition();

  const form = useForm<z.infer<typeof otherPageSchema>>({
    resolver: zodResolver(otherPageSchema),
    defaultValues: {
      title: title,
      description: description,
      metaDescription: metaDescription,
      metaTitle: metaTitle,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof otherPageSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransistion(() => {
      setError("");
      setSuccess("");
      updateOtherPage(values, id as string).then((data) => {
        if (data?.success) {
          router.refresh();
          setSuccess(data.success);
        }
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  }

  return (
    <Card className="w-[50rem]">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-4"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter title here"
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
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <div>
                        <EditorToolbar />
                        <ReactQuill
                          theme="snow"
                          placeholder={"Write  description here..."}
                          modules={modules}
                          formats={formats}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter meta title here"
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
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter meta description here"
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
            </div>
          </form>
        </Form>
        <div className="mt-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
      </CardContent>
    </Card>
  );
};
