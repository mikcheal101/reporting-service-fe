// app/hooks/report/use-delete-report.ts
"use client";

import { deleteReportAsync } from "@/app/services/report/report-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useDeleteReport = () => {
    const queryClient = useQueryClient();
    return useMutation<boolean, AxiosError<{message: string}>, number>({
        mutationFn: deleteReportAsync,
        onSuccess: () => {
            toast({ title: TOAST_TITLES.DELETED, description: "Report deleted successfully.", variant: "success" });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPORTS] });
        },
        onError: (error: AxiosError<{message: string}>) => {
            toast({ title: TOAST_TITLES.ERROR, description: error.response?.data?.message || "Failed to delete report. Please try again.", variant: "destructive" });
        }
    });
};

export default useDeleteReport;