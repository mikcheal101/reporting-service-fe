// app/hooks/report/use-schedule-report.ts
"use client";

import { scheduleReportAsync } from "@/app/services/report/report-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import IScheduleReport from "@/types/report/ischedule-report";
import { AxiosError } from "axios";

const useScheduleReport = () => {
    const queryClient = useQueryClient();
    return useMutation<boolean, AxiosError<{ message: string}>, IScheduleReport>({
        mutationFn: scheduleReportAsync,
        onSuccess: (scheduledReport: boolean) => {
            if (scheduledReport)
                toast({ title: "Report scheduled successfully!", description: "You will be notified when report is ready" });
            else 
                toast({ title: "Failed to schedule report", description: "Report is not scheduled" });
        },
        onError: (error: AxiosError<{ message: string}>) => {
            toast({ title: "Failed to schedule report", description: `Error: ${error.response?.data?.message}` });
        },
    });
};

export default useScheduleReport;