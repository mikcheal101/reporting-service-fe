// app/hooks/user/use-update-user.ts
"use client";

import { updateUserAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { IUser } from "@/types/auth/iuser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return (useMutation<IUser, AxiosError<{ message: string }>, IUser>({
        mutationFn: updateUserAsync,
        onSuccess: (updatedUser: IUser) => {
            toast({
                title: TOAST_TITLES.USER_UPDATED_SUCCESSFULLY,
                description: `User ${updatedUser.fullName} (${updatedUser.username}) updated successfully`,
                variant: "success",
            });
            queryClient.setQueryData<IUser[]>([QUERY_KEYS.USERS], (users) => users?.map((u) => (u.id === updatedUser.id ? updatedUser : u)) || []);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: TOAST_TITLES.ERROR_UPDATING_USER,
                description: error.response?.data?.message || "Error updating user",
                variant: "destructive",
            });
        },
    }));
};

export default useUpdateUser;