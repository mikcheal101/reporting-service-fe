// app/hooks/report-type/use-save-report-type
"use client";

import { saveReportTypeAsync } from "@/app/services/report-type/report-type-service";
import { toast } from "@/hooks/use-toast";
import IReportType from "@/types/report-type/ireport-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useSaveReportType = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<IReportType, AxiosError<{message: string}>, IReportType>({
    mutationFn: saveReportTypeAsync,
    onSuccess: (newReportType: IReportType) => {
      toast({ title: "Success", description: "Report type saved successfully!" });

      queryClient.setQueryData<IReportType[]>(['report-types'], (reportTypes) => [...(reportTypes || []), newReportType]);
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({
        title: "Error",
        description: error.response?.data?.message,
      });
    },
  });

  return mutation;
};

export default useSaveReportType;