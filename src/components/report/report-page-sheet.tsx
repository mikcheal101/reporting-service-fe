// components/report/report-page-sheet.tsx
"use client";

import React from "react";
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
import IReport from "@/types/report/ireport";

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
}: ReportPageSheetProps) => (
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
        <Button onClick={handleUpdateReport}>
          Update
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default ReportPageSheet;
