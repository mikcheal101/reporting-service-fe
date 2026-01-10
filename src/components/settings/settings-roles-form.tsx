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
      <h2 className="text-lg font-bold text-gray-700">Role Management</h2>
      <Sheet open={isRoleFormOpen} onOpenChange={setIsRoleFormOpen}>
        <SheetTrigger
          className="bg-[#FFBF48] text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-[#ffa726] focus:ring-2 focus:ring-[#FFBF48] focus:ring-offset-2 focus:outline-none transition-all duration-200 ease-in-out active:scale-95"
          onClick={openForm}
        >
          Add Role
        </SheetTrigger>

        <SheetContent className="w-[400px] sm:w-[540px]">
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Role Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Role Name"
                required
                value={form.name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border-gray-300 shadow-sm sm:text-sm rounded-md border-2"
              />
            </div>

            <SettingsRolesFormPermissions form={form} setForm={setForm} />

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

export default SettingsRolesForm;
