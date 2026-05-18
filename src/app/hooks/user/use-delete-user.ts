// app/hooks/user/use-delete-user.ts
"use client";

import { deleteUserAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return (useMutation<boolean, AxiosError<{ message: string }>, number>({
        mutationFn: (id: number) => deleteUserAsync(id),
        onSuccess: (deleted: boolean, id: number) => {
            toast({
                title: deleted ? "User deleted successfully" : "Error deleting user",
                description: deleted ? "The user account has been permanently removed." : "Failed to remove the user account.",
                variant: deleted ? "success" : "destructive",
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: TOAST_TITLES.ERROR_DELETING_USER,
                description: error.response?.data?.message || "Error deleting user",
                variant: "destructive",
            });
        },
    }));
};

export default useDeleteUser;