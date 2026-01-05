"use client"

import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { useSidebar } from "@/context/SidebarContext";
import React from "react";

const RepaymentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isCollapsed } = useSidebar();

    return (
        <div className="flex w-full h-screen">
            {/* Sidebar */}
           
                <AppSidebar />   
                <div className="flex-1 flex flex-col bg-gray-100">
                    {/* Sticky Navbar */}
                    <div className="sticky top-0 z-10 bg-gray-100">
                        <Navbar title="Loan Portfolio" theme=""/>
                    </div>
                    {/* Children Content */}
                    <div className="flex-1  overflow-y-auto">
                        {children}
                    </div>
                </div>
        </div>
    );
};

export default RepaymentLayout;