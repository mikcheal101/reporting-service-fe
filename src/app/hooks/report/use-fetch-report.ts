// app/hooks/report/use-fetch-report.ts
"use client";

import { fetchReportAsync } from "@/app/services/report/report-service";
import IReport from "@/types/report/ireport";
import { useQuery } from "@tanstack/react-query";

const useFetchReport = (id: number) => useQuery<IReport, Error>({
    queryKey: ['report', id],
    queryFn: () => fetchReportAsync(id),
    enabled: !!id,
    retry: 2,
});

export default useFetchReport;