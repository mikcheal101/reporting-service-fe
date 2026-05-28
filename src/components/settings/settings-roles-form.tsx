// components/settings/settings-roles-form.tsx
"use client";

import { useState } from "react";
import useSettingsRolesForm from "@/app/hooks/settings/use-settings-roles-form";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IRole } from "@/types/auth/irole";
import SettingsRolesFormPermissions from "./settings-roles-form-permissions";
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
import usePermission from "@/app/hooks/auth/use-permission";

type SettingsRolesFormProps = {
  form: IRole;
  isRoleFormOpen: boolean;
  setForm: React.Dispatch<React.SetStateAction<IRole>>;
  setIsRoleFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm: () => void;
  isNewForm: () => boolean;
};

const SettingsRolesForm = ({
  form,
  setForm,
  isRoleFormOpen,
  setIsRoleFormOpen,
  resetForm,
  isNewForm,
}: SettingsRolesFormProps) => {
  const { openForm, handleSubmit, handleInputChange } = useSettingsRolesForm({
    form,
    setForm,
    setIsRoleFormOpen,
    resetForm,
    isNewForm,
  });

  const [isPending, setIsPending] = useState(false);
  const { can } = usePermission();
  const canCreate = can("role", "create");

  const onConfirm = () => {
    setIsPending(true);
    try {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Role Management</h2>
      {canCreate && (
        <Sheet open={isRoleFormOpen} onOpenChange={setIsRoleFormOpen}>
          <SheetTrigger asChild onClick={openForm}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </SheetTrigger>

          <SheetContent className="w-full sm:max-w-[480px]">
            <SheetHeader>
              <SheetTitle>
                {isNewForm() ? "Add a New User Role" : "Edit User Role"}
              </SheetTitle>
              <SheetDescription>
                {isNewForm()
                  ? "Please fill out the form below to add a new user role."
                  : "Edit the user role's details below."}
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter Role Name"
                  required
                  value={form.name}
                  onChange={handleInputChange}
                />
              </div>

              <SettingsRolesFormPermissions form={form} setForm={setForm} />

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
                        {isNewForm() ? "Create Role?" : "Update Role?"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {isNewForm()
                          ? "This will create a new user role with the selected permissions. Are you sure you want to continue?"
                          : "This will update the role's information and permissions. Are you sure you want to continue?"}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onConfirm}>
                        {isNewForm() ? "Create" : "Update"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default SettingsRolesForm;
