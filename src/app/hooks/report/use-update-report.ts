// app/hooks/report/use-update-report.ts
"use client";

import { updateReportAsync } from "@/app/services/report/report-service";
import { toast } from "@/hooks/use-toast";
import IReport from "@/types/report/ireport";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUpdateReport = () => {
    const queryClient = useQueryClient();
    return useMutation<IReport, AxiosError<{message: string}>, IReport>({
        mutationFn: updateReportAsync,
        onSuccess: (updatedReport: IReport) => {
            toast({ title: "Updated", description: "Report updated successfully." });
            queryClient.setQueryData<IReport[]>(["reports"], (reports) => reports?.map((report) => report.id === updatedReport.id ? updatedReport : report) || []);
        },
        onError: (error: AxiosError<{message: string}>) => {
            toast({ title: "Error", description: error.response?.data?.message });
        }
    });
};

export default useUpdateReport;