"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "../ui/card";
import { settingsSchema, stepSchema } from "@/schemas";
import { CldUploadButton } from "next-cloudinary";

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
import { addStep, updatesettings } from "@/actions/pages";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { ImageUpload } from "../image-upload";

export const AddSettingsForm = ({
  page_id,
  Settings,
}: {
  page_id: string | null | undefined;
  Settings?: any[];
}) => {
  const settingsArray = Settings ?? [];
  console.log(settingsArray[0]);

  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      title: settingsArray[0]?.title,
      description: settingsArray[0]?.description,
      image: settingsArray[0]?.image,
      imageAlt: settingsArray[0]?.imageAlt,
      button: settingsArray[0]?.button,
      buttonHref: settingsArray[0]?.buttonHref,
      buttonTwo: settingsArray[0]?.buttonTwo,
      buttonTwoHref: settingsArray[0]?.buttonTwoHref,
      tasksTitle: settingsArray[0]?.tasksTitle,
      tasksDescription: settingsArray[0]?.tasksDescription,
      tasksSubTitle: settingsArray[0]?.tasksSubTitle,
      tasksSubDescription: settingsArray[0]?.tasksSubDescription,
      tasksButton: settingsArray[0]?.tasksButton,
      tasksButtonHref: settingsArray[0]?.tasksButtonHref,
      tasksImage: settingsArray[0]?.tasksImage,
      tasksImageAlt: settingsArray[0]?.tasksImageAlt,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof settingsSchema>) {
    // Do something with the form values.
    startTransisition(() => {
      updatesettings(values, null, settingsArray[0].id).then((data) => {
        if (data?.success) {
          router.refresh();
          toast.success(data.success);
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
      <h2 className="p-2">Other settings </h2>
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
                    <FormLabel>Hero Title</FormLabel>
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
                    <FormLabel>Hero Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description here"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 space-x-2 ">
                <FormField
                  control={form.control}
                  name="button"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button 1 </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter button 1 name here"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="buttonHref"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button 1 Href </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter button 1 href here"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 space-x-2 ">
                <FormField
                  control={form.control}
                  name="buttonTwo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button 2 </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter button 2 name here"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="buttonTwoHref"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button 2 Href </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter button 2 href here"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Image </FormLabel>
                    <FormDescription>
                      Please add image of size 700*400px
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
                    <FormLabel>Image Alt Text</FormLabel>
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
              <FormField
                control={form.control}
                name="tasksTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Title</FormLabel>
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
                name="tasksDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description here"
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
                name="tasksSubTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Title</FormLabel>
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
                name="tasksSubDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description here"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 space-x-2 ">
                <FormField
                  control={form.control}
                  name="tasksButton"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter button name here"
                          {...field}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tasksButtonHref"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button Href </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter button href here"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tasksImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Image </FormLabel>
                    <FormDescription>
                      Please add image of size 700*400px
                    </FormDescription>
                    <FormControl>
                      {/* <Input
                        // placeholder="Enter button 2 href here"
                        type="file"
                        {...field}
                        disabled={isPending}
                      /> */}
                      <div>
                        <ImageUpload
                          onChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tasksImageAlt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Image Alt Text</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter banner image alt text here"
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
