// app/(pages)/report/report-details/page.tsx
"use client";

import React from "react";
import useReportDetail from "@/app/hooks/report/report-detail/use-report-detail";
import ReportDetailsSubPage from "@/components/report/report-detail/report-detail-sub-page";

export default function ReportDetailsPage() {
  const { form, setForm } = useReportDetail();

  return (<ReportDetailsSubPage form={form} setForm={setForm} />);
}
