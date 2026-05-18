// app/hooks/settings/use-fetch-user-roles.ts
"use client";

import { fetchRolesAsync } from "@/app/services/auth/auth-service";
import { IRole } from "@/types/auth/irole";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useFetchUserRoles = () => (useQuery<Array<IRole>, AxiosError<{ message: string }>>({
    queryKey: [QUERY_KEYS.USER_ROLES],
    queryFn: fetchRolesAsync,
    retry: 2,
}));

export default useFetchUserRoles;