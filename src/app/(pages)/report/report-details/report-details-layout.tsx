// app/(pages)/report/report-details/ReportDetailsLayout.tsx
"use client";
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import React from "react";

const ReportDetailsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex w-full min-h-screen">
    {/* Sidebar - Hidden on mobile, shown on desktop */}
    <div className="hidden lg:block">
      <AppSidebar />
    </div>
    <div className="flex-1 flex flex-col min-h-0">
      <div className="sticky top-0 z-10 bg-white dark:bg-card border-b border-sidebar-border">
        <Navbar title="Reports" theme="" />
      </div>
      <div className="flex-1 flex min-h-0">{children}</div>
    </div>
  </div>
);

export default ReportDetailsLayout;
