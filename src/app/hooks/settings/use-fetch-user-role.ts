// app/hooks/settings/use-fetch-user-role.ts
"use client";

import { fetchRoleAsync } from "@/app/services/auth/auth-service";
import { IRole } from "@/types/auth/irole";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useFetchUserRole = (id: number) => (useQuery<IRole, AxiosError<{ message: string }>, number>({
    queryKey: ["user-role", id],
    queryFn: () => fetchRoleAsync(id),
    enabled: !!id,
    retry: 2,
}));

export default useFetchUserRole;