// components/report/report-page-toolbar.tsx
"use client";

import { FaList, FaThLarge } from "react-icons/fa";

type ReportPageToolBarProps = {
  viewMode: "list" | "grid";
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "grid">>;
};

const ReportPageToolBar = ({
  viewMode,
  setViewMode,
}: ReportPageToolBarProps) => (
  <div className="flex items-center">
    <h2 className="text-2xl font-bold text-gray-700 mb-6">Reports</h2>
    <div className="flex justify-end ml-auto space-x-3 p-2">
      <button
        onClick={() => setViewMode("list")}
        className={`p-2 rounded flex gap-2 items-center ${
          viewMode === "list"
            ? "bg-[#EAB308] text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        <FaList className="text-lg" />
        List
      </button>
      <button
        onClick={() => setViewMode("grid")}
        className={`p-2 rounded flex gap-2 items-center ${
          viewMode === "grid"
            ? "bg-[#EAB308] text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        <FaThLarge className="text-lg" />
        Grid
      </button>
    </div>
  </div>
);

export default ReportPageToolBar;
