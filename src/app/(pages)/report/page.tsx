

import React from "react";
import { Toaster } from "@/components/ui/toaster"
import ReportLayout from "./ReportLayout";
import ReportPage from "./ReportPage";
import { ReportStatusProvider } from "@/context/ReportStatusContext";

const ReportingPage: React.FC = () => {
    return (
         <ReportStatusProvider>
        <ReportLayout>
            <ReportPage />
            <Toaster/>
        </ReportLayout>
        </ReportStatusProvider>
    );
};

export default ReportingPage;
