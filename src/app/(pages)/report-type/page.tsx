// app/connection-table/page.tsx

import React from "react";
import ReportTypeLayout from "./ReportTypeLayout";
import { Toaster } from "@/components/ui/toaster";
import ReportTypeTable from "../../../components/ReportTypeTable";

const ReportTablePage: React.FC = () => {
    return (
        <ReportTypeLayout>
            <ReportTypeTable />
            <Toaster/>
        </ReportTypeLayout>
    );
};

export default ReportTablePage;