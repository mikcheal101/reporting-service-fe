// app/connection-table/page.tsx
"use client"
import React from "react";
import LoanFormLayout from "./LoanFormLayout";
import LoanForm from "./LoanForm";

const LoanApplicationPage: React.FC = () => {
    const loanTypes = [
        { id: "1", name: "Personal Loan" },
        { id: "2", name: "Home Loan" },
    ];

    const paymentFrequencies = [
        { id: "1", name: "Monthly" },
        { id: "2", name: "Quarterly" },
    ];
    
      const handleLoanSubmit = (data: any) => {
        console.log("Form Data Submitted:", data);
        // Add API call or other logic here
      }
    return (
        <LoanFormLayout>
             <LoanForm
                loanTypes={loanTypes}
                paymentFrequencies={paymentFrequencies}
                onSubmit={handleLoanSubmit}
            />
        </LoanFormLayout>
    );
};

export default LoanApplicationPage;