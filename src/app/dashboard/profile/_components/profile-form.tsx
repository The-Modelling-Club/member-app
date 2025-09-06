"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  media: {
    url: string;
  };
}

interface ProfileFormProps {
  initialData: ProfileData;
  onProfileUpdate?: (data: ProfileData) => void;
}

export function ProfileForm({
  initialData,
  onProfileUpdate,
}: Readonly<ProfileFormProps>) {
  const [formData, setFormData] = useState<ProfileData>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    onProfileUpdate?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            readOnly
            disabled
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="space-y-2 self-stretch w-full">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter your role"
            readOnly
            disabled
          />
        </div>
      </div>
      <Button type="submit" size={"sm"} className="mt-4 w-full">
        Save Changes
      </Button>
    </form>
  );
}
