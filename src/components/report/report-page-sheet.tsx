// components/report/report-page-sheet.tsx
"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
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
    <SheetContent className="w-[30%]">
      <SheetHeader>
        <SheetTitle>Edit Report</SheetTitle>
        <SheetDescription>
          Update the details of the report below.
        </SheetDescription>
      </SheetHeader>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          value={currentReport?.name || ""}
          onChange={(e) =>
            setCurrentReport((prev) =>
              prev ? { ...prev, name: e.target.value } : prev
            )
          }
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          value={currentReport?.description || ""}
          onChange={(e) =>
            setCurrentReport((prev) =>
              prev ? { ...prev, description: e.target.value } : prev
            )
          }
        />
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleUpdateReport}
          className="px-4 py-2 text-sm font-medium text-white bg-[#EAB308] rounded hover:bg-amber-400"
        >
          Update
        </button>
      </div>
    </SheetContent>
  </Sheet>
);

export default ReportPageSheet;
