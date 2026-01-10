// app/hooks/report/report-detail/query-editor/use-query-test.ts
"use client";

import { testQueryAsync } from "@/app/services/report/query-service";
import { toast } from "@/hooks/use-toast";
import IQueryRequest from "@/types/report/iquery-request";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useQueryTest = () => (useMutation<string, AxiosError<{ message: string }>, IQueryRequest>({
    mutationFn: testQueryAsync,
    onSuccess: (data: string) => {
        console.log('gotten string response: ', data);
        toast({
            title: "Success",
            description: `Query test completed successfully.`,
        });
    },
    onError: (error: AxiosError<{ message: string }>) => {
        toast({
            title: "Error",
            description: error.response?.data.message,
        });
    }
}));

export default useQueryTest;