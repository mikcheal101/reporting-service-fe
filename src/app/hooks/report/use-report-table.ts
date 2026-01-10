// app/hooks/report/use-report-table.ts
"use client";

import { useEffect, useState } from "react";
import useDeleteReport from "./use-delete-report";
import useUpdateReport from "./use-update-report";
import IReport from "@/types/report/ireport";
import useReportParameters from "./use-report-parameters";
import useScheduleReport from "./use-schedule-report";
import useFetchReport from "./use-fetch-report";
import { useRouter } from "next/navigation";
import useFetchReports from "./use-fetch-reports";

const useReportTable = () => {
    const router = useRouter();

    // Drawer sheet
    const [isSheetOpen, setSheetOpen] = useState(false);

    // Currently selected report ids
    const [currentReport, setCurrentReport] = useState<IReport | null>(null);
    const [currentReportId, setCurrentReportId] = useState<number | undefined>();
    const [currentParamReportId, setCurrentParamReportId] = useState<number | undefined>();

    // Queries
    const { data: reports = [], isLoading: isReportLoading } = useFetchReports();
    const { data: fetchedReport } = useFetchReport(currentReportId || 0);
    const { data: reportParameters } = useReportParameters(currentParamReportId || 0);

    // Mutations
    const { mutate: updateReport } = useUpdateReport();
    const { mutate: deleteReport } = useDeleteReport();
    const { mutate: scheduleReport } = useScheduleReport();

    // View mode
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    // Alerts
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const totalPages = Math.ceil(reports.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedReports = reports?.slice(startIndex, startIndex + itemsPerPage) || [];

    useEffect(() => {
        setCurrentReport(fetchedReport || null);
    }, [fetchedReport]);


    // Actions
    const handleUpdateReport = () => {
        if (currentReport) {
            updateReport(currentReport as IReport, {
                onSuccess: () => setSheetOpen(false),
            });
        }
    }

    const confirmScheduleReport = () => {
        if (currentReport?.id) {
            scheduleReport({
                reportId: Number.parseInt(currentReport?.id),
                generateNow: true,
            });
            setIsAlertOpen(false);
        }
    };

    const fetchReportDetails = (report: IReport) => {
        setCurrentReport(report);
        setCurrentReportId(Number.parseInt(report.id));
        setSheetOpen(true);
    };

    const fetchReportingParams = (id: string) => {
        setCurrentParamReportId(Number.parseInt(id));
        router.push(`/report/report-details/${id}`);
    };

    const handleScheduleReport = (report: IReport) => {
        scheduleReport({
            reportId: Number.parseInt(report?.id || ''),
            generateNow: true,
        });
    };

    const handleDeleteReport = (id: string) => {
        deleteReport(Number.parseInt(id));
    };

    const cancelScheduleReport = () => {
        setIsAlertOpen(false);
    };

    const AddReports = () => router.push("/report/report-details");


    return {
        AddReports,
        viewMode,
        setViewMode,
        isSheetOpen,
        setSheetOpen,
        totalPages,
        isReportLoading,
        isAlertOpen,
        setIsAlertOpen,
        deleteId,
        setDeleteId,
        showDeleteDialog,
        setShowDeleteDialog,
        currentPage,
        setCurrentPage,

        handleUpdateReport,
        handleScheduleReport,
        handleDeleteReport,
        fetchReportDetails,
        fetchReportingParams,
        cancelScheduleReport,
        confirmScheduleReport,

        reports,
        currentReport,
        currentReportId,
        setCurrentReport,
        paginatedReports,
    };
};

export default useReportTable;