// app/hooks/report-type
"use client";

import { deleteReportTypeAsync } from "@/app/services/report-type/report-type-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteReportType = () => {
  const queryClient = useQueryClient();
  return useMutation<boolean, AxiosError<{message: string}>, string>({
    mutationFn: deleteReportTypeAsync,
    onSuccess: () => {
      toast({
        title: "Report type deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['report-types'] });
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({ title: "Failed to delete report type", description: `Error: ${error.response?.data?.message}`});
    },
  });
};

export default useDeleteReportType;