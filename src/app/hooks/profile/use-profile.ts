/**
 * useProfile — hook for the profile page.
 *
 * Single Responsibility: manages form state synchronised with the authenticated
 * user from AuthContext, tracks dirty state, and handles save/submit via the
 * existing updateUserAsync API.
 *
 * @see useAuth — provides the current IUser from auth context
 * @see updateUserAsync — PUT /api/v1/users/:id
 */
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/auth/use-auth";
import { updateUserAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { TOAST_TITLES } from "@/app/constants/toast-titles.constant";
import { AxiosError } from "axios";

const useProfile = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /** Sync form fields whenever the auth user changes. */
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setMiddleName(user.middleName || "");
      setPhone(user.phone || "");
      setUsername(user.username || "");
    }
  }, [user]);

  /** True when any form field differs from the current user data. */
  const hasChanges =
    firstName !== (user?.firstName || "") ||
    lastName !== (user?.lastName || "") ||
    middleName !== (user?.middleName || "") ||
    phone !== (user?.phone || "") ||
    username !== (user?.username || "");

  /** Open confirmation dialog before saving. */
  const requestSave = () => {
    if (!hasChanges) return;
    setShowConfirm(true);
  };

  /** Persist profile changes via PUT /api/v1/users/:id. */
  const handleSave = async () => {
    if (!user?.id) return;
    setShowConfirm(false);
    setIsSaving(true);
    try {
      await updateUserAsync({
        id: user.id,
        firstName,
        lastName,
        middleName,
        phone,
        username,
        fullName: [firstName, middleName, lastName].filter(Boolean).join(" "),
      });
      toast({
        title: TOAST_TITLES.PROFILE_UPDATED_SUCCESSFULLY,
        description:
          "Profile details updated. Sign out and sign back in for changes to take full effect.",
        variant: "success",
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: TOAST_TITLES.ERROR_UPDATING_PROFILE,
        description:
          axiosError.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
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
  };
};

export default useProfile;
