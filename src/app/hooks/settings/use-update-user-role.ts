// app/hooks/settings/use-update-user-role.ts
"use client";

import { updateRoleAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { IRole } from "@/types/auth/irole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUpdateUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation<IRole, AxiosError<{ message: string }>, IRole>({
        mutationFn: updateRoleAsync,
        onSuccess: (updatedRole: IRole): void => {
            toast({
                title: "User role updates successfully",
                description: `User role: ${updatedRole.name}. with (${updatedRole.permissions?.length} permissions) updated successfully`,
            });

            queryClient.setQueryData<IRole[]>(["user-roles"], (roles) => roles?.map((role) => (role.id === updatedRole.id ? updatedRole : role)) || []);
        },
        onError: (error: AxiosError<{ message: string }>): void => {
            toast({ title: "Error", description: error.response?.data?.message || error.message });
        }
    });
};

export default useUpdateUserRole;