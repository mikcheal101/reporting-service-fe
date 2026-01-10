// components/report/report-detail/report-detail-sub-page.tsx
"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { ConnectionProvider } from "@/context/ConnectionContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TableDataProvider } from "@/context/TableDataContext";
import { ReportStatusProvider } from "@/context/ReportStatusContext";
import IReport from "@/types/report/ireport";
import ReportDetailsLayout from "@/app/(pages)/report/report-details/report-details-layout";
import ReportFormSection from "@/app/(pages)/report/report-details/report-form-section";
import QueryEditor from "@/app/(pages)/report/report-details/query-editor";
import TableConfigurator from "@/app/(pages)/report/report-details/table-configurator";

type ReportDetailsPageProps = {
  form: IReport;
  setForm: React.Dispatch<React.SetStateAction<IReport>>;
};

const ReportDetailsSubPage = ({ form, setForm }: ReportDetailsPageProps) => (
  <ReportStatusProvider>
    <ConnectionProvider>
      <TableDataProvider>
        <ReportDetailsLayout>
          <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6 p-4 lg:p-6">
            {/* Navigation Section */}
            <div className="w-full lg:w-1/4 lg:min-w-[320px] order-2 lg:order-1">
              <Card className="h-fit shadow-lg border-0">
                <ReportFormSection form={form} setForm={setForm} />
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 order-1 lg:order-2">
              <Card className="shadow-lg border-0">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <Tabs
                    defaultValue="query-editor"
                    className="space-y-4 lg:space-y-6"
                  >
                    <div className="mt-4 lg:mt-6">
                      <QueryEditor report={form} />
                    </div>

                    <TabsContent
                      value="table-configurator"
                      className="mt-4 lg:mt-6"
                    >
                      <TableConfigurator />
                    </TabsContent>

                    <TabsContent value="ai-assistant" className="mt-4 lg:mt-6">
                      <QueryEditor defaultTab="ai" report={form} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              <Toaster />
            </div>
          </div>
        </ReportDetailsLayout>
      </TableDataProvider>
    </ConnectionProvider>
  </ReportStatusProvider>
);

export default ReportDetailsSubPage;
