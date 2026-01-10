// app/hooks/report-type/use-update-report-type
"use client";

import { updateReportTypeAsync } from "@/app/services/report-type/report-type-service";
import { toast } from "@/hooks/use-toast";
import IReportType from "@/types/report-type/ireport-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUpdateReportType = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IReportType, AxiosError<{message: string}>, IReportType>({
    mutationFn: updateReportTypeAsync,
    onSuccess: (updatedReportType: IReportType) => {
      toast({ title: "Success", description: "Report type updated successfully!" });

      queryClient.setQueryData<IReportType[]>(['report-types'], (oldData) => oldData?.map((reportType) => reportType.id === updatedReportType.id ? updatedReportType : reportType) || []);  
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({
        title: "Error",
        description: error.response?.data?.message,
      });
    }
  });

  return mutation;
};

export default useUpdateReportType;