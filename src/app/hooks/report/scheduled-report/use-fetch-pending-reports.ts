// app/hooks/report/scheduled-report/use-fetch-pending-reports.ts
"use client";

import { fetchPendingReportsAsync } from "@/app/services/report/report-service";
import IScheduledReport from "@/types/report/ischeduled-report";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useFetchPendingReports = () => (useQuery<IScheduledReport[], AxiosError>({
    queryKey: ["pending-reports"],
    queryFn: fetchPendingReportsAsync,
    retry: 3,
}));

export default useFetchPendingReports;