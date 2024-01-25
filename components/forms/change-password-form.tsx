"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  changePassword,
  deleteUser,
  register,
  updateUser,
} from "@/actions/user";
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
import {
  changePasswordSchema,
  registerSchema,
  updateUserSchema,
} from "@/schemas";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FormError } from "../form-error";
import { Card, CardContent } from "../ui/card";
import { GetCurrentUser } from "@/lib/getCurrentUser";
import { FormSuccess } from "../form-success";
import { Eye, EyeOffIcon } from "lucide-react";

export const ChangePasswordForm = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const session = GetCurrentUser();
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      // password: password,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    startTransistion(() => {
      setError("");
      changePassword(values, session?.email || "admin@gmail.com").then(
        (data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
            toast.success(data.success);
            router.push("/dashboard");
            form.reset();
            router.refresh();
          }
        }
      );
    });
  }

  return (
    <Card className="w-[40rem] mt-10">
      <CardContent>
        <div className="mt-2 flex items-end justify-end w-full"></div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-2"
          >
            <div className="space-y-4">
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
                            type={viewPassword ? "text" : "password"}
                            disabled={isPending}
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
              <div className="relative">
                <div>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter new password here"
                            {...field}
                            type={viewNewPassword ? "text" : "password"}
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className="absolute top-[2.5rem] right-1 cursor-pointer"
                  onClick={() => setViewNewPassword(!viewNewPassword)}
                >
                  {viewNewPassword ? <Eye /> : <EyeOffIcon />}
                </div>
              </div>
              <div className="relative">
                <div>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter confirm password here"
                            {...field}
                            type={viewConfirmPassword ? "text" : "password"}
                            disabled={isPending}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className="absolute top-[2.5rem] right-1 cursor-pointer"
                  onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                >
                  {viewConfirmPassword ? <Eye /> : <EyeOffIcon />}
                </div>
              </div>
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </form>
          <div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
