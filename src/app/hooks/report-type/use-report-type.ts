// app/hooks/report-type/use-report-type.ts
"use client";

import { fetchReportTypesAsync } from "@/app/services/report-type/report-type-service";
import IReportType from "@/types/report-type/ireport-type";
import { useQuery } from "@tanstack/react-query";

const useReportType = () => (useQuery<IReportType[], Error>({
  queryKey: ["report-types"],
  queryFn: fetchReportTypesAsync,
  retry: 2,
}));

export default useReportType;