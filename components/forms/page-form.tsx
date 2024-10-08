"use client";

import { pageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Card, CardContent } from "../ui/card";

import EditorToolbar, { formats, modules } from "@/components/editor-toolbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updatePage } from "@/actions/pages";
import { ImageUpload } from "../image-upload";

interface PageFormProps {
  id: string | undefined;
  title: string | null | undefined;
  slug: string | undefined;
  shortDescription: string | undefined | null;
  stepDescription: string | undefined | null;
  longDescription: string | undefined | null;
  featuresTitle: string | undefined | null;
  longDescriptionTitle: string | undefined | null;
  metaTitle: string | undefined | null;
  metaDescription: string | undefined | null;
  ogTitle: string | undefined | null;
  ogDescription: string | undefined | null;
  ogImage: string | undefined | null;
  ogImageAlt: string | undefined | null;
}

export const PageForm = ({
  id,
  longDescription,
  shortDescription,
  slug,
  stepDescription,
  title,
  featuresTitle,
  longDescriptionTitle,
  metaDescription,
  metaTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  ogTitle,
}: PageFormProps) => {
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof pageSchema>>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: title,
      shortDescription: shortDescription,
      longDescription: longDescription,
      stepDescription: stepDescription,
      featuresTitle: featuresTitle,
      longDescriptionTitle: longDescriptionTitle,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
      ogTitle: ogTitle,
      ogDescription: ogDescription,
      ogImage: ogImage,
      ogImageAlt: ogImageAlt,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof pageSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransistion(() => {
      setError("");
      setSuccess("");
      updatePage(values, slug as string).then((data) => {
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
    <>
      <div className="flex items-center justify-center w-full">
        <Card className="w-[40rem] ">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 p-3"
              >
                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    Save
                  </Button>
                </div>
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
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter short description here"
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
                    name="stepDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Step Title </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter step title here"
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
                    name="featuresTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Features Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter features title here"
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
                    name="longDescriptionTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Article Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter article title here"
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
                    name="longDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Article Description </FormLabel>
                        <FormControl>
                          {/* <Textarea
                            placeholder="Enter step description here"
                            {...field}
                            disabled={isPending}
                          /> */}
                          <div>
                            <EditorToolbar />
                            <ReactQuill
                              theme="snow"
                              placeholder={"Write article description here..."}
                              modules={modules}
                              formats={formats}
                              {...field}
                              readOnly={isPending}
                            />
                            {/* <ReactQuill
                              theme="snow"
                              value={field.value}
                              onChange={field.onChange}
                            /> */}
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
                  <FormField
                    control={form.control}
                    name="ogTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add Og Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter og title here"
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
                    name="ogDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add Og Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter og description here"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid ">
                    <div className="">
                      <FormField
                        control={form.control}
                        name="ogImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Add Og Image</FormLabel>
                            <FormDescription>
                              Image size must be 1200 X 630 pixels
                            </FormDescription>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isPending}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="">
                      <FormField
                        control={form.control}
                        name="ogImageAlt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OG Image Alt Text</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter og image  alt text"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isPending}>
                    Save
                  </Button>
                </div>
              </form>
            </Form>
            <div>
              <FormSuccess message={success} />
              <FormError message={error} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
