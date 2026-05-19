// components/settings/settings-users-form.tsx
"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IUser } from "@/types/auth/iuser";
import useSettingsUsersForm from "@/app/hooks/settings/use-settings-users-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Loader2, Save, Plus } from "lucide-react";

type SettingsUsersFormProps = {
  mode: string;
  isSheetOpen: boolean;
  selectedUser: IUser | null;
  setMode: React.Dispatch<React.SetStateAction<"add" | "edit">>;
  setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsUsersForm = ({
  mode,
  setMode,
  isSheetOpen,
  selectedUser,
  setIsSheetOpen,
  setSelectedUser,
}: SettingsUsersFormProps) => {
  const {
    form,
    showPassword,
    resetForm, 
    handleSubmit,
    handleInputChange,
    togglePasswordVisibility,
} = useSettingsUsersForm({ selectedUser, setSelectedUser, setIsSheetOpen });

  const [isPending, setIsPending] = useState(false);

  const onConfirm = () => {
    setIsPending(true);
    try {
      handleSubmit();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">User Management</h2>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild onClick={() => {
            setMode("add");
            resetForm();
          }}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </SheetTrigger>

        <SheetContent className="w-full sm:max-w-[480px]">
          <SheetHeader>
            <SheetTitle>
              {mode === "add" ? "Add a New User" : "Edit User"}
            </SheetTitle>
            <SheetDescription>
              {mode === "add"
                ? "Please fill out the form below to add a new user."
                : "Edit the user's details below."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                required
                value={form.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                required
                value={form.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Email / Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter Email / Username"
                required
                value={form.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter Phone Number"
                required
                value={form.phone}
                onChange={handleInputChange}
              />
            </div>
            {mode === "add" && (
              <div className="relative space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={handleInputChange}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-end pt-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" disabled={isPending}>
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {mode === "add" ? "Create User?" : "Update User?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {mode === "add"
                        ? "This will create a new user account. The user will receive an email with their login credentials."
                        : "This will update the user's information. Are you sure you want to continue?"}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                      {mode === "add" ? "Create" : "Update"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SettingsUsersForm;
