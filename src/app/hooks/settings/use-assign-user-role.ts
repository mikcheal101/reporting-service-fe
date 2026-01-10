// app/hooks/settings/use-assign-user-role.ts
"use client";

import { assignUserToRoleAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useAssignUserRole = () => {
    const queryClient = useQueryClient();

    return (useMutation<boolean, AxiosError<{ message: string }>, { userId: number; roleIds: Array<number>; }>({
        mutationFn: assignUserToRoleAsync,
        onSuccess: (success: boolean) => {
            toast({
                title: success ? "Success" : "Error",
                description: success ? "Role assigned successfully!" : "Failed to assign role.",
            });

            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: "Error", description: error.response?.data.message
            });
        }
    }));
};

export default useAssignUserRole;