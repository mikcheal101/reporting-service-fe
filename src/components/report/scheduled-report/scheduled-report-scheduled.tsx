"use client";

import { CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import IScheduledReport from "@/types/report/ischeduled-report";

type ScheduledReportScheduledProps = {
  loading: boolean;
  scheduledTasks: IScheduledReport[];
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
      <CalendarClock className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">No scheduled reports</h3>
    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
      Reports with a future schedule will appear here once they are set up.
    </p>
  </div>
);

const ScheduledReportScheduled = ({ loading, scheduledTasks }: ScheduledReportScheduledProps) => (
  <TabsContent value="tab3" className="mt-0">
    <div className="bg-card shadow-lg rounded-lg border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Scheduled Reports</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Reports that are scheduled to run at a future time.
        </p>
      </div>

      <div className="p-6">
        {loading ? (
          <TableSkeleton />
        ) : scheduledTasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Cron</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {scheduledTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-medium text-gray-900 dark:text-gray-100">
                      <span className="truncate max-w-[160px] block" title={task.report?.name}>
                        {task.report?.name || task.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">
                      <span className="truncate max-w-[200px] block" title={task.report?.description}>
                        {task.report?.description || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-muted-foreground whitespace-nowrap font-mono">
                      {(task as any).cronExpression || "—"}
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-100 text-xs">
                        Scheduled
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

export default ScheduledReportScheduled;
