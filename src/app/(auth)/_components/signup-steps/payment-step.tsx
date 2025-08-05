"use client";

import { Button } from "@/components/ui/button";
import { useSignUpStore } from "@/lib/signup-store";
import { signUpSchema } from "@/lib/signup-schema";
import { pubAxios } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import formatError from "@/utils/error";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export function PaymentStep() {
  const { formData, prevStep, setIsSubmitting, isSubmitting } =
    useSignUpStore();
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const handleSubmit = async () => {
    setIsSubmittingForm(true);
    setIsSubmitting(true);

    try {
      const { confirm_password, ...validatedData } =
        signUpSchema.parse(formData);

      const res = await pubAxios.post("/auth/signup", validatedData);

      if (res.data.paymentUrl) {
        toast.success("Account already exists! Please proceed to payment.");
        router.push(res.data.paymentUrl);
        return;
      }

      if (res.data) {
        toast.success(
          "Account created successfully! Please check your email for verification."
        );
        router.push(
          `/verify-otp?email=${encodeURIComponent(validatedData.email)}`
        );
      }
    } catch (error) {
      toast.error(formatError(error));
    } finally {
      setIsSubmittingForm(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-black font-bold">Ready to Join?</h1>
        <p className="text-sm text-balance">
          You're almost there! Review your information and prepare for payment.
        </p>
      </div>
      {/* Payment Information Card */}
      <Card className="border-2 border-green-100 bg-green-50/50">
        <CardHeader className=" text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-800">
            <CreditCard className="h-5 w-5" />
            Membership Dues
          </CardTitle>
          <CardDescription>Annual membership fee for members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-900 mb-2">₵20.00</div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Access to exclusive member benefits</p>
              <p>• Professional development opportunities</p>
              <p>• Networking events and workshops</p>
              <p>• Resource library access</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 mt-0.5">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-sm text-yellow-800">
            <p className="font-medium">Payment Information</p>
            <p className="mt-1">
              After account creation, you'll be redirected to a secure payment
              page to complete your membership dues. Your account will be fully
              activated once payment is confirmed. Kindly make sure that you're
              ready to make payment before you proceed.{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={prevStep}
          disabled={isSubmittingForm}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1"
          disabled={isSubmittingForm}
        >
          {isSubmittingForm
            ? "Creating Account..."
            : "Create Account & Continue to Payment"}
        </Button>
      </div>
    </div>
  );
}
