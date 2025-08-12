"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserData, updateUserData, type User } from "@/app/lib/auth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Membership from "@/assets/images/membership.png";
import EditMembership from "./_components/edit_membership";
import { Icon } from "@iconify/react";

export default function MembershipPage() {
  const [user, setUser] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUser(getUserData());
  }, []);

  const isStudent = user?.type === "Student";
  const isGraduate = user?.type === "Graduate";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Membership</h1>
        </div>
        <div className="flex items-center gap-2">
          {user?.status === "Inactive" && (
            <Button variant="secondary">Renew Membership</Button>
          )}
          <EditMembership handleSetUser={setUser} user={user} />
        </div>
      </div>

      <div>
        <div className="w-full ">
          <div className=" group mb-6 overflow-hidden relative w-full h-[20rem] rounded-lg">
            <div className="absolute h-full w-full inset-0">
              <Image
                src={Membership}
                width={2000}
                height={2000}
                className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                alt="hero image"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
            </div>
            <div className="relative flex h-full flex-col justify-center items-center  p-6 text-white transition-transform duration-500 ease-in-out group-hover:-translate-y-2">
              <h3 className="text-4xl font-semibold !text-white mb-6">
                Membership
              </h3>
              <p className="text-white/80">
                Manage your membership information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 ">
        <Card>
          <CardHeader>
            <CardTitle>Membership Status</CardTitle>
            <CardDescription>
              Your current membership information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span
                  className={`text-sm font-medium ${
                    user?.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {user?.status}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="block text-sm text-gray-600">
                    Membership ID:
                  </span>
                </div>
                <div className=" flex items-center gap-2">
                  <span className="block truncate text-sm font-medium">
                    {user?.membership_id}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!user?.membership_id) return;
                      navigator.clipboard
                        .writeText(user.membership_id)
                        .then(() => {
                          setCopied(true);
                          window.setTimeout(() => setCopied(false), 1500);
                        });
                    }}
                    className="inline-flex items-center hover:bg-gray-50"
                    aria-label="Copy membership ID"
                    title="Copy"
                  >
                    <Icon
                      icon={copied ? "mdi:check" : "mdi:content-copy"}
                      className={`h-4 w-4 ${copied ? "text-green-600" : ""}`}
                    />
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Type:</span>
                <span className="text-sm font-medium">{user?.type}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic/Professional</CardTitle>
            <CardDescription>Membership details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isStudent && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">School:</span>
                  <span className="text-sm font-medium">{user?.school}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Programme:</span>
                  <span className="text-sm font-medium">{user?.programme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Study level:</span>
                  <span className="text-sm font-medium">
                    {user?.student_type}
                  </span>
                </div>
              </>
            )}
            {isGraduate && (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Programme:</span>
                  <span className="text-sm font-medium">{user?.programme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Completion year:
                  </span>
                  <span className="text-sm font-medium">
                    {user?.completion_year}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current role:</span>
                  <span className="text-sm font-medium">
                    {user?.current_role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Company:</span>
                  <span className="text-sm font-medium">{user?.company}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
