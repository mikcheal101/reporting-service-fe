
import Image from "next/image";
import calendar from "../../../../public/assets/calendar.png";
import hash from "../../../../public/assets/hash.png";
import phone from "../../../../public/assets/phone.png";
import gender from "../../../../public/assets/gender.png";
import mail from "../../../../public/assets/mail.png";
import avatar from "../../../../public/assets/Avatar.png";

const CustomerDetails = () => {
    return (
        <div className="p-6 flex flex-col">
            <div className="flex gap-2 items-center mb-4">
                <Image src={avatar} width={50} height={50} alt="avatar"/>
                <h2 className="text-[#FFAA10]">
                    Gerald Cole
                    <br/>
                    <span className="text-black">1837993</span>
                </h2>
                <div className="flex-1"></div>
                <div className="gap-2 flex">
                    <button
                        className="flex items-center gap-2 bg-[#FFA500] text-white px-6 py-2 rounded-lg border transition-all shadow-md"
                    >
                        Create Loan
                    </button>
                    <button
                        className="flex items-center gap-2 bg-white border-[#FFA500] text-[#FFA500] px-6 py-2 rounded-lg border transition-all shadow-md"
                    >
                        Black List
                    </button>
                </div>
            </div>
            <h2>Customer onboarded by: John Doe</h2>
            <hr className="my-6 border-t w-[100%] border-gray-300"/>

            <div className="flex ">
                <div className="flex flex-col mt-6">
                    <div className="flex gap-6 items-center">
                        <h3 className="text-[#FFA500] bg-[#FFF7E8] rounded-xl p-2 w-28">
                            Personal info
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Work</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Document</span>
                        </div>
                    </div>
                    <h2 className="mt-6 mb-4 text-lg font-semibold">Details</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-4">
                            <Image src={calendar} width={20} height={20} alt="DOB Icon"/>
                            <div>
                                <span className="font-light">Dob</span>
                                <span className="ml-20">10th June, 1993</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src={gender} width={20} height={20} alt="Gender Icon"/>
                            <div>
                                <span className="font-light">Gender</span>
                                <span className="ml-16">Female</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src={phone} width={20} height={20} alt="Phone Icon"/>
                            <div>
                                <span className="font-light">Phone</span>
                                <span className="ml-16">+234 90 345 678 9</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src={hash} width={20} height={20} alt="Hash icon"/>
                            <div>
                                <span className="font-light">NIN/SSN</span>
                                <span className="ml-14">274903456789</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src={mail} width={20} height={20} alt="Email Icon"/>
                            <div>
                                <span className="font-light">Email</span>
                                <span className="ml-20">johndoe@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Line */}
                    <hr className="my-6 border-t w-[125%] border-gray-300"/>

                    {/* Address Section */}
                    <h2 className="mt-4 mb-4 text-lg font-semibold">Address</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-4">
                            <span className="font-light">Country</span>
                            <span className="ml-20">Nigeria</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-light">State</span>
                            <span className="ml-24">FCT</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-light">LGA</span>
                            <span className="ml-28">Kuba</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-light">House No</span>
                            <span className="ml-16">56</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-light">Address</span>
                            <span className="ml-16">Johnson Adenuga Street</span>
                        </div>
                    </div>

                    <hr className="my-6 border-t w-[125%] border-gray-300"/>

                    {/* Address Section */}
                    <h2 className="mt-4 mb-4 text-lg font-semibold">Bank</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-4">
                            <span className="font-light">Name</span>
                            <span className="ml-24">GT bank</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-light">Acc number</span>
                            <span className="ml-14">0173692735</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-light">Beneficiary</span>
                            <span className="ml-14">John Doe</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-light">BVN</span>
                            <span className="ml-24">837450172</span>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block mx-8 translate-x-16 -mt-6 border-l border-gray-300"></div>

                <div className="items-center mt-6 ml-14">
                    <div className="flex gap-8 items-center">
                        <h3 className="p-2">
                            Activity log
                        </h3>
                        <div className="flex items-center w-28 p-2 rounded-xl text-[#FFA500] bg-[#FFF7E8] gap-2">
                            <span className="w-2 h-2  bg-green-500 rounded-full"></span>
                            <span>Summary</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2  bg-green-500 rounded-full"></span>
                            <span>Loans</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2  bg-green-500 rounded-full"></span>
                            <span>Disbursements</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Repayments</span>
                        </div>
                    </div>
                    <h2 className="mt-6 mb-4 text-lg font-semibold">Loan Stats</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 w-72 rounded-xl bg-[#F0f0f0]">
                            <h2 className="mb-4">Total Loans Applications</h2>
                            <h2 className="text-[#FFCD71] font-bold items-center text-4xl">16<span
                                className="ml-8 text-black relative -top-2 text-sm font-medium">17,938,203.02 NGN</span>
                            </h2>
                        </div>
                        <div className="p-5 w-72 rounded-xl bg-[#F0f0f0]">
                            <h2 className="mb-4">Approved</h2>
                            <h2 className="text-[#FFCD71] font-bold items-center text-4xl">10<span
                                className="ml-8 text-black relative -top-2 text-sm font-medium">12,029,394.9 NGN</span>
                            </h2>
                        </div>
                        <div className="p-5 w-72 rounded-xl bg-[#F0f0f0]">
                            <h2 className="mb-4">Disbursed</h2>
                            <h2 className="text-[#FFCD71] font-bold items-center text-4xl">7<span
                                className="ml-8 text-black relative -top-2 text-sm font-medium">6,006,253.02 NGN</span>
                            </h2>
                        </div>
                        <div className="p-5 w-72 rounded-xl bg-[#F0f0f0]">
                            <h2 className="mb-4">Completed repayments</h2>
                            <h2 className="text-[#FFCD71] font-bold items-center text-4xl">5<span
                                className="ml-8 text-black relative -top-2 text-sm font-medium">17,938,203.02 NGN</span>
                            </h2>
                        </div>
                        <div className="p-5 w-72 rounded-xl bg-[#F0f0f0]">
                            <h2 className="mb-4">Debts</h2>
                            <h2 className="text-[#FFCD71] font-bold items-center text-4xl">2<span
                                className="ml-8 text-black relative -top-2 text-sm font-medium">1,797,938.04 NGN</span>
                            </h2>
                        </div>
                        <div className="p-5 w-72 rounded-xl bg-[#F0f0f0]">
                            <h2 className="mb-4">Rejected/Cancelled</h2>
                            <h2 className="text-[#FFCD71] font-bold items-center text-4xl">6<span
                                className="ml-8 text-black relative -top-2 text-sm font-medium">5,853,203 NGN</span>
                            </h2>
                        </div>
                        <div className="p-5 w-72 rounded-xl bg-[#F0f0f0]">
                            <h2 className="mb-4">Amount borrowed</h2>
                            <h2 className="text-[#FFCD71] font-bold items-center text-4xl">7<span
                                className="ml-8 text-black relative -top-2 text-sm font-medium">6,056,258.69 NGN</span>
                            </h2>
                        </div>
                        <div className="p-5 w-72 rounded-xl bg-[#F0f0f0]">
                            <h2 className="mb-4">Proposed interest</h2>
                            <h2 className="text-[#FFCD71] font-bold items-center text-4xl">10%<span
                                className="ml-8 text-black relative -top-2 text-sm font-medium">606,625.69 NGN</span>
                            </h2>
                        </div>
                        <div className="p-5 w-72 rounded-xl bg-[#F0f0f0]">
                            <h2 className="mb-4">Interest paid</h2>
                            <h2 className="text-[#FFCD71] font-bold items-center text-4xl">2<span
                                className="ml-8 text-black relative -top-2 text-sm font-medium">606,625.02 NGN</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
