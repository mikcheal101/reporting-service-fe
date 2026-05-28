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
import usePermission from "@/app/hooks/auth/use-permission";

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

  const { can } = usePermission();
  const canUpdate = can("role", "update");
  const canDelete = can("role", "delete");
  const showActions = canUpdate || canDelete;

  return renderTable(roles, ["Name", "Permissions", ...(showActions ? [""] : [])], (role: IRole) => (
    <tr key={role.id} className="hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3.5 w-[20%] text-sm font-medium text-foreground">{role.name || ""}</td>
      <td className="px-4 py-3.5 text-sm text-muted-foreground">
        {role.permissions?.map((permission) => permission.name).join(",  ") ||
          ""}
      </td>
      {showActions && (
        <td className="px-4 py-3 text-right w-[10%]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {canUpdate && (
                <DropdownMenuItem onClick={() => triggerUpdateRole(role)}>
                  Update Role
                </DropdownMenuItem>
              )}
              {canDelete && (
                <DropdownMenuItem onClick={() => triggerDeleteRoleModal(role)}>
                  Delete Role
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      )}
    </tr>
  ));
};

export default SettingsRolesTable;
