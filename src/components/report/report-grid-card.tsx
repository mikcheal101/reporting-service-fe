import React from "react";
import { Pencil, PenLine, Calendar, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import usePermission from "@/app/hooks/auth/use-permission";

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

  const { can } = usePermission();
  const canUpdate = can("report", "update");
  const canDelete = can("report", "delete");
  const canCreate = can("report", "create");
  const showActions = canUpdate || canDelete || canCreate;

  return (
    <div className="relative bg-card shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow border-l-4 border-primary">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {showActions && (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={toggleMenu}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-card border border-border rounded-md shadow-lg z-10">
                {canUpdate && (
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent"
                    onClick={() => {
                      toggleMenu();
                      onEdit();
                    }}
                  >
                    <Pencil className="h-3 w-3" /> Edit Report
                  </button>
                )}
                {canUpdate && (
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent"
                    onClick={() => {
                      toggleMenu();
                      onEditQuery();
                    }}
                  >
                    <PenLine className="h-3 w-3" /> Edit Query
                  </button>
                )}
                {canCreate && (
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent"
                    onClick={() => {
                      toggleMenu();
                      onSchedule();
                    }}
                  >
                    <Calendar className="h-3 w-3" /> Schedule
                  </button>
                )}

                {canDelete && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
                        onClick={() => onDelete()}
                      >
                        <Trash2 className="h-3 w-3" /> Delete
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
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGridCard;
