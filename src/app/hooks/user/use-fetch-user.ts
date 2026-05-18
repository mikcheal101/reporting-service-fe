// app/hooks/auth/use-fetch-user.ts
"use client";

import { fetchUserAsync } from "@/app/services/auth/auth-service";
import { IUser } from "@/types/auth/iuser";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useFetchUser = (id: number) => useQuery<IUser, AxiosError<{ message: string }>, number>({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () => fetchUserAsync(id),
    retry: 2,
    enabled: !!id,
});

export default useFetchUser;
