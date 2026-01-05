
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoanTable from "@/components/LoanTable";
import BorrowerCards from "@/components/BorrowerCards";

const LoanReports = () => {
    const router = useRouter();
    const [selectedReport, setSelectedReport] = useState("Loan reports");

    const handleButtonClick = (report: string, path: string) => {
        setSelectedReport(report);
        router.push(path);
    };

    return (
        <div>
            <div className="bg-white p-5 -mt-5 border-none space-x-5">
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
                <BorrowerCards title="Total Loan taken" value="₦30,000,000.69" change="8%" />
                <BorrowerCards title="Total Fully repaid loan" value="₦30,000" change="8%" />
                <BorrowerCards title="Total Overdue loan" value="₦7,000" change="8%" />
                <BorrowerCards title="Total Outstanding balance" value="₦17,000" change="8%" />
            </div>
            <div className="mt-20 bg-gray-100">
                <LoanTable title="Loans"/>
            </div>
        </div>
    );
};

export default LoanReports;
