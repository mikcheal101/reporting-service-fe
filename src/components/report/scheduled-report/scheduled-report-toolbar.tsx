// components/report/scheduled-report/scheduled-report-toolbar.tsx
"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const ScheduledReportToolBar = () => (
  <TabsList className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mr-auto p-2 rounded-lg w-full sm:w-auto">
    <TabsTrigger
      value="tab1"
      className="inline-flex items-center justify-center rounded-md px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-transparent hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-offset-2 data-[state=active]:bg-[#FFA500] data-[state=active]:text-white w-full sm:w-auto"
    >
      <span className="hidden sm:inline">Completed Scheduled Reports</span>
      <span className="sm:hidden">Completed</span>
    </TabsTrigger>
    <TabsTrigger
      value="tab2"
      className="inline-flex items-center justify-center rounded-md px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-transparent hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-offset-2 data-[state=active]:bg-[#FFA500] data-[state=active]:text-white w-full sm:w-auto"
    >
      <span className="hidden sm:inline">Pending Scheduled Report</span>
      <span className="sm:hidden">Pending</span>
    </TabsTrigger>
  </TabsList>
);

export default ScheduledReportToolBar;
