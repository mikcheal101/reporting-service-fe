// components/settings/settings-roles-form.tsx
"use client";

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
import { Plus } from "lucide-react";

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

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-gray-800">Role Management</h2>
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
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SettingsRolesForm;
