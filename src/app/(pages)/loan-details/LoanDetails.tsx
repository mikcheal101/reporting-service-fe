import Image from "next/image";
import avatar from "../../../../public/assets/Avatar.png";
import avatar1 from "../../../../public/assets/avatar1.png";
import {MdAdd} from "react-icons/md";

const LoanDetails = () => {
    return (
        <div>
            {/* Other sections */}
            <div className="p-6 flex bg-white flex-col">
                <div className="flex gap-2 items-center mb-4">
                    <Image src={avatar} width={50} height={50} alt="avatar"/>
                    <h2 className="text-[#FFAA10]">
                        Gerald Cole
                        <br/>
                        <span className="text-black">1837993</span>
                    </h2>
                    <div className="flex-1"></div>
                    <div className="gap-2 flex">
                        <h2 className="bg-[#F4F4F4] text-sm w-44 rounded-xl p-2">
                            Loan ID: <br/>
                            <span className="text-xl font-semibold text-gray-600">GCL389281</span>
                        </h2>
                        <h2 className="bg-[#F4F4F4] text-sm w-44 rounded-xl p-2">
                            Loan Amount: <br/>
                            <span className="text-xl font-semibold text-gray-600">300,000.00</span>
                        </h2>
                    </div>
                </div>
                <button
                    className="flex items-center gap-3 bg-[#FFA500] text-white px-6 w-56 py-2 rounded-lg border-none transition-transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                    <MdAdd className="text-white text-lg"/>
                    <span className="font-medium">Ready for Disbursal</span>
                </button>
            </div>

            {/* Loan Details */}
            <div className="mt-8 p-6">
                <div className="bg-white p-4 rounded-t-lg">
                    <h2 className="text-center text-lg font-semibold">Loan Details</h2>
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* Header Row */}
                    <div className="flex justify-between bg-[#F6F6F3] text-sm p-4 border-b">
                        <h2>Loan type</h2>
                        <h2>Purpose</h2>
                        <h2>Maturity amount</h2>
                        <h2>Loan period</h2>
                        <h2>Maturity date</h2>
                    </div>
                    {/* Data Row */}
                    <div className="flex justify-between bg-white text-sm p-4">
                        <h2>Payday or salary loan</h2>
                        <h2>Car loan</h2>
                        <h2>
                            330,000.00 <br/>
                            <span className="font-light">10% per month</span>
                        </h2>
                        <h2>3 months</h2>
                        <h2>11/05/2020</h2>
                    </div>
                </div>
            </div>

            {/* Loan Actions */}
            <div className="mt-8 p-6">
                <div className="bg-white p-4 rounded-t-lg">
                    <h2 className="text-center text-lg font-semibold">Loan Action</h2>
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <div className="flex justify-between bg-[#F6F6F3] text-sm p-4 border-b">
                        <h2>ID</h2>
                        <h2>Action</h2>
                        <h2>Assigned to</h2>
                        <h2>Status</h2>
                        <h2>Action</h2>
                    </div>
                    <div className="flex justify-between bg-white text-sm p-4 rounded-b-lg">
                        <h2>01</h2>
                        <h2>Approve borrowers credit</h2>
                        <div className="flex gap-2">
                            <Image src={avatar1} alt="profile" width={35} height={20}/>
                            <h2>
                                Miriam Joel <br/>
                                <span className="font-light">Credit admin officer</span>
                            </h2>
                        </div>
                        <h2 className="text-red-950 bg-[#FEF4E6] px-2 py-3 text-xs rounded-full">
                            Pending
                        </h2>
                        <h2>11/05/2020</h2>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <div className="mt-8 p-4 rounded-xl bg-white shadow-md">
                    {/* Tabs Section */}
                    <div className="flex mb-6 gap-8 border-b pb-4 items-center">
                        <h3 className="text-[#FFA500] bg-[#FFF7E8] rounded-xl px-4 py-2">
                            Activity log
                        </h3>
                        {['Summary', 'Disbursement', 'Repayment'].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-600">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>{item}</span>
                            </div>
                        ))}
                        <h3 className="text-gray-600">Files</h3>
                    </div>

                    {/* Activity Log */}
                    <div className="p-4">
                        <div className="font-bold text-gray-600 mb-4">Yesterday</div>
                        <div className="flex items-center">
                            <h3 className="font-semibold text-sm text-gray-800">
                                Loan created by <span className="text-blue-500">John Doe</span>
                            </h3>
                            <p className="text-gray-500 text-xs ml-auto">10:56 PM</p>
                        </div>
                        <div
                            className="bg-[#FAFAFA] w-[95%] mt-3 p-4 flex items-center gap-4 rounded-lg shadow-sm border">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">N 300,000.00</h3>
                                <p className="text-gray-500 text-sm">Basic loan for a duration of 3 months</p>
                            </div>
                            {/* Right-Aligned Details */}
                            <div className="text-right">
                                <h3 className="font-semibold text-gray-800">JDL-273730</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* New Section */}

        </div>
    );
};

export default LoanDetails;