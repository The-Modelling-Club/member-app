"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import formatError from "@/utils/error";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { pubAxios } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      if (!email) {
        toast.error("Email not found");
        return;
      }

      const response = await pubAxios.post("/auth/verify-email", {
        email: decodeURIComponent(email),
        otp: data.otp,
      });
      if (response.data.paymentUrl) {
        toast.success("OTP verified successfully");
        router.push(response.data.paymentUrl);
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      toast.error(formatError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP className="" maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Submit"}
        </Button>
      </form>
      <div className="flex flex-col items-center mt-3 gap-2 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href={`/login`} className="underline">
            Login
          </Link>
        </p>
      </div>
    </Form>
  );
}
