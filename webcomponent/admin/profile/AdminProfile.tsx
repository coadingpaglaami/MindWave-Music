"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, AlertTriangle } from "lucide-react";
import { z } from "zod";

// Zod schemas
const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  photo: z.any().optional(),
  photoPreview: z.string().nullable().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Types
interface ProfileData {
  fullName: string;
  email: string;
  photo: File | null;
  photoPreview: string | null;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export const AdminProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Admin User",
    email: "admin@aerobiwellness.com",
    photo: null,
    photoPreview: null,
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileErrors, setProfileErrors] = useState<FormErrors>({});
  const [passwordErrors, setPasswordErrors] = useState<FormErrors>({});
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  const initialProfileData = {
    fullName: "Admin User",
    email: "admin@aerobiwellness.com",
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result as string,
        }));
        setIsProfileChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    setProfileErrors((prev) => ({ ...prev, [field]: undefined }));
    setIsProfileChanged(
      value !== initialProfileData[field as keyof typeof initialProfileData] ||
        profileData.photo !== null
    );
  };

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    setPasswordErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleProfileSave = () => {
    try {
      profileSchema.parse(profileData);
      setProfileErrors({});
      console.log("Profile saved:", profileData);
      setIsProfileChanged(false);
      alert("Profile changes saved successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setProfileErrors(errors);
      }
    }
  };

  const handlePasswordUpdate = () => {
    try {
      passwordSchema.parse(passwordData);
      setPasswordErrors({});
      console.log("Password updated");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password updated successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setPasswordErrors(errors);
      }
    }
  };

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out of all devices?")) {
      console.log("Signing out of all devices...");
      alert("Signed out of all devices");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-2">
            <Label>Profile Photo</Label>
            <p className="text-sm text-gray-500">
              Upload a professional photo for your admin profile
            </p>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                {profileData.photoPreview ? (
                  <AvatarImage src={profileData.photoPreview} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-orange-400 text-white text-2xl">
                    AU
                  </AvatarFallback>
                )}
              </Avatar>
              <Label htmlFor="photo-upload">
                <div className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50">
                  <Upload className="h-4 w-4" />
                  <span>Upload Photo</span>
                </div>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </Label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) =>
                  handleProfileChange("fullName", e.target.value)
                }
                className={profileErrors.fullName ? "border-red-500" : ""}
              />
              {profileErrors.fullName && (
                <p className="text-sm text-red-500">{profileErrors.fullName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleProfileSave}
              disabled={!isProfileChanged}
              className="bg-orange-400 hover:bg-orange-500"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              className={passwordErrors.currentPassword ? "border-red-500" : ""}
            />
            {passwordErrors.currentPassword && (
              <p className="text-sm text-red-500">
                {passwordErrors.currentPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={passwordData.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              className={passwordErrors.newPassword ? "border-red-500" : ""}
            />
            {passwordErrors.newPassword && (
              <p className="text-sm text-red-500">
                {passwordErrors.newPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              className={passwordErrors.confirmPassword ? "border-red-500" : ""}
            />
            {passwordErrors.confirmPassword && (
              <p className="text-sm text-red-500">
                {passwordErrors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handlePasswordUpdate}
              className="bg-orange-300 hover:bg-orange-400 text-gray-700"
            >
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Type</p>
              <p className="font-medium">Super Admin</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Login</p>
              <p className="font-medium">December 4, 2024 at 9:32 AM</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Created</p>
              <p className="font-medium">January 1, 2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Session Status</p>
              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                Active
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            These actions are permanent and cannot be undone
          </p>
          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Sign Out of All Devices
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
