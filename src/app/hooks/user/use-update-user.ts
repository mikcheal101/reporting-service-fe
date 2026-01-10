// app/hooks/user/use-update-user.ts
"use client";

import { updateUserAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { IUser } from "@/types/auth/iuser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return (useMutation<IUser, AxiosError<{ message: string }>, IUser>({
        mutationFn: updateUserAsync,
        onSuccess: (updatedUser: IUser) => {
            toast({
                title: "User updated successfully",
                description: `User ${updatedUser.fullName} (${updatedUser.username}) updated successfully`,
            });
            queryClient.setQueryData<IUser[]>(["users"], (users) => users?.map((u) => (u.id === updatedUser.id ? updatedUser : u)) || []);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: "Error updating user",
                description: error.response?.data?.message || "Error updating user",
                variant: "destructive",
            });
        },
    }));
};

export default useUpdateUser;