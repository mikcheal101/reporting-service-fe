"use client"
import Card from "@/components/Card";
import LoansApplicationTable from "@/components/LoanApplicationTable";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const LoanApplication = () => {
    const router = useRouter();

    const handleForm = () => {
        router.push("/loan-application/loan-forms");
    };
    return (
        <div className="flex flex-col bg-[#F6f6f3] mt-2 p-6">
            <div className="flex justify-end items-center mb-8">
                <button className="flex items-center gap-2 bg-[#FFA500] text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#FFA500] border transition-all shadow-md" onClick={handleForm}>
                    <IconPlus size={18} />
                    
                    Create loan
                </button>
            </div>

            <div className="grid grid-cols-4 gap-8">
                <Card title="Total Customer" date="Today" value="1200" change="8%" />
                <Card title="Total Loan Request" date="Today" value="1200" change="8%" />
                <Card title="Total Aprroved Loans" date="Today" value="1000" change="8%" />
                <Card title="Total Declined Loans" date="Today" value="200" change="8%" />
            </div>

            <div className="mt-14">
                <LoansApplicationTable title="Loans" />
            </div>
        </div>
    );
};

export default LoanApplication;