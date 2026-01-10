// components/settings/settings-users-view.tsx
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { IUser } from "@/types/auth/iuser";

type SettingsUsersViewProps = {
    selectedUser: IUser | null;
    viewDetailsSheetOpen: boolean;
    setViewDetailsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsUsersView = ({ selectedUser, viewDetailsSheetOpen, setViewDetailsSheetOpen }: SettingsUsersViewProps) => {
  return (
    <Sheet open={viewDetailsSheetOpen} onOpenChange={setViewDetailsSheetOpen}>
      <SheetContent className="w-[30%]">
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
          <SheetDescription>
            View detailed information about the selected user.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-4">
          {selectedUser && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  User ID
                </label>
                <p className="text-sm text-gray-900">
                  {selectedUser.id}
                </p>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email / Username
                </label>
                <p className="text-sm text-gray-900">
                  {selectedUser.username}
                </p>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  First Name
                </label>
                <p className="text-sm text-gray-900">
                  {selectedUser.firstName}
                </p>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <p className="text-sm text-gray-900">
                  {selectedUser.lastName}
                </p>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <p className="text-sm text-gray-900">
                  {selectedUser.phone || "N/A"}
                </p>
              </div>
            </>
          )}
        </div>
        <SheetFooter className="flex justify-end">
          <Button
            variant="secondary"
            onClick={() => setViewDetailsSheetOpen(false)}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsUsersView;
