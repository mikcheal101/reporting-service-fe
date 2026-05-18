"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Save, Loader2 } from "lucide-react";
import IReport from "@/types/report/ireport";
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

type ReportPageSheetProps = {
  isSheetOpen: boolean;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentReport: IReport | null;
  setCurrentReport: React.Dispatch<React.SetStateAction<IReport | null>>;
  handleUpdateReport: () => void;
};

const ReportPageSheet = ({
  isSheetOpen,
  setSheetOpen,
  currentReport,
  setCurrentReport,
  handleUpdateReport,
}: ReportPageSheetProps) => {
  const [isPending, setIsPending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdateClick = () => {
    setShowConfirm(true);
  };

  const confirmUpdate = async () => {
    setIsPending(true);
    try {
      await handleUpdateReport();
      setShowConfirm(false);
      setSheetOpen(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
    <SheetContent className="w-full sm:max-w-[480px]">
      <SheetHeader>
        <SheetTitle>Edit Report</SheetTitle>
        <SheetDescription>
          Update the details of the report below.
        </SheetDescription>
      </SheetHeader>
      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-name">Name</Label>
          <Input
            id="edit-name"
            value={currentReport?.name || ""}
            onChange={(e) =>
              setCurrentReport((prev) =>
                prev ? { ...prev, name: e.target.value } : prev
              )
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-description">Description</Label>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={currentReport?.description || ""}
            onChange={(e) =>
              setCurrentReport((prev) =>
                prev ? { ...prev, description: e.target.value } : prev
              )
            }
          />
        </div>
      </div>
      <SheetFooter className="mt-6">
        <Button onClick={handleUpdateClick} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Update
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
    <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Update</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to update this report? Please verify all fields are correct.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmUpdate} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Update
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default ReportPageSheet;
