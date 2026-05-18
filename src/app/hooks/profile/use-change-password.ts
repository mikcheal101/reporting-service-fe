/**
 * useChangePassword — hook for the change-password card on the profile page.
 *
 * Single Responsibility: manages password form state, validation, and submission.
 * On success it signs the user out and redirects to /signin so the new password
 * takes effect with a fresh session.
 *
 * @see useAuth — provides current user id and logout function
 * @see changePasswordAsync — POST /api/v1/users/:id/change-password
 */
"use client";

import { useState } from "react";
import { useAuth } from "@/app/hooks/auth/use-auth";
import { changePasswordAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { TOAST_TITLES } from "@/app/constants/toast-titles.constant";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const useChangePassword = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasChanges = currentPassword.length > 0 && newPassword.length >= 8;

  const requestSave = () => {
    if (!hasChanges) return;
    setShowConfirm(true);
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setShowConfirm(false);
    setIsSaving(true);

    try {
      await changePasswordAsync(user.id, currentPassword, newPassword);

      toast({
        title: TOAST_TITLES.SUCCESS,
        description: "Password updated successfully. Please sign in again.",
        variant: "success",
      });

      await logout(() => router.push("/signin"));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: TOAST_TITLES.ERROR,
        description:
          axiosError.response?.data?.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    isSaving,
    hasChanges,
    showConfirm,
    setShowConfirm,
    requestSave,
    handleSave,
  };
};

export default useChangePassword;
