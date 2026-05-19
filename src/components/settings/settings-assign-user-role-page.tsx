// components/settings/settings-assign-user-role-page.tsx
"use client";

import { useState } from "react";
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
import { Loader2, CheckCircle2 } from "lucide-react";

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

  const [isPending, setIsPending] = useState(false);

  const onConfirm = () => {
    setIsPending(true);
    handleAssignRoleSubmit();
    setIsPending(false);
  };

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
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User Fullname</label>
            <div className="rounded-lg border border-gray-100 dark:border-border bg-gray-50 dark:bg-muted/50 px-3 py-2 text-sm text-gray-800 dark:text-gray-200">
              {selectedUser?.fullName}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email / Username</label>
            <div className="rounded-lg border border-gray-100 dark:border-border bg-gray-50 dark:bg-muted/50 px-3 py-2 text-sm text-gray-800 dark:text-gray-200">
              {selectedUser?.username}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Roles</label>
            <div className="space-y-2 border border-gray-200 dark:border-border rounded-lg p-3 max-h-[250px] overflow-y-auto bg-white dark:bg-card shadow-sm">
              {roles?.map((role) => (
                <label
                  key={role.id}
                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-accent/50 px-2 py-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={roleIds?.includes(role.id)}
                    onChange={(e) => handleRoleToggling(role.id, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 dark:border-border text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{role.name}</span>
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                {isPending ? "Assigning..." : "Assign Role"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Assign Role?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will assign the selected roles to {selectedUser?.fullName}. Are you sure you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                  Assign
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsAssignUserRolePage;
