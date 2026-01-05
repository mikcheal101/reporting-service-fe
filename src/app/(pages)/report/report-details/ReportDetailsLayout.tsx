"use client"
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { useSidebar } from "@/context/SidebarContext";
import React from "react";

const ReportDetailsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isCollapsed } = useSidebar();

    return (
        <div className="flex w-full h-screen">
            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
                <AppSidebar />
            </div>
            
            <div className="flex-1 flex flex-col bg-gray-100 min-w-0">
                {/* Sticky Navbar */}
                <div className="sticky top-0 z-10 bg-gray-100">
                    <Navbar title="Reports" theme=""/>
                </div>
                {/* Children Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ReportDetailsLayout;