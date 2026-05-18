// app/hooks/user/use-create-user.ts
"use client";

import { createUserAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { IUser } from "@/types/auth/iuser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useCreateUser = () => {
    const queryClient = useQueryClient();

    return (useMutation<IUser, AxiosError<{ message: string }>, IUser>({
        mutationFn: createUserAsync,
        onSuccess: (user: IUser) => {
            toast({
                title: TOAST_TITLES.USER_CREATED_SUCCESSFULLY,
                description: `User ${user.fullName} (${user.username}) created successfully`,
                variant: "success",
            });

            queryClient.setQueryData<IUser[]>([QUERY_KEYS.USERS], (users) => [...(users || []), user]);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: TOAST_TITLES.ERROR_CREATING_USER,
                description: error.response?.data?.message || "Error creating user",
                variant: "destructive",
            });
        },
    }));
};

export default useCreateUser;