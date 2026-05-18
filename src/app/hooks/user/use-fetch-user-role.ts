// app/hooks/user/use-fetch-user-role.ts
"use client";

import { fetchRoleAsync } from "@/app/services/auth/auth-service";
import { IRole } from "@/types/auth/irole";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useFetchUserRole = (id: number) => (useQuery<IRole, AxiosError<{ message: string }>, number>({
    queryKey: [QUERY_KEYS.USER_ROLE, id],
    queryFn: () => fetchRoleAsync(id),
    enabled: !!id,
    retry: 2,
}));

export default useFetchUserRole;
