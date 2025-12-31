// app/connection-table/page.tsx
import React from "react";
import LoanApplicationLayout from "./LoanApplicationLayout";
import LoanApplication from "./LoanApplication";

const LoanApplicationPage: React.FC = () => {
    return (
        <LoanApplicationLayout>
            <LoanApplication />
        </LoanApplicationLayout>
    );
};

export default LoanApplicationPage;