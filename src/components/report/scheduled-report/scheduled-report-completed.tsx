// components/report/scheduled-report/scheduled-report-completed.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import IScheduledReport from "@/types/report/ischeduled-report";
import { FaDownload } from "react-icons/fa";

type ScheduledReportCompletedProps = {
    loading: boolean;
    scheduledReports: IScheduledReport[];
    handleDownload: (downloadPath: string) => void;
    goToPrevPage: () => void;
    currentPage: number;
    totalPages: number;
    goToNextPage: () => void;
};

const ScheduledReportCompleted = ({ loading, scheduledReports, handleDownload, goToPrevPage, currentPage, totalPages, goToNextPage  }: ScheduledReportCompletedProps) => (
  <TabsContent value="tab1">
    <Card className="shadow-md">
      <div className="flex">
        <CardHeader className="p-3 sm:p-6">
          <h5 className="text-sm sm:text-base font-medium">
            These is the list of completed reports ready for download.
          </h5>
          <h6 className="text-xs sm:text-sm text-gray-600">
            Click the download to get your file.
          </h6>
        </CardHeader>
      </div>
      <CardContent className="p-2 sm:p-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-6 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-xs sm:text-sm text-left text-gray-600">
                <thead>
                  <tr className="bg-gray-500 border-b border-gray-300 text-white">
                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">
                      Name
                    </th>
                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm hidden sm:table-cell">
                      Description
                    </th>
                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">
                      Request Date
                    </th>
                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm hidden md:table-cell">
                      Generate Date
                    </th>
                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">
                      Status
                    </th>
                    <th className="px-1 sm:px-2 py-2 text-xs sm:text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledReports.map((scheduledReport) => (
                    <tr key={scheduledReport.id} className="border-b">
                      <td className="px-1 sm:px-2 py-2 text-xs sm:text-sm">
                        <div
                          className="truncate max-w-[120px] sm:max-w-none"
                          title={scheduledReport.name}
                        >
                          {scheduledReport.name || ""}
                        </div>
                      </td>
                      <td className="px-1 sm:px-2 py-2 text-xs sm:text-sm hidden sm:table-cell">
                        <div
                          className="truncate max-w-[150px]"
                          title={scheduledReport.report.description}
                        >
                          {scheduledReport.report.description || ""}
                        </div>
                      </td>
                      <td className="px-1 sm:px-2 py-2 text-xs sm:text-sm">
                        <div className="text-xs">
                          {new Date(
                            scheduledReport.report.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-1 sm:px-2 py-2 text-xs sm:text-sm hidden md:table-cell">
                        <div className="text-xs">
                          {new Date(
                            scheduledReport.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-1 sm:px-2 py-2">
                        <Badge
                          variant="default"
                          className="bg-green-800 items-center text-[9px] sm:text-[11px] px-1 sm:px-2 py-1 rounded-xl"
                        >
                          <span className="hidden sm:inline">
                            {scheduledReport.status}
                          </span>
                          <span className="sm:hidden">Done</span>
                        </Badge>
                      </td>
                      <td className="px-1 sm:px-2 py-2">
                        <button
                          onClick={() => handleDownload(scheduledReport.id) }
                          className="flex items-center px-1 sm:px-2 py-1 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
                        >
                          <FaDownload className="mr-1 text-xs" />
                          <span className="hidden sm:inline">Download</span>
                          <span className="sm:hidden">DL</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-2 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 text-xs sm:text-sm w-full sm:w-auto"
              >
                Previous
              </button>
              <span className="text-xs sm:text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 text-xs sm:text-sm w-full sm:w-auto"
              >
                Next
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  </TabsContent>
);

export default ScheduledReportCompleted;
