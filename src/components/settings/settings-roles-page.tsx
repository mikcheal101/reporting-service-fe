// components/settings/settings-role-page.tsx
"use client";

import useSettingsRolesPage from "@/app/hooks/settings/use-settings-roles-page";
import SettingsDeleteUserRoleModal from "./settings-delete-user-role.modal";
import SettingsRolesTable from "./settings-roles-table";
import SettingsRolesForm from "./settings-roles-form";

const SettingsRolePage = () => {
  const {
    isNewForm,
    isRoleFormOpen,
    setIsRoleFormOpen,
    form,
    resetForm,
    setForm,
    handleDeleteRole,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  } = useSettingsRolesPage();

  return (
    <>
      <SettingsRolesForm
        form={form}
        setForm={setForm}
        setIsRoleFormOpen={setIsRoleFormOpen}
        resetForm={resetForm}
        isNewForm={isNewForm}
        isRoleFormOpen={isRoleFormOpen}
      />

      {isDeleteModalOpen && (
        <SettingsDeleteUserRoleModal
          selectedRole={form}
          handleDeleteRole={handleDeleteRole}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}

      <SettingsRolesTable
        setForm={setForm}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setIsRoleFormOpen={setIsRoleFormOpen}
      />
    </>
  );
};

export default SettingsRolePage;
