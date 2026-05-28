"use client";

import { useState } from "react";
import useFetchGeneratedReports from "./use-fetch-generated-reports";
import useFetchPendingReports from "./use-fetch-pending-reports";
import useFetchScheduledReports from "./use-fetch-scheduled-reports";
import useDownloadReport from "./use-download-report";

const useScheduledReport = () => {

    const { mutate: downloadReport } = useDownloadReport();

    const { data: scheduledReports, isLoading: isGeneratedLoading } = useFetchGeneratedReports();
    const { data: scheduledPendingReports, isLoading: isPendingLoading } = useFetchPendingReports();
    const { data: scheduledTasks, isLoading: isScheduledLoading } = useFetchScheduledReports();
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    const totalPages = Math.ceil((scheduledReports?.length || 0) / reportsPerPage);

    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const handleDownload = async (reportId: string) => downloadReport(reportId);

    return {
        handleDownload,
        goToPrevPage,
        currentPage,
        totalPages,
        goToNextPage,

        isGeneratedLoading,
        isPendingLoading,
        isScheduledLoading,

        scheduledReports,
        scheduledPendingReports,
        scheduledTasks,
    }
};

export default useScheduledReport;