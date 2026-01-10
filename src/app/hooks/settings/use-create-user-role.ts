// app/hooks/settings/use-create-user-role.ts
"use client";

import { createRoleAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { IRole } from "@/types/auth/irole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useCreateUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation<IRole, AxiosError<{ message: string }>, IRole>({
        mutationFn: createRoleAsync,
        onSuccess: (savedRole: IRole): void => {
            toast({
                title: "User role created successfully",
                description: `User role: ${savedRole.name}. with (${savedRole.permissions?.length} permissions) created successfully`,
            });

            queryClient.setQueryData<IRole[]>(["user-roles"], (roles) => [...(roles || []), savedRole]);
        },
        onError: (error: AxiosError<{ message: string }>): void => {
            toast({ title: "Error", description: error.response?.data?.message || error.message });
        }
    });
};

export default useCreateUserRole;