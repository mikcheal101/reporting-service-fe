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
          <div className="flex flex-1 gap-0 min-h-0">
            {/* Left Panel — Report Configuration */}
            <div className="w-80 shrink-0 border-r border-gray-100 dark:border-border bg-gray-50/50 dark:bg-muted/20 overflow-y-auto">
              <ReportFormSection form={form} setForm={setForm} />
            </div>

            {/* Right Panel — Query Workspace */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                <Card className="shadow-sm border-gray-100 dark:border-border">
                  <CardContent className="p-4 lg:p-6">
                    <Tabs defaultValue="query-editor" className="space-y-6">
                      <QueryEditor report={form} />

                      <TabsContent value="table-configurator">
                        <TableConfigurator />
                      </TabsContent>

                      <TabsContent value="ai-assistant">
                        <QueryEditor defaultTab="ai" report={form} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <Toaster />
        </ReportDetailsLayout>
      </TableDataProvider>
    </ConnectionProvider>
  </ReportStatusProvider>
);

export default ReportDetailsSubPage;
