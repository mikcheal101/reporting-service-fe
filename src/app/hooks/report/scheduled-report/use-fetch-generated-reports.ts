// app/hooks/report/scheduled-report/use-fetch-generated-reports.ts
"use client";

import { fetchGeneratedReportsAsync } from "@/app/services/report/report-service";
import IScheduledReport from "@/types/report/ischeduled-report";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useFetchGeneratedReports = () => (useQuery<IScheduledReport[], AxiosError>({
    queryKey: ["generated-reports"],
    queryFn: fetchGeneratedReportsAsync,
    retry: 3,
}));

export default useFetchGeneratedReports;
