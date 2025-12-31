"use client"

import Dashboard from "./Dashboard";
import DashboardLayout from "./DashboardLayout";
// import DashBoardLayout from "./Dashboardlayout";

const DashboardPage: React.FC = () => {
    return (
        <DashboardLayout>
            <Dashboard />
        </DashboardLayout>
    );
};

export default DashboardPage;