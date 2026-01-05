
// app/connection-table/page.tsx
import React from "react";
import CustomerDetails from "@/app/(pages)/customer-details/CustomerDetails";
import CustomerDetailLayout from "./CustomerDetailLayout";

const CustomerDetailPage: React.FC = () => {
    return (
        <CustomerDetailLayout>
            <CustomerDetails />
        </CustomerDetailLayout>
    );
};

export default CustomerDetailPage;
