// app/hooks/report/scheduled-report/use-fetch-pending-reports.ts
"use client";

import { fetchPendingReportsAsync } from "@/app/services/report/report-service";
import IScheduledReport from "@/types/report/ischeduled-report";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "../../../constants/query-keys.constant";

const useFetchPendingReports = () => (useQuery<IScheduledReport[], AxiosError>({
    queryKey: [QUERY_KEYS.PENDING_REPORTS],
    queryFn: fetchPendingReportsAsync,
    retry: 3,
}));

export default useFetchPendingReports;