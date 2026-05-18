// app/hooks/user/use-fetch-permissions.ts
"use client";

import { fetchPermissionsAsync } from "@/app/services/auth/auth-service";
import { IPermission } from "@/types/auth/ipermission";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useFetchUserPermissions = () => (useQuery<IPermission[], AxiosError<{ message: string }>>({
    queryKey: [QUERY_KEYS.USER_PERMISSIONS],
    queryFn: fetchPermissionsAsync,
    retry: 2,
}));

export default useFetchUserPermissions;