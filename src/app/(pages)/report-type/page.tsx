// app/connection-table/page.tsx
"use client";

import React from "react";
import ReportTypeLayout from "./report-type-layout";
import { Toaster } from "@/components/ui/toaster";
import ReportTypeTable from "./report-type";

const ReportTablePage: React.FC = () => {
  return (
    <ReportTypeLayout>
      <ReportTypeTable />
      <Toaster />
    </ReportTypeLayout>
  );
};

export default ReportTablePage;
