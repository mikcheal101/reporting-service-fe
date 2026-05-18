// app/hooks/report-type/use-update-report-type
"use client";

import { updateReportTypeAsync } from "@/app/services/report-type/report-type-service";
import { toast } from "@/hooks/use-toast";
import IReportType from "@/types/report-type/ireport-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useUpdateReportType = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IReportType, AxiosError<{message: string}>, IReportType>({
    mutationFn: updateReportTypeAsync,
    onSuccess: (updatedReportType: IReportType) => {
      toast({ title: TOAST_TITLES.SUCCESS, description: "Report type updated successfully!", variant: "success" });

      queryClient.setQueryData<IReportType[]>([QUERY_KEYS.REPORT_TYPES], (oldData) => oldData?.map((reportType) => reportType.id === updatedReportType.id ? updatedReportType : reportType) || []);  
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({
        title: TOAST_TITLES.ERROR,
        description: error.response?.data?.message || "Failed to update report type. Please try again.",
        variant: "destructive",
      });
    }
  });

  return mutation;
};

export default useUpdateReportType;