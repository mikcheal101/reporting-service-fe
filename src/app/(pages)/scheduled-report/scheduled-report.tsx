"use client";

import { FadeIn } from "@/components/ui/fade-in";
import useScheduledReport from "@/app/hooks/report/scheduled-report/use-scheduled-report";
import ScheduledReportCompleted from "@/components/report/scheduled-report/scheduled-report-completed";
import ScheduledReportPending from "@/components/report/scheduled-report/scheduled-report-pending";
import ScheduledReportScheduled from "@/components/report/scheduled-report/scheduled-report-scheduled";
import ScheduledReportToolBar from "@/components/report/scheduled-report/scheduled-report-toolbar";
import { Tabs } from "@/components/ui/tabs";

const ScheduledReport = () => {
  const {
    handleDownload,
    goToPrevPage,
    currentPage,
    totalPages,
    goToNextPage,
    isGeneratedLoading,
    isPendingLoading,
    isScheduledLoading,
    scheduledReports,
    scheduledPendingReports,
    scheduledTasks,
  } = useScheduledReport();

  return (
    <div className="p-4 lg:p-6">
      <FadeIn delay={0} direction="up">
        <Tabs defaultValue="tab1" className="space-y-6">
          <ScheduledReportToolBar />
          <ScheduledReportCompleted
            loading={isGeneratedLoading}
            scheduledReports={scheduledReports || []}
            handleDownload={handleDownload}
            goToPrevPage={goToPrevPage}
            currentPage={currentPage}
            totalPages={totalPages}
            goToNextPage={goToNextPage}
          />
          <ScheduledReportPending
            loading={isPendingLoading}
            scheduledPendingReports={scheduledPendingReports || []}
          />
          <ScheduledReportScheduled
            loading={isScheduledLoading}
            scheduledTasks={scheduledTasks || []}
          />
        </Tabs>
      </FadeIn>
    </div>
  );
};

export default ScheduledReport;
