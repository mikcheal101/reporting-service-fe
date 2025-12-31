

import Card from "@/components/Card";
import CustomerTableData from "@/components/CustomerTableData";
import { IconPlus } from "@tabler/icons-react"; // Add this package for icons

const Customer = () => {
    return (
        <div className="flex flex-col bg-[#F6f6f3] mt-2 p-6">


            <div className="grid grid-cols-4 gap-8">
                <Card title="Total Customer" date="Today" value="2000" change="8%" />
                <Card title="Total Active Customer" date="Today" value="1200" change="8%" />
                <Card title="Total Disable Customer" date="Today" value="500" change="8%" />
            </div>
            <div className="flex justify-end items-center mb-3">
                <button className="flex items-center gap-2 bg-[#FFA500] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#FFA500] border transition-all shadow-md">
                    <IconPlus size={18} />
                    Add Customers
                </button>
            </div>
            <div className="mt-2">
                <CustomerTableData title="" />
            </div>
        </div>
    );
};

export default Customer;
