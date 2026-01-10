// app/hooks/user/use-delete-user.ts
"use client";

import { deleteUserAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return (useMutation<boolean, AxiosError<{ message: string }>, number>({
        mutationFn: (id: number) => deleteUserAsync(id),
        onSuccess: (deleted: boolean, id: number) => {
            toast({
                title: deleted ? "User deleted successfully" : "Error deleting user",
                description: deleted ? `User with ID ${id} deleted successfully` : "Error deleting user",
            });

            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: "Error deleting user",
                description: error.response?.data?.message || "Error deleting user",
                variant: "destructive",
            });
        },
    }));
};

export default useDeleteUser;