"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "../ui/card";
import { stepSchema } from "@/schemas";

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

export const AddStepForm = ({ id }: { id: string | undefined }) => {
  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof stepSchema>>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      title: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof stepSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      addStep(values, id as string).then((data) => {
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Step Title</FormLabel>
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
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
