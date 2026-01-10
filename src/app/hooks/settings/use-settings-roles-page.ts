// app/hooks/settings/use-settings-roles-page.ts
"use client";

import { IRole } from "@/types/auth/irole";
import { useState } from "react";
import useDeleteUserRole from "./use-delete-user-role";

const emptyRoleForm: IRole = {
    id: 0,
    name: "",
    permissions: [],
};

const useSettingsRolesPage = () => {

    const [isRoleFormOpen, setIsRoleFormOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [form, setForm] = useState<IRole>(emptyRoleForm);
    const [selectedRole, setSelectedRole] = useState<IRole | null>(null);
    const { mutate: deleteRole } = useDeleteUserRole();

    const resetForm = () => {
        setForm(emptyRoleForm);
    };

    const isNewForm = (): boolean => form.id === 0;

    const handleDeleteRole = (role: IRole) => {
        setForm(emptyRoleForm);
        deleteRole(role.id);
        setIsDeleteModalOpen(false);
    };

    return {
        isRoleFormOpen,
        setIsRoleFormOpen,
        resetForm,
        isNewForm,
        selectedRole,
        setSelectedRole,
        form,
        setForm,
        handleDeleteRole,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
    };
};

export default useSettingsRolesPage;