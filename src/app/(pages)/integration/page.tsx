// app/connection-table/page.tsx
import React from "react";
import IntegrationLayout from "@/app/(pages)/integration/IntegrationLayout";
import {Toaster} from "@/components/ui/toaster";
import Integration from "./Intetgration";

const NotificationPage: React.FC = () => {
    return (
        <IntegrationLayout>
            <Integration/>
            <Toaster/>
        </IntegrationLayout>
    );
};

export default NotificationPage;