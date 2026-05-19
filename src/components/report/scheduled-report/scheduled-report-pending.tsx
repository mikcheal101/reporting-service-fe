"use client";

import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import mapDownloadRequestStatus from "@/app/utils/map-download-request-status";
import IScheduledReport from "@/types/report/ischeduled-report";

type ScheduledReportPendingProps = {
  loading: boolean;
  scheduledPendingReports: IScheduledReport[];
};

const badgeByStatus = (status: number) => {
  switch (status) {
    case 0:
      return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100";
    case 1:
      return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100";
    case 2:
      return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
    default:
      return "";
  }
};

const TableSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} className="h-12 w-full rounded-lg" />
    ))}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16">
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-4">
      <Clock className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">No pending reports</h3>
    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
      All requested reports have been processed. Pending items will appear here.
    </p>
  </div>
);

const ScheduledReportPending = ({ loading, scheduledPendingReports }: ScheduledReportPendingProps) => (
  <TabsContent value="tab2" className="mt-0">
    <div className="bg-card shadow-lg rounded-lg border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Pending Reports</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Reports that are still being generated.
        </p>
      </div>

      <div className="p-6">
        {loading ? (
          <TableSkeleton />
        ) : scheduledPendingReports.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Requested</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {scheduledPendingReports.map((report) => (
                  <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900 dark:text-gray-100">
                      <span className="truncate max-w-[160px] block" title={report.report?.name}>
                        {report.report?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">
                      <span className="truncate max-w-[200px] block" title={report.report?.description}>
                        {report.report?.description || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
                      {report.createdAt
                        ? new Date(report.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge className={`${badgeByStatus(Number(report.status))} text-xs`}>
                        {mapDownloadRequestStatus(Number(report.status))}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </TabsContent>
);

export default ScheduledReportPending;
