"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "../ui/card";
import { companyImageSchema, stepSchema } from "@/schemas";

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
import { updateCompanyImages } from "@/actions/company";

interface AddCompanyImageFormProps {
  id: string;
  image: string | null;
  imageTwo: string | null;
  imageFour: string | null;
  imageThree: string | null;
  imageAlt: string | null;
  imageTwoAlt: string | null;
  imageThreeAlt: string | null;
  imageFourAlt: string | null;
}

export const AddCompanyImageForm = ({
  id,
  image,
  imageFour,
  imageThree,
  imageTwo,
  imageAlt,
  imageTwoAlt,
  imageThreeAlt,
  imageFourAlt,
}: AddCompanyImageFormProps) => {
  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof companyImageSchema>>({
    resolver: zodResolver(companyImageSchema),
    defaultValues: {
      image: image,
      imageTwo: imageTwo,
      imageFour: imageFour,
      imageThree: imageThree,
      imageFourAlt: imageFourAlt,
      imageThreeAlt: imageThreeAlt,
      imageTwoAlt: imageTwoAlt,
      imageAlt: imageAlt,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof companyImageSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      updateCompanyImages(values, id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-2"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-4">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image One</FormLabel>
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
                <div className="-ml-[15rem]">
                  <FormField
                    control={form.control}
                    name="imageAlt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image One Alt Text</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter image one alt text"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="imageTwo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Two</FormLabel>
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
                <div className="-ml-[15rem]">
                  <FormField
                    control={form.control}
                    name="imageTwoAlt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Two Alt Text</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter image two alt text"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="imageThree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Three</FormLabel>
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
                <div className="-ml-[15rem]">
                  <FormField
                    control={form.control}
                    name="imageThreeAlt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Three Alt Text</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter image three alt text"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="imageFour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Four</FormLabel>
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
                <div className="-ml-[15rem]">
                  <FormField
                    control={form.control}
                    name="imageFourAlt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Four Alt Text</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter image four alt text"
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
      </CardContent>
    </Card>
  );
};
