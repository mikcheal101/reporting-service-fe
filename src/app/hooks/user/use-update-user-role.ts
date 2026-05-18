// app/hooks/user/use-update-user-role.ts
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
        onSuccess: (updatedRole: IRole) => {
            toast({
                title: TOAST_TITLES.USER_ROLE_UPDATES_SUCCESSFULLY,
                description: `User role "${updatedRole.name}" updated successfully`,
                variant: "success",
            });

            queryClient.setQueryData<IRole[]>([QUERY_KEYS.USER_ROLES], (roles) => roles?.map((r) => (r.id === updatedRole.id ? updatedRole : r)) || []);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: TOAST_TITLES.ERROR_UPDATING_USER_ROLE,
                description: error.response?.data?.message || "Error updating user role",
                variant: "destructive",
            });
        },
    });
};

export default useUpdateUserRole;