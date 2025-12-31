"use client"

import DisbursementCard from "@/components/DisbursementCard";
import LoanTable from "@/components/LoanTable";


const Disbursement = () => {
    return (
        <div className="flex flex-col bg-[#F6f6f3] mt-2 p-6">
            <div className="grid grid-cols-4 gap-8">
                <DisbursementCard title="Approved Disbursement" date="Today" value="100" amount="160,000,000.69" change="8%" />
                <DisbursementCard title="Total Payout" date="Today" value="47" amount="30,000,000.69" change="8%" />
                <DisbursementCard title="Pending Payout" date="Today" value="53" amount="130,000,000.69" change="8%" />
                <DisbursementCard title="Declined Payout" date="Today" value="0" amount="00.00" change="8%" />
            </div>

            <div className="mt-14">
                <LoanTable title="Loans"/>
            </div>
        </div>
    );
};

export default Disbursement;