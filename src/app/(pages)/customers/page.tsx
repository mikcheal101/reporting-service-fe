// app/connection-table/page.tsx
import React from "react";
import Customer from "@/app/(pages)/customers/Customer";
import CustomerLayout from "@/app/(pages)/customers/CustomerLayout";

const CustomerPage: React.FC = () => {
    return (
        <CustomerLayout>
            <Customer />
        </CustomerLayout>
    );
};

export default CustomerPage;