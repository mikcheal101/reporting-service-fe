"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { ConnectionProvider } from "@/context/ConnectionContext";
import ReportDetailsLayout from "./ReportDetailsLayout";
import NavSection from "./NavSection";
import QueryEditor from "./QueryEditor";
import TableConfigurator from "./table-configurator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Code, Wand2 } from "lucide-react";
import { TableDataProvider } from '@/context/TableDataContext';
import { ReportStatusProvider } from '@/context/ReportStatusContext';

export default function ReportDetailsPage() {
  return (
    <ReportStatusProvider>
      <ConnectionProvider>
        <TableDataProvider>
          <ReportDetailsLayout>
            <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6 p-4 lg:p-6">
              {/* Navigation Section */}
              <div className="w-full lg:w-1/4 lg:min-w-[320px] order-2 lg:order-1">
                <Card className="h-fit shadow-lg border-0">
                  <NavSection />
                </Card>
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 order-1 lg:order-2">
                <Card className="shadow-lg border-0">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <Tabs defaultValue="query-editor" className="space-y-4 lg:space-y-6">
                                                                    
                                    
                                    <div  className="mt-4 lg:mt-6">
                                      <QueryEditor />
                                    </div>
                                     
                                    <TabsContent value="table-configurator" className="mt-4 lg:mt-6">
                                      <TableConfigurator />
                                    </TabsContent> 
                                    
                                    <TabsContent value="ai-assistant" className="mt-4 lg:mt-6">
                                      <QueryEditor defaultTab="ai" />
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
}