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
import { Card, CardContent } from "../ui/card";
import { Textarea } from "@/components/ui/textarea";
import { features, title } from "process";
import { useState, useTransition } from "react";
import { error } from "console";
import { updatePage } from "@/actions/pages";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("@/components/custom-editor");
  },
  { ssr: false }
);

interface PageFormProps {
  id: string | undefined;
  title: string | null | undefined;
  slug: string | undefined;
  shortDescription: string | undefined | null;
  stepDescription: string | undefined | null;
  longDescription: string | undefined | null;
  featuresTitle: string | undefined | null;
  longDescriptionTitle: string | undefined | null;
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
}: PageFormProps) => {
  const [ckEditorValue, setCkEditorValue] = useState("");
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
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof pageSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // startTransistion(() => {
    //   setError("");
    //   setSuccess("");
    //   updatePage(values, slug as string).then((data) => {
    //     if (data?.success) {
    //       router.refresh();
    //       setSuccess(data.success);
    //     }
    //     if (data?.error) {
    //       setError(data.error);
    //     }
    //   });
    // });

    const { longDescription } = values;

    console.log(ckEditorValue);
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
                        <FormLabel>Long Description Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter long description  title here"
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
                        <FormLabel>Long Description </FormLabel>
                        <FormControl>
                          {/* <Textarea
                            placeholder="Enter step description here"
                            {...field}
                            disabled={isPending}
                          /> */}
                          <CustomEditor
                            initialData={field.value}
                            {...field}
                            onChange={(data: any) => console.log(data)}
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
