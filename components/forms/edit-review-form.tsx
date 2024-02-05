"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent } from "../ui/card";
import { reviewsSchema, stepSchema } from "@/schemas";

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
import { addReviews, deleteReview, updateReview } from "@/actions/review";

interface EditReviewFormProps {
  name: string;
  description: string;
  rating: string;
  role: string;
  id: string;
}

export const EditReviewForm = ({
  description,
  name,
  rating,
  role,
  id,
}: EditReviewFormProps) => {
  const router = useRouter();
  const [isPending, startTransisition] = useTransition();
  const form = useForm<z.infer<typeof reviewsSchema>>({
    resolver: zodResolver(reviewsSchema),
    defaultValues: {
      name: name,
      description: description,
      rating: rating,
      role: role,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof reviewsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      updateReview(values, id).then((data) => {
        if (data?.success) {
          toast.success(data.success);

          router.refresh();
          router.push("/reviews");

          form.reset();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  }

  function onDelete() {
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (!confirmation) return null;
    startTransisition(() => {
      deleteReview(id).then((data) => {
        if (data?.success) {
          router.refresh();
          toast.success(data.success);
          router.push("/reviews");
          router.refresh();

          form.reset();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  }
  return (
    <Card className=" mt-10">
      <div className="p-2 flex items-end justify-end">
        <Button variant={"destructive"} disabled={isPending} onClick={onDelete}>
          Delete
        </Button>
      </div>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name here"
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
                  <FormLabel>Review Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={7}
                      placeholder="Enter review description here"
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter role here"
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
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter rating here"
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
