
// app/connection-table/page.tsx
import React from "react";
import LoanDetailsLayout from "./LoanDetailsLayout";
import LoanDetails from "../LoanDetails";


const CustomerDetailPage: React.FC = () => {
    return (
        <LoanDetailsLayout>
            <LoanDetails />
        </LoanDetailsLayout>
    );
};

export default CustomerDetailPage;
