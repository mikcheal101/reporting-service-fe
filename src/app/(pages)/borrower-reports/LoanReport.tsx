
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BorrowerCards from "@/components/BorrowerCards";
import BorrowerTable from "./BorrowerTable";

const LoanReport = () => {
    const router = useRouter();
    const [selectedReport, setSelectedReport] = useState("borrower reports");

    const handleButtonClick = (reportName: string, path: string) => {
        setSelectedReport(reportName);
        router.push(path);
    };

    return (
        <div>
            <div className="bg-white p-5 border-none space-x-6">
                <button
                    className={`${
                        selectedReport === "borrower reports" ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("borrower reports", "/borrower-reports")}
                >
                    Borrower reports
                </button>
                <button
                    className={`${
                        selectedReport === "Loan reports" ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("Loan reports", "/loan-reports")}
                >
                    Loan reports
                </button>
                <button
                    className={`${
                        selectedReport === "Loan areas aging reports" ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("Loan areas aging reports", "/loan-aging")}
                >
                    Loan areas aging reports
                </button>
                <button
                    className={`${
                        selectedReport === "Repayment reports" ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("Repayment reports", "/repayment-reports")}
                >
                    Repayment reports
                </button>
                <button
                    className={`${
                        selectedReport === "Disbursement reports" ? "bg-[#FFF7E8] font-bold text-[#FFBF48]" : "bg-white text-black"
                    } rounded-xl p-2`}
                    onClick={() => handleButtonClick("Disbursement reports", "/disbursement-reports")}
                >
                    Disbursement reports
                </button>
            </div>
            <div className="grid grid-cols-4 p-4 gap-4">
                <BorrowerCards title="Total Borrowers" value="7000" change="8%" />
            </div>
            <div className="mt-20 bg-gray-100">
                <BorrowerTable/>
            </div>
        </div>
    );
};

export default LoanReport;
