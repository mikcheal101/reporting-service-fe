
// app/connection-table/page.tsx

import React from "react";
import ReportsLayout from "./ReportsLayout";
import ReportsTable from "./ReportTable";

const ReportTablePage: React.FC = () => {
    return (
        <ReportsLayout>
            <ReportsTable />
        </ReportsLayout>
    );
};

export default ReportTablePage;
