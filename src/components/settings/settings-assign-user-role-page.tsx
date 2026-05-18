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
      <SheetContent className="w-full sm:max-w-[480px]">
        <SheetHeader>
          <SheetTitle>
            {mode === "add" ? "Assign Role" : "Edit Role"}
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <div>
            <label className="block mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">User Fullname</label>
            <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-800">
              {selectedUser?.fullName}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Email / Username</label>
            <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-800">
              {selectedUser?.username}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</label>
            <div className="space-y-2 border border-gray-200 rounded-lg p-3 max-h-[250px] overflow-y-auto bg-white shadow-sm">
              {roles?.map((role) => (
                <label
                  key={role.id}
                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={roleIds?.includes(role.id)}
                    onChange={(e) => handleRoleToggling(role.id, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700">{role.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <SheetFooter className="flex justify-end gap-2 px-4 pb-4">
          <Button
            variant="secondary"
            onClick={() => {
              setAssignRoleSheetOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleAssignRoleSubmit()}>
            Assign Role
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsAssignUserRolePage;
