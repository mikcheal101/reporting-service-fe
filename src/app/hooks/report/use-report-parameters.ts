// app/hooks/report/use-report-parameters.ts
"use client";

import { fetchReportParametersAsync } from "@/app/services/report/report-service";
import IQueryParameter from "@/types/report/iquery-parameter";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useReportParameters = (id: number) => (useQuery<IQueryParameter[], Error>({
    queryKey: [QUERY_KEYS.REPORT_PARAMETERS, id],
    queryFn: () => fetchReportParametersAsync(id!),
    enabled: !!id,
    retry: 2
}));

export default useReportParameters;