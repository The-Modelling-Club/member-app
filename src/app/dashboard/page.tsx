"use client";

import { getUserData } from "@/app/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { User } from "@/app/lib/auth";
import Image from "next/image";
import Welcome from "@/assets/images/welcome.png";
import AnalyticsGraph from "./_components/analytics_graphs";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Overview</h1>
      <div className={"grid gap-6 lg:grid-cols-[65%_auto]"}>
        <div className={"relative max-h-80 w-full !overflow-hidden"}>
          <section className="absolute bottom-0 z-10 p-6 text-white">
            <p className="mb-2 text-3xl font-semibold">
              Welcome {user?.last_name || "Admin"} 👋
            </p>
            <p className="text-white/80">
              This is your member dashboard. You can access your membership
              details, update your profile, and manage your account settings
              from here.
            </p>
          </section>
          <div className="absolute left-0 top-0 h-full w-full rounded-xl bg-gradient-to-tr from-black/90 via-black/70 to-black/10" />
          <Image
            src={Welcome}
            alt={"Welcome image"}
            className={"h-full w-full rounded-xl object-cover"}
            width={3000}
          />
        </div>
        <div className="space-y-6 h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>Your educational details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-col ">
                  <span className="text-sm text-gray-600">School:</span>
                  <span className="text-sm font-medium">{user.school}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Programme:</span>
                  <span className="text-sm font-medium">{user.programme}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <AnalyticsGraph />
    </div>
  );
}
