// app/hooks/report/use-delete-report.ts
"use client";

import { deleteReportAsync } from "@/app/services/report/report-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteReport = () => {
    const queryClient = useQueryClient();
    return useMutation<boolean, AxiosError<{message: string}>, number>({
        mutationFn: deleteReportAsync,
        onSuccess: () => {
            toast({ title: "Deleted", description: "Report deleted successfully." });
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
        onError: (error: AxiosError<{message: string}>) => {
            toast({ title: "Error", description: error.response?.data?.message || error.message });
        }
    });
};

export default useDeleteReport;