// app/hooks/settings/use-fetch-user-permissions.ts
"use client";

import { fetchPermissionsAsync } from "@/app/services/auth/auth-service";
import { IPermission } from "@/types/auth/ipermission";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useFetchUserPermissions = () => (useQuery<Array<IPermission>, AxiosError<{ message: string }>>({
    queryKey: [QUERY_KEYS.PERMISSIONS],
    queryFn: fetchPermissionsAsync,
    retry: 2,
}));

export default useFetchUserPermissions;