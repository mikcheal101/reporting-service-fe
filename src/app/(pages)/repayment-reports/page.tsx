
// app/connection-table/page.tsx
import React from "react";
import RepaymentLayout from "./RepaymentLayout";
import RepaymentReports from "./RepaymentReports";

const LoanReportPage: React.FC = () => {
    return (
        <RepaymentLayout>
            <RepaymentReports />
        </RepaymentLayout>
    );
};

export default LoanReportPage;
