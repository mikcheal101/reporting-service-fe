"use client"

import React from "react";
import { Toaster } from "@/components/ui/toaster"
import ScheduledLayout from "./ScheduledLayout";
import ScheduledReport from "./ScheduledReport";

const ReportingPage: React.FC = () => {
    return (
        <ScheduledLayout>
            <ScheduledReport />
            <Toaster/>
        </ScheduledLayout>
    );
};

export default ReportingPage;