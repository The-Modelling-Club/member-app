"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUpStore } from "@/lib/signup-store";
import { personalInfoSchema } from "@/lib/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function PersonalInfoStep() {
  const { formData, updateFormData, nextStep } = useSignUpStore();

  const stepForm = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
    },
  });

  const onSubmit = (data: {
    first_name: string;
    last_name: string;
    email: string;
  }) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form
      onSubmit={stepForm.handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-6"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-black font-bold">Personal Information</h1>
        <p className="text-sm text-balance">
          Let's start with your basic information
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            type="text"
            placeholder="Enter your first name"
            className="!bg-white"
            {...stepForm.register("first_name")}
          />
          {stepForm.formState.errors.first_name && (
            <p className="text-sm text-red-500">
              {stepForm.formState.errors.first_name.message}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            type="text"
            placeholder="Enter your last name"
            className="!bg-white"
            {...stepForm.register("last_name")}
          />
          {stepForm.formState.errors.last_name && (
            <p className="text-sm text-red-500">
              {stepForm.formState.errors.last_name.message}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            className="!bg-white"
            {...stepForm.register("email")}
          />
          {stepForm.formState.errors.email && (
            <p className="text-sm text-red-500">
              {stepForm.formState.errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Next
        </Button>
      </div>
    </form>
  );
}
