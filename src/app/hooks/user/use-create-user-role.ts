// app/hooks/user/use-create-user-role.ts
"use client";

import { createRoleAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { IRole } from "@/types/auth/irole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useCreateUserRole = () => {
    const queryClient = useQueryClient();

    return (useMutation<IRole, AxiosError<{ message: string }>, IRole>({
        mutationFn: createRoleAsync,
        onSuccess: (role: IRole) => {
            toast({
                title: "User role created successfully",
                description: `User role ${role.name} with ID ${role.id} created successfully`,
            });

            queryClient.setQueryData<IRole[]>(["user-roles"], (roles) => (roles || []).concat(role));
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: "Error creating user role",
                description: error.response?.data?.message || "Error creating user role",
                variant: "destructive",
            });
        },
    }));
};

export default useCreateUserRole;