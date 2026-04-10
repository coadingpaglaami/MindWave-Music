/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, AlertTriangle, Loader2 } from "lucide-react";
import { z } from "zod";
import {
  useAdminLogOutAllDevicesMutation,
  useAdminPasswordChangeMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
} from "@/api/auth";
import { toast } from "sonner";
import { AdminProfileUpdatePayload } from "@/typesorinterface/auth";
import { clearTokens } from "@/lib/cookies";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

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
    fullName: "",
    email: "",
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
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const {push} =useRouter()

  const {
    data: adminProfileData,
    isLoading,
    refetch,
  } = useGetAdminProfileQuery();
  const { mutateAsync: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateAdminProfileMutation();
  const { mutateAsync: changePassword, isPending: isPasswordChangePending } =
    useAdminPasswordChangeMutation();
  const {
    mutateAsync: logOutAllDevices,
  } = useAdminLogOutAllDevicesMutation();

  // Load profile data when component mounts or data is fetched
  useEffect(() => {
    if (adminProfileData?.data) {
      const profile = adminProfileData.data;
      setProfileData({
        fullName: profile.name,
        email: profile.email,
        photo: null,
        photoPreview: profile.avatar || null,
      });
    }
  }, [adminProfileData]);

  // Track initial profile data for change detection
  const initialProfileData = {
    fullName: adminProfileData?.data?.name || "",
    email: adminProfileData?.data?.email || "",
    photoPreview: adminProfileData?.data?.avatar || null,
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

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
        profileData.photo !== null,
    );
  };

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    setPasswordErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleProfileSave = async () => {
    try {
      // Validate with zod
      profileSchema.parse(profileData);
      setProfileErrors({});

      // Create FormData object for file upload
      const formData = new FormData();

      // Add text fields
      formData.append("name", profileData.fullName);
      formData.append("email", profileData.email);

      // Only append avatar if a new file was uploaded
      if (profileData.photo) {
        formData.append("avatar", profileData.photo);
      }

      // Call API with FormData
      const response = await updateProfile(
        formData as unknown as Partial<AdminProfileUpdatePayload>,
      );

      if (response?.success) {
        toast.success("Profile updated successfully!");
        setIsProfileChanged(false);
        setProfileData((prev) => ({ ...prev, photo: null })); // Clear the pending photo
        // Refetch profile data to get updated info
        await refetch();
      } else {
        toast.error(response?.message || "Failed to update profile");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setProfileErrors(errors);
      } else {
        // Handle API error response
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred while updating profile";
        toast.error(errorMessage);
        console.error("Profile update error:", error);
      }
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      // Validate with zod
      passwordSchema.parse(passwordData);
      setPasswordErrors({});

      // Prepare payload
      const payload = {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
        confirm_new_password: passwordData.confirmPassword,
      };

      // Call API
      const response = await changePassword(payload);

      if (response?.success) {
        toast.success("Password updated successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(response?.message || "Failed to update password");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setPasswordErrors(errors);
      } else {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred while updating password";
        toast.error(errorMessage);
        console.error("Password update error:", error);
      }
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      // Replace with your actual logout API call
      // await logOutAllDevices();
      setIsSignOutDialogOpen(false);
      logOutAllDevices();
      toast.success("Signed out of all devices successfully");
      push('/login');

      clearTokens();
      console.log("Signing out of all devices...");

      // Optional: Redirect to login page after sign out
      // router.push('/login');
    } catch (error) {
      toast.error("Failed to sign out of all devices");
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
  }

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
                    {profileData.fullName
                      ? profileData.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : "AU"}
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
              disabled={!isProfileChanged || isUpdateProfilePending}
              className="bg-orange-400 hover:bg-orange-500"
            >
              {isUpdateProfilePending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
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
              disabled={isPasswordChangePending}
              className="bg-orange-400 hover:bg-orange-500"
            >
              {isPasswordChangePending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
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
              <p className="font-medium">
                {adminProfileData?.data?.account_type || "Admin"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Login</p>
              <p className="font-medium">
                {adminProfileData?.data?.last_login
                  ? new Date(adminProfileData.data.last_login).toLocaleString()
                  : "Never"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Created</p>
              <p className="font-medium">
                {adminProfileData?.data?.created_at
                  ? new Date(
                      adminProfileData.data.created_at,
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
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
      <Dialog open={isSignOutDialogOpen} onOpenChange={setIsSignOutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign out of all devices?</DialogTitle>
            <DialogDescription>
              This action will sign you out from all active sessions across all
              devices. You will need to log in again on each device.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSignOutDialogOpen(false)}
              disabled={isSigningOut}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSigningOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing out...
                </>
              ) : (
                "Yes, Sign out"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
