// app/(pages)/report/page.tsx
"use client";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import ReportLayout from "./report-layout";
import Report from "./report";
import { ReportStatusProvider } from "@/context/ReportStatusContext";
import usePermission from "@/app/hooks/auth/use-permission";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "@/app/constants/routes.constant";

const ReportingPage: React.FC = () => {
  const router = useRouter();
  const { can } = usePermission();

  React.useEffect(() => {
    if (!can("report", "list")) {
      router.replace(FE_ROUTES.DASHBOARD);
    }
  }, []);

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
