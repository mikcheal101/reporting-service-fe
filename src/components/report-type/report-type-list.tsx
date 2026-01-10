// components/report-type/report-type-list.tsx
"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import ReportTypeListProps from "@/types/components/report-type/report-type-list";

const ReportTypeList = ({ reportTypes, handleEditReportType, setIsOpen, setDeleteId, deleteId, handleDelete, mapOutputType, mapFrequency }: ReportTypeListProps) => (
  <div className="overflow-x-auto">
    <table className="w-full border border-gray-200 min-w-[600px]">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
            Name
          </th>
          <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
            Output Type
          </th>
          <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm">
            Frequency
          </th>
          <th className="px-2 sm:px-4 py-2 text-right text-xs sm:text-sm">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {reportTypes.length > 0 ? (
          reportTypes.map((reportType) => (
            <tr key={reportType.id} className="border-t">
              <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                {reportType.name}
              </td>
              <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                {mapOutputType(reportType.outputType)}
              </td>
              <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                {mapFrequency(reportType.frequency)}
              </td>
              <td className="px-2 sm:px-4 py-2 text-right">
                <div className="flex flex-col sm:flex-row justify-end space-y-1 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => {
                      handleEditReportType(reportType);
                      setIsOpen(true);
                    }}
                    className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
                  >
                    <FaEdit className="mr-1" />{" "}
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        onClick={() => setDeleteId(reportType.id)}
                        className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 bg-[#FFA500] text-white text-xs font-medium rounded transition"
                      >
                        <FaTrash className="mr-1" />{" "}
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this report type? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500"
                          onClick={() => deleteId && handleDelete(deleteId)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center py-4 text-sm">
              No report types available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ReportTypeList;
