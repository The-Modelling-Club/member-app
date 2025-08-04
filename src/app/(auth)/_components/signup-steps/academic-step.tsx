"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSignUpStore } from "@/lib/signup-store";
import { academicSchema } from "@/lib/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

export function AcademicStep() {
  const { formData, updateFormData, nextStep, prevStep } = useSignUpStore();

  const stepForm = useForm({
    resolver: zodResolver(academicSchema),
    defaultValues: {
      type: formData.type,
      school: formData.school,
      programme: formData.programme,
      level: formData.level,
    },
  });

  const onSubmit: SubmitHandler<{
    type: "Graduate" | "Student";
    school: string;
    programme: string;
    level: string;
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
        <h1 className="text-2xl text-black font-bold">Academic Information</h1>
        <p className="text-sm text-balance">
          Tell us about your academic background
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="type">Member Type</Label>
          <Select
            value={stepForm.watch("type")}
            onValueChange={(value) =>
              stepForm.setValue("type", value as "Graduate" | "Student")
            }
          >
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Select member type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
          {stepForm.formState.errors.type && (
            <p className="text-sm text-red-500">
              {stepForm.formState.errors.type.message}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="school">School/Institution</Label>
          <Input
            id="school"
            type="text"
            placeholder="Enter your school or institution"
            className="!bg-white"
            {...stepForm.register("school")}
          />
          {stepForm.formState.errors.school && (
            <p className="text-sm text-red-500">
              {stepForm.formState.errors.school.message}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="programme">Programme</Label>
          <Input
            id="programme"
            type="text"
            placeholder="e.g. Chemical Engineering"
            className="!bg-white"
            {...stepForm.register("programme")}
          />
          {stepForm.formState.errors.programme && (
            <p className="text-sm text-red-500">
              {stepForm.formState.errors.programme.message}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="level">Level</Label>
          <Input
            id="level"
            type="text"
            placeholder="Enter your level of study (e.g 100)"
            className="!bg-white"
            {...stepForm.register("level")}
          />
          {stepForm.formState.errors.level && (
            <p className="text-sm text-red-500">
              {stepForm.formState.errors.level.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
