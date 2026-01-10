// components/settings/settings-users-form.tsx
"use client";

import React from "react";
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

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-gray-700">User Management</h2>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger
          className="bg-[#FFBF48] text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-[#ffa726] focus:ring-2 focus:ring-[#FFBF48] focus:ring-offset-2 focus:outline-none transition-all duration-200 ease-in-out active:scale-95"
          onClick={() => {
            // Only reset form data and set mode when explicitly adding a new user
            setMode("add");
            resetForm();
          }}
        >
          Add User
        </SheetTrigger>

        <SheetContent className="w-[400px] sm:w-[540px]">
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
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter First Name"
                required
                value={form.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md border-2"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                type="text"
                required
                value={form.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md border-2"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email / Username:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter Email / Username"
                required
                value={form.username}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md border-2"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="phone"
                placeholder="Enter Tel Number"
                required
                value={form.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md border-2"
              />
            </div>
            {mode === "add" && (
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md border-2"
                />
                <span
                  className="absolute inset-y-0 mt-6 right-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            )}
            <div className="flex justify-end">
              <Button type="submit" variant="default">
                {"Save Changes"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SettingsUsersForm;
