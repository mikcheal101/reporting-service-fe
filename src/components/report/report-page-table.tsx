// components/report/report-page-table.tsx
"use client";

import { FaCalendarAlt, FaEdit, FaPencilAlt, FaTrash } from "react-icons/fa";
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
              <button
                onClick={() => fetchReportDetails(report)}
                className="flex items-center px-3 py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
              >
                <FaEdit className="mr-2" />
                Edit Report
              </button>
              <button
                onClick={() => fetchReportingParams(report.id)}
                className="flex items-center px-3 py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
              >
                <FaPencilAlt className="mr-2" />
                Edit Query
              </button>
              <button
                onClick={() => handleScheduleReport(report)}
                className="flex items-center px-3 py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
              >
                <FaCalendarAlt className="mr-2" />
                Schedule
              </button>
              <CustomAlertDialog
                isOpen={isAlertOpen}
                onClose={cancelScheduleReport}
                onConfirm={confirmScheduleReport}
              />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={() => setDeleteId(report.id)}
                    className="flex items-center px-3 py-2 border-[#FFA500] border-2 bg-white text-[#FFA500] text-xs font-medium rounded transition"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
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
                      className="bg-red-500 hover:none"
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
