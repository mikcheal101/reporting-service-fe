
// app/connection-table/page.tsx
import React from "react";
import Disbursement from "@/app/(pages)/disbursement/Disbursement";
import DisbursementLayout from "./DisbursementLayout";

const DisbursementPage: React.FC = () => {
    return (
        <DisbursementLayout>
            <Disbursement />
        </DisbursementLayout>
    );
};

export default DisbursementPage;
