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
import { addBlog, deleteBlog, updateBlog } from "@/actions/blog";

interface AddBlogFormProps {
  categories:
    | {
        id: string;
        name: string;
      }[]
    | null;
  title: string;
  description: string;
  image: string;
  slug: string;
  category_id: string;
  imageAlt: string;
  id: string;
}

export const EditBlogForm = ({
  categories,
  category_id,
  description,
  id,
  image,
  imageAlt,
  slug,
  title,
}: AddBlogFormProps) => {
  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: title,
      description: description,
      image: image,
      slug: slug,
      category_id: category_id,
      imageAlt: imageAlt,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof blogSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      updateBlog(values, id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.push("/blogs/all-blogs");
          router.refresh();
          form.reset();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  }

  const onDelete = () => {
    startTransisition(() => {
      deleteBlog(id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.push("/blogs/all-blogs");
          router.refresh();
          form.reset();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <div className="pr-10">
      <Card className=" mt-10 ">
        <CardContent>
          <div className="flex justify-end p-2">
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
