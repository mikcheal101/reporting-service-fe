// app/hooks/report/use-update-report.ts
"use client";

import { updateReportAsync } from "@/app/services/report/report-service";
import { toast } from "@/hooks/use-toast";
import IReport from "@/types/report/ireport";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useUpdateReport = () => {
    const queryClient = useQueryClient();
    return useMutation<IReport, AxiosError<{message: string}>, IReport>({
        mutationFn: updateReportAsync,
        onSuccess: (updatedReport: IReport) => {
            toast({ title: TOAST_TITLES.UPDATED, description: "Report updated successfully.", variant: "success" });
            queryClient.setQueryData<IReport[]>([QUERY_KEYS.REPORTS], (reports) => reports?.map((report) => report.id === updatedReport.id ? updatedReport : report) || []);
        },
        onError: (error: AxiosError<{message: string}>) => {
            toast({ title: TOAST_TITLES.ERROR, description: error.response?.data?.message || "Failed to update report. Please try again.", variant: "destructive" });
        }
    });
};

export default useUpdateReport;