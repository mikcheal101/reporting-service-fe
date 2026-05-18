// app/hooks/auth/use-fetch-users.ts
"use client";

import { fetchUsersAsync } from "@/app/services/auth/auth-service";
import { IUser } from "@/types/auth/iuser";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useFetchUsers = () => useQuery<IUser[], AxiosError<{ message: string }>>({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUsersAsync,
    retry: 2,
});

export default useFetchUsers;