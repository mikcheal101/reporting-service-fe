"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/hooks/auth/use-auth";
import { changePasswordAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { TOAST_TITLES } from "@/app/constants/toast-titles.constant";
import { AxiosError } from "axios";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Smartphone,
  History,
  AlertTriangle,
} from "lucide-react";
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

const Security = () => {
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

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
        description: "Password updated successfully.",
        variant: "success",
      });

      setCurrentPassword("");
      setNewPassword("");
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

  return (
    <FadeIn delay={100} direction="up">
      <div className="p-4 lg:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Password Section */}
          <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Change Password
                </h2>
                <p className="text-sm text-muted-foreground">
                  Update your account password
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sec-current-password">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="sec-current-password"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showCurrent ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sec-new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="sec-new-password"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showNew ? (
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
                onClick={requestSave}
                disabled={!hasChanges || isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                {isSaving ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>

          {/* Two-Factor Authentication Section */}
          <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Two-Factor Authentication
                </h2>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 px-4 rounded-lg border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Authenticator App
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Use an authenticator app to generate one-time codes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>

            {twoFactorEnabled && (
              <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  2FA setup flow will be available soon. Scan the QR code
                  with your authenticator app to get started.
                </p>
              </div>
            )}
          </div>

          {/* Session / Login History Section */}
          <div className="bg-card shadow-lg rounded-lg border border-border p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <History className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Login History
                </h2>
                <p className="text-sm text-muted-foreground">
                  Recent sign-in activity on your account
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border">
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <History className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    No login history available
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Login history tracking will appear once available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Change Password?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your password will be changed immediately. Make sure you
              remember your new password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Updating..." : "Yes, Change Password"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FadeIn>
  );
};

export default Security;
