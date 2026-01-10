// app/hooks/user/use-update-user-role.ts
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
        onSuccess: (updatedRole: IRole) => {
            toast({
                title: "User role updated successfully",
                description: `User role with ID ${updatedRole.id} updated successfully`,
            });

            queryClient.setQueryData<IRole[]>(["roles"], (roles) => roles?.map((r) => (r.id === updatedRole.id ? updatedRole : r)) || []);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: "Error updating user role",
                description: error.response?.data?.message || "Error updating user role",
                variant: "destructive",
            });
        },
    });
};

export default useUpdateUserRole;