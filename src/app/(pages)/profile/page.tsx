/**
 * ProfilePage — allows the authenticated user to view and edit their own profile.
 *
 * Layout:
 *   - Top card: read-only user info (name, email, phone, roles, user ID)
 *   - Bottom card: editable form (first name, last name, middle name, phone, email)
 *
 * Uses useProfile hook for state management and save logic. The form tracks dirty
 * state so the Save button is disabled when no changes have been made.
 *
 * Safety:
 *   - Confirmation dialog appears before saving
 *   - Save button is disabled while the request is in-flight (prevents double-click)
 */
"use client";

import React, { useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  User,
  Shield,
  BadgeCheck,
  Save,
  Loader2,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  Camera,
} from "lucide-react";
import useProfile from "@/app/hooks/profile/use-profile";
import useChangePassword from "@/app/hooks/profile/use-change-password";
import { toast } from "@/hooks/use-toast";
import { TOAST_TITLES } from "@/app/constants/toast-titles.constant";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    middleName,
    setMiddleName,
    phone,
    setPhone,
    username,
    setUsername,
    isSaving,
    hasChanges,
    requestSave,
    handleSave,
    showConfirm,
    setShowConfirm,
    user,
  } = useProfile();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Avatar must be under 2MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploadingAvatar(true);
    setTimeout(() => {
      setIsUploadingAvatar(false);
      toast({
        title: TOAST_TITLES.SUCCESS,
        description: "Avatar updated. Backend upload endpoint integration pending.",
        variant: "success",
      });
    }, 1000);
  };

  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    isSaving: isPasswordSaving,
    hasChanges: hasPasswordChanges,
    requestSave: requestPasswordSave,
    handleSave: handlePasswordSave,
    showConfirm: showPasswordConfirm,
    setShowConfirm: setShowPasswordConfirm,
  } = useChangePassword();

  return (
    <FadeIn delay={100} direction="up">
      <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
        {/* Profile header card — read-only summary */}
        <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="relative w-16 h-16 group cursor-pointer"
              onClick={handleAvatarClick}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-primary" />
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
              {isUploadingAvatar && (
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {user?.fullName || "User"}
              </h1>
              <p className="text-sm text-muted-foreground">{user?.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            <InfoRow
              icon={<Mail className="w-4 h-4" />}
              label="Email"
              value={user?.username}
            />
            <InfoRow
              icon={<Phone className="w-4 h-4" />}
              label="Phone"
              value={user?.phone || "Not set"}
            />
            <InfoRow
              icon={<Shield className="w-4 h-4" />}
              label="Role"
              value={
                user?.roles?.map((r) => r.name).join(", ") || "No role"
              }
            />
            <InfoRow
              icon={<BadgeCheck className="w-4 h-4" />}
              label="User ID"
              value={`#${user?.id}`}
            />
          </div>
        </div>

        {/* Edit profile form card */}
        <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Edit Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Middle name (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="username">Email / Username</Label>
              <Input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email address"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
            <Button
              onClick={requestSave}
              disabled={!hasChanges || isSaving}
              className="gap-2"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Change password card */}
        <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Change Password
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password (min. 8 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
            <Button
              onClick={requestPasswordSave}
              disabled={!hasPasswordChanges || isPasswordSaving}
              className="gap-2"
            >
              {isPasswordSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {isPasswordSaving ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </div>

      {/* Profile update confirmation dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Update Profile?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Updating your profile will change your account details. Some
              changes (such as your display name and email) are stored in your
              session token and may require you to{" "}
              <strong>sign out and sign back in</strong> to take full effect.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Yes, Update Profile"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Password change confirmation dialog */}
      <AlertDialog
        open={showPasswordConfirm}
        onOpenChange={setShowPasswordConfirm}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Change Password?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your password will be changed immediately. After updating, you
              will be signed out and must sign in with your new password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPasswordSaving}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePasswordSave}
              disabled={isPasswordSaving}
            >
              {isPasswordSaving ? "Updating..." : "Yes, Change Password"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FadeIn>
  );
};

/** Helper component for displaying an info row with icon, label, and value. */
const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) => (
  <div className="flex items-center gap-3 py-3">
    <span className="text-muted-foreground shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground truncate">
        {value || "-"}
      </p>
    </div>
  </div>
);

export default ProfilePage;
