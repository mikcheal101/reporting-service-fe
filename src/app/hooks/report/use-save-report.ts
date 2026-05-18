// app/hooks/report/use-save-report.ts
"use client";

import { saveReportAsync } from "@/app/services/report/report-service";
import { toast } from "@/hooks/use-toast";
import IReport from "@/types/report/ireport";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useSaveReport = () => {
    const queryClient = useQueryClient();
    return useMutation<IReport, AxiosError<{ message: string }>, IReport>({
        mutationFn: saveReportAsync,
        onSuccess: (report) => {
            toast({ title: TOAST_TITLES.SUCCESS, description: "Report created successfully.", variant: "success" });
            queryClient.setQueryData<IReport[]>([QUERY_KEYS.REPORTS], (reports) => [...(reports || []), report]);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({ title: TOAST_TITLES.ERROR, description: error.response?.data?.message || error.message, variant: "destructive" });
        }
    });
};

export default useSaveReport;