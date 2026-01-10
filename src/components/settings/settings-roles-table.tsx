// components/settings/settings-roles-table.tsx
"use client";

import { IRole } from "@/types/auth/irole";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import renderTable from "../ui/render-table";
import useSettingsRolesTable from "@/app/hooks/settings/use-settings-roles.table";

type SettingsRolesTableProps = {
  setForm: React.Dispatch<React.SetStateAction<IRole>>;
  setIsRoleFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsRolesTable = ({
  setForm,
  setIsDeleteModalOpen,
  setIsRoleFormOpen,
}: SettingsRolesTableProps) => {
  const { roles, triggerDeleteRoleModal, triggerUpdateRole } =
    useSettingsRolesTable({ setForm, setIsDeleteModalOpen, setIsRoleFormOpen });

  return renderTable(roles, ["Name", "Permissions"], (role: IRole) => (
    <tr key={role.id} className="border-b hover:bg-gray-50">
      <td className="px-6 py-3 w-[20%]">{role.name || ""}</td>
      <td className="px-6 py-3">
        {role.permissions?.map((permission) => permission.name).join(",  ") ||
          ""}
      </td>
      <td className="px-6 py-3 text-right w-[10%]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => triggerDeleteRoleModal(role)}>
              Delete Role
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => triggerUpdateRole(role)}>
              Update Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  ));
};

export default SettingsRolesTable;
