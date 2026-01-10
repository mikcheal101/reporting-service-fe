// app/hooks/user/use-create-user.ts
"use client";

import { createUserAsync } from "@/app/services/auth/auth-service";
import { toast } from "@/hooks/use-toast";
import { IUser } from "@/types/auth/iuser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useCreateUser = () => {
    const queryClient = useQueryClient();

    return (useMutation<IUser, AxiosError<{ message: string }>, IUser>({
        mutationFn: createUserAsync,
        onSuccess: (user: IUser) => {
            toast({
                title: "User created successfully",
                description: `User ${user.fullName} (${user.username}) created successfully`,
            });

            queryClient.setQueryData<IUser[]>(["users"], (users) => [...(users || []), user]);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({
                title: "Error creating user",
                description: error.response?.data?.message || "Error creating user",
                variant: "destructive",
            });
        },
    }));
};

export default useCreateUser;