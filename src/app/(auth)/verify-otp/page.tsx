import { InputOTPForm } from "../_components/verify-otp-form";
import Image from "next/image";

export default function VerifyOTPPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col w-full">
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

          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl text-black font-bold">Verify your email</h1>
            <p className="text-sm text-balance">
              Enter the one-time password sent to your email
            </p>
          </div>
          <div className=" mt-10 w-[21rem] mx-auto">
            <InputOTPForm />
          </div>
        </div>
      </div>
    </div>
  );
}
