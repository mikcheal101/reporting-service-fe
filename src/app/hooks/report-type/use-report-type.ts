// app/hooks/report-type/use-report-type.ts
"use client";

import { fetchReportTypesAsync } from "@/app/services/report-type/report-type-service";
import IReportType from "@/types/report-type/ireport-type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useReportType = () => (useQuery<IReportType[], Error>({
  queryKey: [QUERY_KEYS.REPORT_TYPES],
  queryFn: fetchReportTypesAsync,
  retry: 2,
}));

export default useReportType;