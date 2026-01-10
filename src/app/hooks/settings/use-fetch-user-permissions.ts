// app/hooks/settings/use-fetch-user-permissions.ts
"use client";

import { fetchPermissionsAsync } from "@/app/services/auth/auth-service";
import { IPermission } from "@/types/auth/ipermission";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useFetchUserPermissions = () => (useQuery<Array<IPermission>, AxiosError<{ message: string }>>({
    queryKey: ["permissions"],
    queryFn: fetchPermissionsAsync,
    retry: 2,
}));

export default useFetchUserPermissions;