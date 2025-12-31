



import React from "react";

import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import Settings from "./Settings";

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return (
        <div className="flex w-full h-screen">
           
                <AppSidebar />
                <div className="flex-1 flex flex-col bg-gray-100">
                    {/* Sticky Navbar */}
                    <div className="sticky top-0 z-10 bg-gray-100">
                        <Navbar title="Settings" theme=""/>
                    </div>
                    <div>
                        <Settings/>
                    </div>
                    {/* Children Content */}
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
        </div>
    );
};

export default SettingsLayout;
