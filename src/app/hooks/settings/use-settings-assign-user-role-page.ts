// app/hooks/settings/use-settings-assign-user-role-page.ts
"use client";

import { useEffect, useState } from "react";
import useAssignUserRole from "./use-assign-user-role";
import { IUser } from "@/types/auth/iuser";
import useFetchUserRoles from "./use-fetch-user-roles";
import { IRole } from "@/types/auth/irole";
import { toast } from "@/hooks/use-toast";

type UseSettingsAssignUserRolePageProps = {
    selectedUser: IUser | null;
    setAssignRoleSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useSettingsAssignUserRolePage = ({ selectedUser, setAssignRoleSheetOpen }: UseSettingsAssignUserRolePageProps) => {
    const [roleIds, setRoleIds] = useState<Array<number>>([]);
    const [userId, setUserId] = useState<string>();

    const { mutate: assignUserRole } = useAssignUserRole();
    const { data: roles } = useFetchUserRoles();

    useEffect(() => {
        if (!selectedUser?.roles) {
            setRoleIds([]);
            return;
        }

        const existingRoles: Array<number> = selectedUser.roles.map((role: IRole) => role.id);
        setRoleIds(existingRoles);
    }, [selectedUser]);


    const resetForm = () => {
        setUserId("");
        setRoleIds([]);
    }

    const handleRoleToggling = (roleId: number, isChecked: boolean) => {
        setRoleIds((previous = []) => {
            return isChecked ? [...(previous || []), roleId] : previous.filter((id: number) => id !== roleId);
        });
    };

    const handleAssignRoleSubmit = () => { 

        if (roleIds?.length === 0) {
            toast({
                title: "Error",
                description: "Please roles to assign",
                variant: "destructive"
            });
            return;
        }

        assignUserRole({
            userId: Number(selectedUser?.id),
            roleIds,
        }, {
            onSuccess: () => {
                resetForm();
                setAssignRoleSheetOpen(false);
            }
        });
    };

    return {
        roles,
        roleIds,
        setRoleIds,
        userId,
        setUserId,

        handleRoleToggling,
        resetForm,
        handleAssignRoleSubmit,
    };
};

export default useSettingsAssignUserRolePage;