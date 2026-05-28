"use client";

import { fetchScheduledTasksAsync } from "@/app/services/report/report-service";
import IScheduledReport from "@/types/report/ischeduled-report";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "../../../constants/query-keys.constant";

const useFetchScheduledReports = () => (useQuery<IScheduledReport[], AxiosError>({
    queryKey: [QUERY_KEYS.SCHEDULED_TASKS],
    queryFn: fetchScheduledTasksAsync,
    retry: 3,
}));

export default useFetchScheduledReports;
