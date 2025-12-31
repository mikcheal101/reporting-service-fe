// app/connection-table/page.tsx

import React from "react";
import { Toaster } from "@/components/ui/toaster"
import ConnectionLayout from "./ConnectionLayout";
import ConnectionTable from "./ConnectionTable";

const ConnectionTablePage: React.FC = () => {
    return (
        <ConnectionLayout>
            <ConnectionTable />
            <Toaster/>
        </ConnectionLayout>
    );
};

export default ConnectionTablePage;