import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col w-full gap-6", className)} {...props}>
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
        <h1 className="text-2xl text-black font-bold">Login to your account</h1>
        <p className="text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid mt-6 gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            className="!bg-white"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="membership-id">Membership ID</Label>
          <Input
            id="membership-id"
            type="text"
            placeholder=""
            className="!bg-white"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" className="!bg-white" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
