import React from "react";
import { FaEdit, FaTrash, FaCalendarAlt, FaPencilAlt } from "react-icons/fa";
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
} from "@/components/ui/alert-dialog";
import useReportGridCard from "../hooks/use-report-grid-card";

interface ReportProps {
  name: string;
  description: string;
  reportDeleteId: string;
  onEdit: () => void;
  onEditQuery: () => void;
  onSchedule: () => void;
  onDelete: () => void;
}

const ReportGridCard: React.FC<ReportProps> = ({
  name,
  description,
  onEdit,
  onEditQuery,
  onSchedule,
  onDelete,
  reportDeleteId,
}) => {
  const {
    isMenuOpen,
    toggleMenu,
    handleDeleteReport,
  } = useReportGridCard();

  return (
    <div className="relative bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow border-l-4 border-[#EAB308]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            <span className="text-[#EAB308]">•</span> {name}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="relative">
          <button
            className="text-gray-500 hover:text-[#EAB308]"
            onClick={toggleMenu}
          >
            •••
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-0 w-[125px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                className="flex gap-1 block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#FFF7E0]"
                onClick={() => {
                  toggleMenu();
                  onEdit();
                }}
              >
                <FaEdit /> Edit Report
              </button>
              <button
                className="flex gap-1 block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#FFF7E0]"
                onClick={() => {
                  toggleMenu();
                  onEditQuery();
                }}
              >
                <FaPencilAlt /> Edit Query
              </button>
              <button
                className="flex gap-1 block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#FFF7E0]"
                onClick={() => {
                  toggleMenu();
                  onSchedule();
                }}
              >
                <FaCalendarAlt />
                Schedule
              </button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className="flex gap-1 block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    onClick={() => onDelete()}
                  >
                    <FaTrash /> Delete
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
                      onClick={() => handleDeleteReport(reportDeleteId)}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGridCard;
