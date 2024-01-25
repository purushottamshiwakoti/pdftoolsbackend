"use client";

import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { login } from "@/actions/user";
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
import { Eye, EyeOffIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { FormError } from "../form-error";

export const Login = () => {
  const [isPending, startTransistion] = useTransition();
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    startTransistion(() => {
      setError("");
      login(values, callbackUrl).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
      });
    });
  }
  return (
    <>
      <CardWrapper title="Login" description="Login to your account">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            method="post"
          >
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email here"
                        {...field}
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative">
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password here"
                            {...field}
                            disabled={isPending}
                            type={viewPassword ? "text" : "password"}
                            className="relative"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className="absolute top-[2.5rem] right-1 cursor-pointer"
                  onClick={() => setViewPassword(!viewPassword)}
                >
                  {viewPassword ? <Eye /> : <EyeOffIcon />}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isPending}
              >
                Submit
              </Button>
            </div>
          </form>
          <div className="mt-2">
            <FormError message={error} />
          </div>
        </Form>
      </CardWrapper>
    </>
  );
};
