// app/(pages)/report/report-details/[id]/page.tsx
"use client";

import React from "react";
import useReportDetail from "@/app/hooks/report/report-detail/use-report-detail";
import ReportDetailsSubPage from "@/components/report/report-detail/report-detail-sub-page";

type ReportDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const ReportDetailsPage = ({ params }: ReportDetailsPageProps) => {
  const resolvedParams = React.use(params);
  const { form, setForm } = useReportDetail(resolvedParams.id);

  return <ReportDetailsSubPage form={form} setForm={setForm} />;
};

export default ReportDetailsPage;
