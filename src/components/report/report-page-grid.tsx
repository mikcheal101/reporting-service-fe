// components/report/report-page-grid.tsx
"use client";

import ReportGridCard from "@/components/report/report-grid-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import IReport from "@/types/report/ireport";

type ReportPageGridProps = {
  paginatedReports: IReport[];
  fetchReportDetails: (report: IReport) => void;
  fetchReportingParams: (reportId: string) => void;
  handleScheduleReport: (report: IReport) => void;
  currentReportId?: number;
  deleteId: string | null;
  handleDeleteReport: (reportId: string) => void;
  setDeleteId: (reportId: string) => void;
  showDeleteDialog: boolean;
  setShowDeleteDialog: (show: boolean) => void;
};

const ReportPageGrid = ({
  paginatedReports,
  fetchReportDetails,
  fetchReportingParams,
  handleScheduleReport,
  currentReportId,
  deleteId,
  handleDeleteReport,
  setDeleteId,
  showDeleteDialog,
  setShowDeleteDialog,
}: ReportPageGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {paginatedReports.map((report) => (
      <ReportGridCard
        key={report.id}
        name={report.name}
        description={report.description}
        onEdit={() => fetchReportDetails(report)}
        onEditQuery={() => fetchReportingParams(report.id)}
        onSchedule={() => handleScheduleReport(report)}
        reportDeleteId={`${currentReportId}`}
        onDelete={() => {
          setDeleteId(report.id);
          setShowDeleteDialog(true);
        }}
      />
    ))}
    {showDeleteDialog && (
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and will permanently delete the
              report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteId && handleDeleteReport(deleteId); // Proceed with deletion
                setShowDeleteDialog(false); // Close the dialog
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )}
  </div>
);

export default ReportPageGrid;
