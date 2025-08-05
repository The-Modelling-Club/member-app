"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUpStore } from "@/lib/signup-store";
import { securitySchema } from "@/lib/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function SecurityStep() {
  const { formData, updateFormData, prevStep, nextStep, isSubmitting } =
    useSignUpStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const stepForm = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      password: formData.password,
      confirm_password: formData.confirm_password,
    },
  });

  const onSubmit: SubmitHandler<{
    password: string;
    confirm_password: string;
  }> = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form
      onSubmit={stepForm.handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-6"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-black font-bold">Create Password</h1>
        <p className="text-sm text-balance">
          Choose a strong password for your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="!bg-white pr-10"
              {...stepForm.register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {stepForm.formState.errors.password && (
            <p className="text-sm text-red-500">
              {stepForm.formState.errors.password.message}
            </p>
          )}
          <p className="text-xs text-gray-500">
            Password must be at least 8 characters long with uppercase,
            lowercase, number, and special character
          </p>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirm_password">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="!bg-white pr-10"
              {...stepForm.register("confirm_password")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {stepForm.formState.errors.confirm_password && (
            <p className="text-sm text-red-500">
              {stepForm.formState.errors.confirm_password.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={prevStep}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
