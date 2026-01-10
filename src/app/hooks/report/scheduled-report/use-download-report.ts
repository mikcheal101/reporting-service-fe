// app/hooks/report/scheduled-report/use-download-report.ts
"use client";

import { downloadReportAsync } from "@/app/services/report/report-service";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDownloadReport = () => (useMutation<{ blob: Blob; filename: string; }, AxiosError<{ message: string }>, string>({
    mutationFn: downloadReportAsync,
    onSuccess: (data) => {
        const url = window.URL.createObjectURL(data.blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', data.filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    },
    onError: (error: AxiosError<{ message: string }>) => {
        toast({
            title: 'Download failed',
            description: error.response?.data?.message || 'Download failed',
        });
    },
}));

export default useDownloadReport;