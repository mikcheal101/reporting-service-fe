"use client";

import React, { useState } from "react";
import { FaMoneyCheck, FaUser, FaPercentage, FaCalendarAlt } from "react-icons/fa";
import { MdAttachMoney, MdUploadFile } from "react-icons/md";

interface LoanFormProps {
    loanTypes: { id: string; name: string }[];
    paymentFrequencies: { id: string; name: string }[];
    onSubmit: (formData: {
        loanTypeId: string;
        borrowerId: string;
        amount: number;
        annualInterest: number;
        loanTenure: number;
        paymentFrequencyId: string;
        documents: File | null;
    }) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ loanTypes, paymentFrequencies, onSubmit }) => {
    const [formData, setFormData] = useState({
        loanTypeId: "",
        borrowerId: "",
        amount: 0,
        annualInterest: 0,
        loanTenure: 0,
        paymentFrequencyId: "",
        documents: null as File | null,
    });

    const [step, setStep] = useState(1);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData({ ...formData, documents: file });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="flex items-center justify-center mt-12 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg"
            >
                <h2 className="text-xl font-bold mb-6 text-center">
                    {step === 1 && "Step 1: Loan Details"}
                    {step === 2 && "Step 2: Borrower Information"}
                    {step === 3 && "Step 3: Upload Documents"}
                </h2>

                {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-2">
                            <FaMoneyCheck className="text-blue-500" />
                            <select
                                name="loanTypeId"
                                value={formData.loanTypeId}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="" disabled>
                                    Select Loan Type
                                </option>
                                {loanTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <MdAttachMoney className="text-blue-500" />
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="Loan Amount"
                                required
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <FaPercentage className="text-blue-500" />
                            <input
                                type="number"
                                name="annualInterest"
                                value={formData.annualInterest}
                                onChange={handleChange}
                                placeholder="Annual Interest Rate (%)"
                                required
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <input
                                type="number"
                                name="loanTenure"
                                value={formData.loanTenure}
                                onChange={handleChange}
                                placeholder="Loan Tenure (months)"
                                required
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-blue-500" />
                            <input
                                type="text"
                                name="borrowerId"
                                value={formData.borrowerId}
                                onChange={handleChange}
                                placeholder="Borrower ID"
                                required
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <select
                                name="paymentFrequencyId"
                                value={formData.paymentFrequencyId}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="" disabled>
                                    Select Payment Frequency
                                </option>
                                {paymentFrequencies.map((freq) => (
                                    <option key={freq.id} value={freq.id}>
                                        {freq.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col items-center gap-4">
                        <label
                            htmlFor="documents"
                            className="flex items-center justify-center w-full h-20 border-2 border-dashed rounded-lg text-gray-600 cursor-pointer hover:bg-gray-100"
                        >
                            <MdUploadFile className="text-blue-500 text-2xl" />
                            <span className="ml-2">Upload ID, NIN, or BVN</span>
                            <input
                                type="file"
                                id="documents"
                                name="documents"
                                accept=".pdf,.jpg,.png"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Previous
                        </button>
                    )}
                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default LoanForm;
