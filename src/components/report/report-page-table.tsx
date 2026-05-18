// components/report/report-page-table.tsx
"use client";

import { Calendar, Pencil, PenLine, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import CustomAlertDialog from "../ModalComponent";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import IReport from "@/types/report/ireport";

type ReportSheetTableProps = {
  deleteId: string | null;
  handleDeleteReport: (reportId: string) => void;
  paginatedReports: IReport[];
  fetchReportDetails: (report: IReport) => void;
  fetchReportingParams: (reportId: string) => void;
  handleScheduleReport: (report: IReport) => void;
  isAlertOpen: boolean;
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
  cancelScheduleReport: () => void;
  confirmScheduleReport: () => void;
};

const ReportSheetTable = ({
  paginatedReports,
  fetchReportDetails,
  fetchReportingParams,
  handleScheduleReport,
  isAlertOpen,
  setDeleteId,
  cancelScheduleReport,
  confirmScheduleReport,
  deleteId,
  handleDeleteReport,
}: ReportSheetTableProps) => (
  <table className="w-full text-sm text-left text-gray-600">
    <thead>
      <tr className="bg-gray-100 border-b border-gray-300">
        <th className="px-4 py-3">Name</th>
        <th className="px-4 py-3">Description</th>
        <th className="px-4 py-3 text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      {paginatedReports.map((report) => (
        <tr key={report.id} className="border-b">
          <td className="px-4 py-3">{report.name}</td>
          <td className="px-4 py-3">{report.description}</td>
          <td className="px-4 py-3 text-right">
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchReportDetails(report)}
              >
                <Pencil className="mr-1 h-3 w-3" />
                Edit Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchReportingParams(report.id)}
              >
                <PenLine className="mr-1 h-3 w-3" />
                Edit Query
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleScheduleReport(report)}
              >
                <Calendar className="mr-1 h-3 w-3" />
                Schedule
              </Button>
              <CustomAlertDialog
                isOpen={isAlertOpen}
                onClose={cancelScheduleReport}
                onConfirm={confirmScheduleReport}
              />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(report.id)}
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone and will permanently delete
                      the report.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteId && handleDeleteReport(deleteId)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ReportSheetTable;
