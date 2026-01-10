"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import ScheduledLayout from "./scheduled-layout";
import ScheduledReport from "./scheduled-report";

const ReportingPage: React.FC = () => {
  return (
    <ScheduledLayout>
      <ScheduledReport />
      <Toaster />
    </ScheduledLayout>
  );
};

export default ReportingPage;
