// app/(pages)/report/page.tsx
"use client";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import ReportLayout from "./report-layout";
import Report from "./report";
import { ReportStatusProvider } from "@/context/ReportStatusContext";

const ReportingPage: React.FC = () => {
  return (
    <ReportStatusProvider>
      <ReportLayout>
        <Report />
        <Toaster />
      </ReportLayout>
    </ReportStatusProvider>
  );
};

export default ReportingPage;
