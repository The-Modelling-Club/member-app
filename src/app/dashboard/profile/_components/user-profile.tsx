"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./profile-form";
import { AvatarUpload } from "./avatar-upload";
import { PasswordForm } from "./password-form";
import { getUserData } from "@/app/lib/auth";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("general");
  const [profileData, setProfileData] = useState({
    firstName: " ",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    media: {
      url: "",
    },
  });
  const [avatar, setAvatar] = useState<string | null>(null);

  const user = getUserData();
  const handleProfileUpdate = (data: typeof profileData) => {
    setProfileData(data);
  };

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar || "");
  };

  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        firstName: user.first_name || prev.firstName,
        lastName: user.last_name || prev.lastName,
        email: user.email || prev.email,
        role: user.role || prev.role,
      }));
    }
  }, []);

  return (
    <div className="">
      <Tabs
        defaultValue="general"
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList className="mb-8 grid w-full grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
            <Card className="shadow-none lg:col-span-4">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm
                  initialData={profileData}
                  onProfileUpdate={handleProfileUpdate}
                />
              </CardContent>
            </Card>

            <Card className="shadow-none lg:col-span-2">
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>Update your profile picture.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <AvatarUpload
                  currentAvatar={avatar as string}
                  userName={`${profileData.firstName} ${profileData.lastName}`}
                  onAvatarChange={handleAvatarChange}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
