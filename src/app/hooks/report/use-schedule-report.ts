// app/hooks/report/use-schedule-report.ts
"use client";

import { scheduleReportAsync } from "@/app/services/report/report-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import IScheduleReport from "@/types/report/ischedule-report";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";

const useScheduleReport = () => {
    const queryClient = useQueryClient();
    return useMutation<boolean, AxiosError<{ message: string}>, IScheduleReport>({
        mutationFn: scheduleReportAsync,
        onSuccess: (scheduledReport: boolean) => {
            if (scheduledReport)
                toast({ title: "Report scheduled successfully!", description: "You will be notified when report is ready", variant: "success" });
            else 
                toast({ title: TOAST_TITLES.FAILED_TO_SCHEDULE_REPORT, description: "Report is not scheduled", variant: "destructive" });
        },
        onError: (error: AxiosError<{ message: string}>) => {
            toast({ title: TOAST_TITLES.FAILED_TO_SCHEDULE_REPORT, description: error.response?.data?.message || "Something went wrong. Please try again.", variant: "destructive" });
        },
    });
};

export default useScheduleReport;