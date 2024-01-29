"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "../ui/card";
import { seoSettingsSchema, stepSchema } from "@/schemas";

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
import { updateSeo } from "@/actions/seo";

interface AddSeoSettingsFormProps {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  googleSiteVerificationCode: string | null;
  id: string;
}

export const AddSeoSettingsForm = ({
  id,
  googleSiteVerificationCode,
  ogDescription,
  ogImage,
  ogImageAlt,
  ogTitle,
}: AddSeoSettingsFormProps) => {
  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof seoSettingsSchema>>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues: {
      ogTitle: ogTitle,
      ogDescription: ogDescription,
      ogImage: ogImage,
      ogImageAlt: ogImageAlt,
      googleSiteVerificationCode: googleSiteVerificationCode,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof seoSettingsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      updateSeo(values, id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.refresh();
          form.reset();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
    console.log(values);
  }
  return (
    <Card className=" mt-10">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-2"
          >
            <div className="space-y-4">
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

              <FormField
                control={form.control}
                name="googleSiteVerificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Site Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add google site verification code here"
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
      </CardContent>
    </Card>
  );
};
