// app/hooks/settings/use-assign-user-role.ts
"use client";

import { assignUserToRoleAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useAssignUserRole = () => {
    const queryClient = useQueryClient();

    return (useMutation<boolean, AxiosError<{ message: string }>, { userId: number; roleIds: Array<number>; }>({
        mutationFn: assignUserToRoleAsync,
        onSuccess: (success: boolean) => {
            toast({
                title: success ? TOAST_TITLES.SUCCESS : TOAST_TITLES.ERROR,
                description: success ? "Role assigned successfully!" : "Failed to assign role.",
                variant: success ? "success" : "destructive",
            });

            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: TOAST_TITLES.ERROR, description: error.response?.data?.message || "Failed to assign role. Please try again.", variant: "destructive"
            });
        }
    }));
};

export default useAssignUserRole;