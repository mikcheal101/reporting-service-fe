// app/hooks/report/report-detail/query-editor/use-query-execute.ts
"use client";

import { executeQueryAsync } from "@/app/services/report/query-service";
import { toast } from "@/hooks/use-toast";
import IQueryRequest from "@/types/report/iquery-request";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useQueryExecute = () => (useMutation<string, AxiosError<{ message: string }>, IQueryRequest>({
    mutationFn: executeQueryAsync,
    onSuccess: (data: string) => {
        toast({
            title: "Success",
            description: `Query execution completed successfully.`,
        });
    },
    onError: (error: AxiosError<{ message: string }>) => {
        toast({
            title: "Error",
            description: error.response?.data.message,
        });
    }
}));

export default useQueryExecute;