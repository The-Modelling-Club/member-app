"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";
import formatError from "@/utils/error";

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
import { pubAxios } from "@/lib/api";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsSubmitting(true);
    try {
      await pubAxios.post("/auth/forgot-password", {
        email: data.email,
      });

      setIsEmailSent(true);
      toast.success("Password reset email sent successfully!");
    } catch (error) {
      toast.error(formatError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isEmailSent) {
    return (
      <div className={cn("flex flex-col w-full", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-16 mx-auto">
            <Image
              src={"/tmc_logo.webp"}
              alt="Image"
              width={50}
              height={50}
              className="object-cover w-fit mx-auto"
            />
          </div>
          <h1 className="text-2xl text-black font-bold">Check your email</h1>
          <p className="text-sm text-balance">
            We've sent a password reset link to your email address.
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <Button
            onClick={() => setIsEmailSent(false)}
            variant="outline"
            className="w-full"
          >
            Try again
          </Button>
        </div>

        <div className="text-center text-sm mt-6">
          Remember your password?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="w-16 mx-auto">
          <Image
            src={"/tmc_logo.webp"}
            alt="Image"
            width={50}
            height={50}
            className="object-cover w-fit mx-auto"
          />
        </div>
        <h1 className="text-2xl text-black font-bold">Forgot your password?</h1>
        <p className="text-sm text-balance">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    className="!bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm mt-6">
        Remember your password?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Back to login
        </Link>
      </div>
    </div>
  );
}
