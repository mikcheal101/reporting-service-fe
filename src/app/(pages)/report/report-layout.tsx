// app/(pages)/report/report-layout.tsx
"use client";
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import React from "react";

const ReportLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex w-full min-h-screen flex-col lg:flex-row">
    {/* Sidebar - hidden on mobile, shown on desktop */}
    <div className="hidden lg:block">
      <AppSidebar />
    </div>
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-sidebar-border">
        <Navbar title="Reports" theme="" />
      </div>
      {/* Children Content */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6">{children}</div>
    </div>
  </div>
);

export default ReportLayout;
