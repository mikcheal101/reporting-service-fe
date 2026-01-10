// app/hooks/report/use-save-report.ts
"use client";

import { saveReportAsync } from "@/app/services/report/report-service";
import { toast } from "@/hooks/use-toast";
import IReport from "@/types/report/ireport";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useSaveReport = () => {
    const queryClient = useQueryClient();
    return useMutation<IReport, AxiosError<{ message: string }>, IReport>({
        mutationFn: saveReportAsync,
        onSuccess: (report) => {
            queryClient.setQueryData<IReport[]>(["reports"], (reports) => [...(reports || []), report]);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast({ title: "Error", description: error.response?.data?.message || error.message });
        }
    });
};

export default useSaveReport;