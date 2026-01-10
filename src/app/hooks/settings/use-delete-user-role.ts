// app/hooks/settings/use-delete-user-role.ts
"use client";

import { deleteRoleAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation<boolean, AxiosError<{ message: string }>, number>({
        mutationFn: (id: number) => deleteRoleAsync(id),
        onSuccess: (deleted: boolean, id: number): void => {
            toast({
                title: deleted ? "User role deleted successfully" : "Error deleting user role",
                description: deleted ? `User role with ID ${id} deleted successfully` : "Error deleting user role",
            });

            queryClient.invalidateQueries({ queryKey: ["user-roles"] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: "Error deleting user",
                description: error.response?.data?.message || "Error deleting user",
                variant: "destructive",
            });
        },
    });
};

export default useDeleteUserRole;