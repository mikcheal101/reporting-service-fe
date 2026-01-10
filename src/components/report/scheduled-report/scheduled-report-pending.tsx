// components/report/scheduled-report/scheduled-report-pending.tsx
"use client";

import mapDownloadRequestStatus from "@/app/utils/map-download-request-status";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import IScheduledReport from "@/types/report/ischeduled-report";

type ScheduledReportPendingProps = {
    loading: boolean;
    scheduledPendingReports: IScheduledReport[];
};

const ScheduledReportPending = ({ loading, scheduledPendingReports }: ScheduledReportPendingProps) => (
  <TabsContent value="tab2">
    {/* Table Configurator content */}
    <Card className="shadow-md">
      <div className="flex">
        <CardHeader className="p-3 sm:p-6">
          <h5 className="text-sm sm:text-base font-medium">
            This shows the list of requested report(s) that is/are not completed
          </h5>
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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-xs sm:text-sm text-left text-gray-600">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm">Name</th>
                  <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">
                    Description
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm">
                    Request Date
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-xs sm:text-sm">
                    Status
                  </th>
                  {/* <th className="px-4 py-3 text-right">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {scheduledPendingReports.map((scheduledReport) => (
                  <tr key={scheduledReport.id} className="border-b">
                    <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm">
                      <div
                        className="truncate max-w-[120px] sm:max-w-none"
                        title={scheduledReport.report.name}
                      >
                        {scheduledReport.report.name || ""}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">
                      <div
                        className="truncate max-w-[150px]"
                        title={scheduledReport.report.description}
                      >
                        {scheduledReport.report.description || ""}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm">
                      <div className="text-xs">
                        {new Date(
                          scheduledReport.createdAt || ""
                        ).toLocaleDateString() || ""}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3">
                      <Badge
                        variant="default"
                        className="text-[9px] sm:text-[11px] px-1 sm:px-2 py-1"
                      >
                        {mapDownloadRequestStatus(
                          Number(scheduledReport.status)
                        )}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  </TabsContent>
);

export default ScheduledReportPending;
