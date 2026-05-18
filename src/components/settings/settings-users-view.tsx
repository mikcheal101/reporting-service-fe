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
      <SheetContent className="w-full sm:max-w-[400px]">
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
          <SheetDescription>
            View detailed information about the selected user.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-4">
          {selectedUser && (
            <>
              {[
                { label: "User ID", value: selectedUser.id },
                { label: "Email / Username", value: selectedUser.username },
                { label: "First Name", value: selectedUser.firstName },
                { label: "Last Name", value: selectedUser.lastName },
                { label: "Phone Number", value: selectedUser.phone || "N/A" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="block mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {label}
                  </label>
                  <p className="text-sm text-gray-900 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                    {value}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
        <SheetFooter className="flex justify-end px-4 pb-4">
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
