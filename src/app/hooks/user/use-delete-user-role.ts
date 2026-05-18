// app/hooks/user/use-delete-user-role.ts
"use client";

import { deleteRoleAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useDeleteUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation<boolean, AxiosError<{ message: string }>, number>({
        mutationFn: (id: number) => deleteRoleAsync(id),
        onSuccess: (deleted: boolean, id: number) => {
            toast({
                title: deleted ? "User role deleted successfully" : "Error deleting user role",
                description: deleted ? "The role assignment has been removed." : "Failed to remove the role assignment.",
                variant: deleted ? "success" : "destructive",
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_ROLES] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: TOAST_TITLES.ERROR_DELETING_USER_ROLE,
                description: error.response?.data?.message || "Error deleting user role",
                variant: "destructive",
            });
        },
    });
};

export default useDeleteUserRole;