"use client";

import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import IScheduledReport from "@/types/report/ischeduled-report";

type ScheduledReportCompletedProps = {
  loading: boolean;
  scheduledReports: IScheduledReport[];
  handleDownload: (id: string) => void;
  goToPrevPage: () => void;
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
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
      <Download className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="text-base font-semibold text-gray-700 mb-1">No completed reports</h3>
    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
      Completed reports will appear here once they are ready for download.
    </p>
  </div>
);

const ScheduledReportCompleted = ({
  loading,
  scheduledReports,
  handleDownload,
  goToPrevPage,
  currentPage,
  totalPages,
  goToNextPage,
}: ScheduledReportCompletedProps) => (
  <TabsContent value="tab1" className="mt-0">
    <div className="bg-card shadow-lg rounded-lg border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-gray-800">Completed Reports</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Download your generated reports below.
        </p>
      </div>

      <div className="p-6">
        {loading ? (
          <TableSkeleton />
        ) : scheduledReports.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="overflow-x-auto -mx-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Requested</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Generated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {scheduledReports.map((report) => (
                    <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3.5 text-sm font-medium text-gray-900">
                        <span className="truncate max-w-[160px] block" title={report.name}>
                          {report.name || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">
                        <span className="truncate max-w-[200px] block" title={report.report?.description}>
                          {report.report?.description || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
                        {report.report?.createdAt
                          ? new Date(report.report.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-muted-foreground whitespace-nowrap hidden md:table-cell">
                        {report.createdAt
                          ? new Date(report.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-xs">
                          Completed
                        </Badge>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(report.id)}
                          className="gap-1.5"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  </TabsContent>
);

export default ScheduledReportCompleted;
