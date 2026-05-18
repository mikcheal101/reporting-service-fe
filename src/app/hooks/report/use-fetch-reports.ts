// app/hooks/report/use-fetch-reports.ts
"use client";

import { fetchReportsAsync } from "@/app/services/report/report-service";
import IReport from "@/types/report/ireport";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useFetchReports = () => (useQuery<IReport[], Error>({
  queryKey: [QUERY_KEYS.REPORTS],
  queryFn: fetchReportsAsync,
  retry: 2,
}));

export default useFetchReports;