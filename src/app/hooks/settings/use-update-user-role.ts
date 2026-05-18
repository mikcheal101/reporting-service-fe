// app/hooks/settings/use-update-user-role.ts
"use client";

import { updateRoleAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { IRole } from "@/types/auth/irole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useUpdateUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation<IRole, AxiosError<{ message: string }>, IRole>({
        mutationFn: updateRoleAsync,
        onSuccess: (updatedRole: IRole): void => {
            toast({
                title: TOAST_TITLES.USER_ROLE_UPDATES_SUCCESSFULLY,
                description: `User role: ${updatedRole.name}. with (${updatedRole.permissions?.length} permissions) updated successfully`,
                variant: "success",
            });

            queryClient.setQueryData<IRole[]>([QUERY_KEYS.USER_ROLES], (roles) => roles?.map((role) => (role.id === updatedRole.id ? updatedRole : role)) || []);
        },
        onError: (error: AxiosError<{ message: string }>): void => {
            toast({ title: TOAST_TITLES.ERROR, description: error.response?.data?.message || error.message, variant: "destructive" });
        }
    });
};

export default useUpdateUserRole;