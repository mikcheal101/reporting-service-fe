// app/hooks/user/use-fetch-permissions.ts
"use client";

import { fetchPermissionsAsync } from "@/app/services/auth/auth-service";
import { IPermission } from "@/types/auth/ipermission";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useFetchUserPermissions = () => (useQuery<IPermission[], AxiosError<{ message: string }>>({
    queryKey: ["user-permissions"],
    queryFn: fetchPermissionsAsync,
    retry: 2,
}));

export default useFetchUserPermissions;