"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { deleteUser, register, updateUser } from "@/actions/user";
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
import { registerSchema, updateUserSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FormError } from "../form-error";
import { Card, CardContent } from "../ui/card";

export const EditAdminForm = ({
  fullName,
  email,
  password,
  id,
}: {
  fullName: string | undefined;
  email: string;
  password: string;
  id: string;
}) => {
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: fullName,
      email: email,
      // password: password,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof updateUserSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    startTransistion(() => {
      setError("");
      updateUser(values, id).then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          toast.success(data.success);
          router.push("/admin");
          router.refresh();
        }
      });
    });
  }

  function handleDelete() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    startTransistion(() => {
      setError("");
      deleteUser(id).then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          toast.success(data.success);
          router.push("/admin");
          router.refresh();
        }
      });
    });
  }

  return (
    <Card className="w-[40rem] mt-10">
      <CardContent>
        <div className="mt-2 flex items-end justify-end w-full">
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-2"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter full name here"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email here"
                        {...field}
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password here"
                        {...field}
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </form>
          <div>
            <FormError message={error} />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
