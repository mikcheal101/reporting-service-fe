// app/(pages)/report/report.tsx
"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import useReportTable from "@/app/hooks/report/use-report-table";
import ReportPageToolBar from "@/components/report/report-page-toolbar";
import ReportPageSheet from "@/components/report/report-page-sheet";
import ReportSheetTable from "@/components/report/report-page-table";
import ReportPageGrid from "@/components/report/report-page-grid";
import ReportPagePagination from "@/components/report/report-page-pagination";
import { Button } from "@/components/ui/button";

const Report: React.FC = () => {
  const {
    AddReports,
    setViewMode,
    viewMode,
    setSheetOpen,
    isSheetOpen,
    handleUpdateReport,
    isReportLoading,
    reports,
    paginatedReports,
    fetchReportDetails,
    fetchReportingParams,
    handleScheduleReport,
    handleDeleteReport,
    totalPages,
    deleteId,
    setDeleteId,
    isAlertOpen,
    showDeleteDialog,
    setShowDeleteDialog,
    currentPage,
    setCurrentPage,
    cancelScheduleReport,
    confirmScheduleReport,
    currentReport,
    setCurrentReport,
    currentReportId,
  } = useReportTable();

  return (
    <div className="mt-0 p-0">
      <div className="flex justify-end mb-2 space-x-4">
        <Button
            onClick={AddReports}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Report
          </Button>
      </div>

      <div className="p-6 bg-card shadow-lg rounded-lg border border-border">
        <ReportPageToolBar viewMode={viewMode} setViewMode={setViewMode} />
        <div>
          <ReportPageSheet
            isSheetOpen={isSheetOpen}
            setSheetOpen={setSheetOpen}
            currentReport={currentReport}
            setCurrentReport={setCurrentReport}
            handleUpdateReport={handleUpdateReport}
          />
        </div>

        {isReportLoading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-6 w-full rounded-lg" />
            ))}
          </div>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No reports available.</p>
        ) : viewMode === "list" ? (
          <ReportSheetTable
            deleteId={deleteId}
            handleDeleteReport={handleDeleteReport}
            paginatedReports={paginatedReports}
            fetchReportDetails={fetchReportDetails}
            fetchReportingParams={fetchReportingParams}
            handleScheduleReport={handleScheduleReport}
            isAlertOpen={isAlertOpen}
            setDeleteId={setDeleteId}
            cancelScheduleReport={cancelScheduleReport}
            confirmScheduleReport={confirmScheduleReport}
          />
        ) : (
          <ReportPageGrid
            paginatedReports={paginatedReports}
            fetchReportDetails={fetchReportDetails}
            fetchReportingParams={fetchReportingParams}
            handleScheduleReport={handleScheduleReport}
            currentReportId={currentReportId}
            deleteId={deleteId}
            handleDeleteReport={handleDeleteReport}
            setDeleteId={setDeleteId}
            showDeleteDialog={showDeleteDialog}
            setShowDeleteDialog={setShowDeleteDialog}
          />
        )}
      </div>
      <ReportPagePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Report;
