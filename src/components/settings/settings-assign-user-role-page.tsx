// components/settings/settings-assign-user-role-page.tsx
"use client";

import useSettingsAssignUserRolePage from "@/app/hooks/settings/use-settings-assign-user-role-page";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { IUser } from "@/types/auth/iuser";

type SettingsAssignUserRolePageProps = {
  mode: string;
  selectedUser: IUser | null;
  assignRoleSheetOpen: boolean;
  setAssignRoleSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsAssignUserRolePage = ({
  mode,
  selectedUser,
  assignRoleSheetOpen,
  setAssignRoleSheetOpen,
}: SettingsAssignUserRolePageProps) => {
  const {
    roles,
    roleIds,

    handleRoleToggling,
    resetForm,
    handleAssignRoleSubmit,
  } = useSettingsAssignUserRolePage({ setAssignRoleSheetOpen, selectedUser });

  return (
    <Sheet open={assignRoleSheetOpen} onOpenChange={setAssignRoleSheetOpen}>
      <SheetContent className="w-[30%]">
        <SheetHeader>
          <SheetTitle>
            {" "}
            {mode === "add" ? "Assign Role" : "Edit Role"}
          </SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <label className="block mb-2 text-sm font-medium">User Fullname:</label>
          <div className="mb-4 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800">
            {selectedUser?.fullName}
          </div>

          <label className="block mb-2 text-sm font-medium">Email / Username:</label>
          <div className="mb-4 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800">
            {selectedUser?.username}
          </div>
          <label className="block mb-2 text-sm font-medium">Roles</label>

          <div className="space-y-2 border border-gray-300 rounded-md p-3 max-h-[250px] overflow-y-auto">
            {roles?.map((role) => (
              <label
                key={role.id}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={roleIds?.includes(role.id)}
                  onChange={(e) => handleRoleToggling(role.id, e.target.checked)}
                  className="h-4 w-4"
                />
                {role.name}
              </label>
            ))}
          </div>
        </div>
        <SheetFooter className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setAssignRoleSheetOpen(false);
              resetForm(); // Clear form data when closing
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleAssignRoleSubmit()}
          >
            Assign Role
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsAssignUserRolePage;
