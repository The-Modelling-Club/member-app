import BackgroundBoxes from "../_components/background-boxes";
import { ForgotPasswordForm } from "../_components/forgot-password-form";
import LoginImage from "@/assets/images/login_image.png";
import Image from "next/image";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-[21rem] md:w-[25rem]">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <Image
          src={LoginImage}
          alt="Image"
          className="absolute h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
