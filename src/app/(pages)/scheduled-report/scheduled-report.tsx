// app/(pages)/scheduled-report/scheduled-report.tsx
import useScheduledReport from "@/app/hooks/report/scheduled-report/use-scheduled-report";
import ScheduledReportCompleted from "@/components/report/scheduled-report/scheduled-report-completed";
import ScheduledReportPending from "@/components/report/scheduled-report/scheduled-report-pending";
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
        scheduledReports,
        scheduledPendingReports,
    } = useScheduledReport();

    return (
        <div className="w-full mx-auto p-2 sm:p-4 lg:p-6 min-h-screen">
            {/* ShadCN Tabs Component */}
            <Tabs defaultValue="tab1" className="space-y-4 sm:space-y-6">
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
            </Tabs>
        </div>
    );
};

export default ScheduledReport;