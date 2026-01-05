
// app/connection-table/page.tsx
import React from "react";
import LoanReportLayout from "./LoanReportLayout";
import LoanReports from "./LoanReports";


const LoanReportPage: React.FC = () => {
    return (
        <LoanReportLayout>
            <LoanReports />
        </LoanReportLayout>
    );
};

export default LoanReportPage;
