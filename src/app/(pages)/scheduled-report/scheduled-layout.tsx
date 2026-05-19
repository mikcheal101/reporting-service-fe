"use client";
import React from "react";
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";

const ScheduledLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex w-full min-h-screen flex-col lg:flex-row">
      <div className="hidden lg:block">
        <AppSidebar />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-white dark:bg-card border-b border-sidebar-border">
          <Navbar title="Scheduled Reports" theme="" />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default ScheduledLayout;
