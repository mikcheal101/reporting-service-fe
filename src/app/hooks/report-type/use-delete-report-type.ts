// app/hooks/report-type
"use client";

import { deleteReportTypeAsync } from "@/app/services/report-type/report-type-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useDeleteReportType = () => {
  const queryClient = useQueryClient();
  return useMutation<boolean, AxiosError<{message: string}>, string>({
    mutationFn: deleteReportTypeAsync,
    onSuccess: () => {
      toast({
        title: "Report type deleted successfully!",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPORT_TYPES] });
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({ title: TOAST_TITLES.FAILED_TO_DELETE_REPORT_TYPE, description: error.response?.data?.message || "Something went wrong. Please try again.", variant: "destructive"});
    },
  });
};

export default useDeleteReportType;