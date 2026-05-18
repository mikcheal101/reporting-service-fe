// app/hooks/user/use-create-user-role.ts
"use client";

import { createRoleAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { IRole } from "@/types/auth/irole";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useCreateUserRole = () => {
    const queryClient = useQueryClient();

    return (useMutation<IRole, AxiosError<{ message: string }>, IRole>({
        mutationFn: createRoleAsync,
        onSuccess: (role: IRole) => {
            toast({
                title: TOAST_TITLES.USER_ROLE_CREATED_SUCCESSFULLY,
                description: `User role "${role.name}" created successfully`,
                variant: "success",
            });

            queryClient.setQueryData<IRole[]>([QUERY_KEYS.USER_ROLES], (roles) => (roles || []).concat(role));
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: TOAST_TITLES.ERROR_CREATING_USER_ROLE,
                description: error.response?.data?.message || "Error creating user role",
                variant: "destructive",
            });
        },
    }));
};

export default useCreateUserRole;