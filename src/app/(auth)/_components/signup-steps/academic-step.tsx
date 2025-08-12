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

type AcademicStepFormValues = {
  type: "Graduate" | "Student";
  programme: string;
  // Student-only
  student_type?: "Undergraduate" | "Postgraduate";
  school?: string;
  level?: string;
  // Graduate-only
  completion_year?: string;
  current_role?: string;
  company?: string;
};

export function AcademicStep() {
  const { formData, updateFormData, nextStep, prevStep } = useSignUpStore();

  const stepForm = useForm<AcademicStepFormValues>({
    resolver: zodResolver(academicSchema),
    defaultValues: {
      type: formData.type,
      programme: formData.programme,
      // Student defaults
      student_type: formData.student_type,
      school: formData.school,
      level: formData.level,
      // Graduate defaults
      completion_year: formData.completion_year,
      current_role: formData.current_role,
      company: formData.company,
    },
  });

  const onSubmit: SubmitHandler<AcademicStepFormValues> = (data) => {
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

        {stepForm.watch("type") === "Student" && (
          <>
            <div className="grid gap-3">
              <Label htmlFor="student_type">Study Level</Label>
              <Select
                value={stepForm.watch("student_type")}
                onValueChange={(value) =>
                  stepForm.setValue(
                    "student_type",
                    value as "Undergraduate" | "Postgraduate"
                  )
                }
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select study level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                </SelectContent>
              </Select>
              {stepForm.formState.errors.student_type && (
                <p className="text-sm text-red-500">
                  {stepForm.formState.errors.student_type.message as string}
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
                  {stepForm.formState.errors.school.message as string}
                </p>
              )}
            </div>

            {stepForm.watch("student_type") === "Postgraduate" ? (
              <div className="grid gap-3">
                <Label htmlFor="level">Level of Study</Label>
                <Select
                  value={stepForm.watch("level")}
                  onValueChange={(value) => stepForm.setValue("level", value)}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select level (PhD or Masters)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PhD">PhD</SelectItem>
                    <SelectItem value="Masters">Masters</SelectItem>
                  </SelectContent>
                </Select>
                {stepForm.formState.errors.level && (
                  <p className="text-sm text-red-500">
                    {stepForm.formState.errors.level.message as string}
                  </p>
                )}
              </div>
            ) : (
              <div className="grid gap-3">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  type="text"
                  placeholder="Enter your level of study (e.g. 100)"
                  className="!bg-white"
                  {...stepForm.register("level")}
                />
                {stepForm.formState.errors.level && (
                  <p className="text-sm text-red-500">
                    {stepForm.formState.errors.level.message as string}
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {stepForm.watch("type") === "Graduate" && (
          <>
            <div className="grid gap-3">
              <Label htmlFor="school">Alma mater</Label>
              <Input
                id="school"
                type="text"
                placeholder="Enter your alma mater"
                className="!bg-white"
                {...stepForm.register("school")}
              />
              {stepForm.formState.errors.school && (
                <p className="text-sm text-red-500">
                  {stepForm.formState.errors.school.message as string}
                </p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="current_role">Current Role</Label>
              <Input
                id="current_role"
                type="text"
                placeholder="e.g. Process Systems Engineer"
                className="!bg-white"
                {...stepForm.register("current_role")}
              />
              {stepForm.formState.errors.current_role && (
                <p className="text-sm text-red-500">
                  {stepForm.formState.errors.current_role.message as string}
                </p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                type="text"
                placeholder="e.g. Acme Corporation"
                className="!bg-white"
                {...stepForm.register("company")}
              />
              {stepForm.formState.errors.company && (
                <p className="text-sm text-red-500">
                  {stepForm.formState.errors.company.message as string}
                </p>
              )}
            </div>
          </>
        )}

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
