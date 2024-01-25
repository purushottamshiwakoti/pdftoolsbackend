"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { featuresSchema, stepSchema } from "@/schemas";
import { Card, CardContent } from "../ui/card";

import { addFeatures, addStep } from "@/actions/pages";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { icons } from "@/lib/icons";

export const AddFeaturesForm = ({ id }: { id: string | undefined }) => {
  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof featuresSchema>>({
    resolver: zodResolver(featuresSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof featuresSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      addFeatures(values, id as string).then((data) => {
        if (data?.success) {
          router.refresh();
          form.reset();
          toast.success(data.success);
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Features Title</FormLabel>
                  <FormControl>
                    <Input
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Features Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter features description here"
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
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Step Icon</FormLabel>
                  <FormControl>
                    {/* <Input
                      placeholder="Enter step icon here"
                      {...field}
                      disabled={isPending}
                    /> */}

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {icons.map((item) => (
                          <SelectItem value={item.name} key={item.name}>
                            <div className="flex items-center space-x-1">
                              <span className="mr-2" color="blue">
                                {<item.icon />}
                              </span>
                              {item.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
