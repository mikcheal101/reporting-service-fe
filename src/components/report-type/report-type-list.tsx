"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import ReportTypeListProps from "@/types/components/report-type/report-type-list";

const ReportTypeList = ({ reportTypes, handleEditReportType, setIsOpen, setDeleteId, deleteId, handleDelete, mapOutputType, mapFrequency }: ReportTypeListProps) => (
  <table className="w-full text-sm text-left text-gray-600">
    <thead>
      <tr className="bg-gray-100 border-b border-gray-300">
        <th className="px-4 py-3">Name</th>
        <th className="px-4 py-3">Output Type</th>
        <th className="px-4 py-3">Frequency</th>
        <th className="px-4 py-3 text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      {reportTypes.length > 0 ? (
        reportTypes.map((reportType) => (
          <tr key={reportType.id} className="border-b">
            <td className="px-4 py-3 font-medium text-gray-900">{reportType.name}</td>
            <td className="px-4 py-3">{mapOutputType(reportType.outputType)}</td>
            <td className="px-4 py-3">{mapFrequency(reportType.frequency)}</td>
            <td className="px-4 py-3 text-right">
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleEditReportType(reportType);
                    setIsOpen(true);
                  }}
                >
                  <Pencil className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(reportType.id)}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
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
          <td colSpan={4} className="text-center py-8 text-sm text-gray-500">
            No report types available
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default ReportTypeList;
