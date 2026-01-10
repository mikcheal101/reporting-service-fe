// app/hooks/report/use-report-parameters.ts
"use client";

import { fetchReportParametersAsync } from "@/app/services/report/report-service";
import IQueryParameter from "@/types/report/iquery-parameter";
import { useQuery } from "@tanstack/react-query";

const useReportParameters = (id: number) => (useQuery<IQueryParameter[], Error>({
    queryKey: ["report-parameters"],
    queryFn: () => fetchReportParametersAsync(id!),
    enabled: !!id,
    retry: 2
}));

export default useReportParameters;