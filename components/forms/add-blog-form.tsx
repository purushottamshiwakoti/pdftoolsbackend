"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "../ui/card";
import { blogSchema, stepSchema } from "@/schemas";

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
import { ImageUpload } from "../image-upload";

import EditorToolbar, { formats, modules } from "@/components/editor-toolbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addBlog } from "@/actions/blog";
import { Textarea } from "../ui/textarea";

interface AddBlogFormProps {
  categories:
    | {
        id: string;
        name: string;
      }[]
    | null;
}

export const AddBlogForm = ({ categories }: AddBlogFormProps) => {
  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      slug: "",
      category_id: "",
      imageAlt: "",
      metaTitle: "",
      metaDescription: "",
      ogDescription: "",
      ogImage: "",
      ogImageAlt: "",
      ogTitle: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof blogSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      addBlog(values).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.push("/blogs/all-blogs");
          router.refresh();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  }
  return (
    <div>
      <Card className=" mt-10 ">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-2"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter blog title here"
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
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter blog slug here"
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
                      <FormLabel>Blog Description</FormLabel>
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
                <div className="grid grid-cols-4">
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blog Image</FormLabel>
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
                  </div>
                  <div className="-ml-[10rem]">
                    <FormField
                      control={form.control}
                      name="imageAlt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image alt text</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter image alt text here"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category for your blog" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((item) => (
                            <SelectItem value={item.id} key={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

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
                          placeholder="Enter meta desription here"
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
                <div className="grid grid-cols-4">
                  <div className="col-span-3">
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
                  <div className="-ml-[15rem]">
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
              </div>
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
