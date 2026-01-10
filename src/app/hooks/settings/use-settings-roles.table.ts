// app/hooks/settings/use-settings-roles-table.ts
"use client";

import { IRole } from "@/types/auth/irole";
import useFetchUserRoles from "./use-fetch-user-roles";

type UseSettingsRolesTableProps = {
  setForm: React.Dispatch<React.SetStateAction<IRole>>;
  setIsRoleFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useSettingsRolesTable = ({ setForm, setIsRoleFormOpen, setIsDeleteModalOpen }: UseSettingsRolesTableProps) => {
  const { data: roles = [] } = useFetchUserRoles();

  const triggerUpdateRole = (role: IRole) => {
    setForm(role);
    setIsRoleFormOpen(true);
  };

  const triggerDeleteRoleModal = (role: IRole) => {
    setForm(role);
    setIsDeleteModalOpen(true);
  };

  return {
    roles,
    triggerDeleteRoleModal,
    triggerUpdateRole,
  };
};

export default useSettingsRolesTable;