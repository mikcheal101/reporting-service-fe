
import React from "react";
import LoanAging from "@/app/(pages)/loan-aging/LoanAging";
import LoanAgingLayout from "@/app/(pages)/loan-aging/LoanAgingLayout";

const LoanReportPage: React.FC = () => {
    return (
        <LoanAgingLayout>
            <LoanAging />
        </LoanAgingLayout>
    );
};

export default LoanReportPage;
