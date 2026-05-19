// components/report/report-page-toolbar.tsx
"use client";

import { List, LayoutGrid } from "lucide-react";
import { Button } from "../ui/button";

type ReportPageToolBarProps = {
  viewMode: "list" | "grid";
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "grid">>;
};

const ReportPageToolBar = ({
  viewMode,
  setViewMode,
}: ReportPageToolBarProps) => (
  <div className="flex items-center">
    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6">Reports</h2>
    <div className="flex justify-end ml-auto space-x-2">
      <Button
        variant={viewMode === "list" ? "default" : "secondary"}
        size="sm"
        onClick={() => setViewMode("list")}
      >
        <List className="mr-1 h-4 w-4" />
        List
      </Button>
      <Button
        variant={viewMode === "grid" ? "default" : "secondary"}
        size="sm"
        onClick={() => setViewMode("grid")}
      >
        <LayoutGrid className="mr-1 h-4 w-4" />
        Grid
      </Button>
    </div>
  </div>
);

export default ReportPageToolBar;
