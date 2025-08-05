"use client";

import { cn } from "@/lib/utils";
import { useSignUpStore } from "@/lib/signup-store";
import { PersonalInfoStep } from "./signup-steps/personal-info-step";
import { AcademicStep } from "./signup-steps/academic-step";
import { SecurityStep } from "./signup-steps/security-step";
import { PaymentStep } from "./signup-steps/payment-step";
import Image from "next/image";

const steps = [
  { title: "Personal Info", component: PersonalInfoStep },
  { title: "Academic", component: AcademicStep },
  { title: "Security", component: SecurityStep },
  { title: "Payment", component: PaymentStep },
];

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { currentStep } = useSignUpStore();
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className={cn("flex flex-col w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center mb-6">
        <div className="w-16 mx-auto">
          <Image
            src={"/tmc_logo.webp"}
            alt="TMC Logo"
            width={50}
            height={50}
            className="object-cover w-fit mx-auto"
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 mb-3">
          Step {currentStep + 1} of {steps.length}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Step Titles */}
        <div className="flex justify-between text-xs text-gray-500">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 text-center ${
                index <= currentStep ? "text-primary font-medium" : ""
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <CurrentStepComponent />
      </div>

      <div className="flex mt-4 justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
