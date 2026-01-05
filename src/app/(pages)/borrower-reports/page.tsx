// app/connection-table/page.tsx
"use client"
import React from "react";
import LoanReport from "@/app/(pages)/borrower-reports/LoanReport";
import { Layout } from "lucide-react";
import BorrowerLayout from "./BorrowerLayout";

const LoanReportPage: React.FC = () => {
    return (
        <BorrowerLayout>
            <LoanReport />
        </BorrowerLayout>
    );
};

export default LoanReportPage;