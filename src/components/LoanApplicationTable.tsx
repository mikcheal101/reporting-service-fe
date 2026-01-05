"use client";

import filter from "../../public/assets/filter.png";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CardProps } from "@mui/material";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

const LoansApplicationTable: React.FC<CardProps> = ({ title }) => {
    const router = useRouter();

    const loans = [
        {
            date: "30/10/2024",
            borrower: "Samuel Doe",
            loanId: "1837993",
            loanType: "House Loan",
            amount: "150,000,000.56",
            status: "Pending",
            action: "John Doe",
        },{
            date: "30/10/2024",
            borrower: "Samuel Doe",
            loanId: "1837993",
            loanType: "House Loan",
            amount: "150,000,000.56",
            status: "Pending",
            action: "John Doe",
        },
        {
            date: "30/10/2024",
            borrower: "Samuel Doe",
            loanId: "1837994",
            loanType: "Car Loan",
            amount: "80,000,000.00",
            status: "Approved",
            action: "Jane Doe",
        },{
            date: "30/10/2024",
            borrower: "Samuel Doe",
            loanId: "1837994",
            loanType: "Car Loan",
            amount: "80,000,000.00",
            status: "Approved",
            action: "Jane Doe",
        },
        {
            date: "30/10/2024",
            borrower: "Samuel Doe",
            loanId: "1837995",
            loanType: "Personal Loan",
            amount: "50,000,000.75",
            status: "Cancelled",
            action: "John Smith",
        },{
            date: "30/10/2024",
            borrower: "Samuel Doe",
            loanId: "1837995",
            loanType: "Personal Loan",
            amount: "50,000,000.75",
            status: "Cancelled",
            action: "John Smith",
        },{
            date: "30/10/2024",
            borrower: "Samuel Doe",
            loanId: "1837995",
            loanType: "Personal Loan",
            amount: "50,000,000.75",
            status: "Pending",
            action: "John Smith",
        },{
            date: "30/10/2024",
            borrower: "Samuel Doe",
            loanId: "1837995",
            loanType: "Personal Loan",
            amount: "50,000,000.75",
            status: "Pending",
            action: "John Smith",
        },{
            date: "30/10/2024",
            borrower: "Samuel Doe",
            loanId: "1837995",
            loanType: "Personal Loan",
            amount: "50,000,000.75",
            status: "Pending",
            action: "John Smith",
        },
        // Add more loans here...
    ];

    const [selectedLoans, setSelectedLoans] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(loans.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLoans = loans.slice(startIndex, startIndex + itemsPerPage);


    const handleCheckboxChange = (loanId: string) => {
        setSelectedLoans((prevSelectedLoans) =>
            prevSelectedLoans.includes(loanId)
                ? prevSelectedLoans.filter((id) => id !== loanId)
                : [...prevSelectedLoans, loanId]
        );
    };

    const handleRowClick = (loanId: string) => {
        router.push(`/loan-details/${loanId}`);
    };

    return (
        <div className="p-4 bg-white w-[100%] rounded-t-2xl rounded shadow-sm">
            <div className="mb-4 flex justify-between items-center">
                <span className="font-bold text-xl">{title}</span>
                <div className="flex space-x-2">
                    <button
                        className="px-4 py-2 border flex gap-2 border-[#FFC760] items-center text-sm text-[#FFC760] bg-white rounded">
                        Filter
                        <Image src={filter} alt="filter" width={25} height={25}/>
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3">
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setSelectedLoans(
                                        e.target.checked ? loans.map((loan) => loan.loanId) : []
                                    )
                                }
                                checked={selectedLoans.length === loans.length}
                            />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Borrower Name and ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Loan ID & Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Loan Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Loan Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action By
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedLoans.map((loan, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleRowClick(loan.loanId)}
                        >
                            <td className="px-4 py-4">
                                <input
                                    type="checkbox"
                                    checked={selectedLoans.includes(loan.loanId)}
                                    onChange={(e) => {
                                        e.stopPropagation(); // Prevent checkbox click from triggering row click
                                        handleCheckboxChange(loan.loanId);
                                    }}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {loan.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {loan.borrower}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {loan.loanId} <br/> {loan.loanType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {loan.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <span
                                        className={`inline-block text-xs px-2 py-1 rounded-full ${
                                            loan.status === "Pending"
                                                ? "bg-[#F04438] text-white"
                                                : loan.status === "Approved"
                                                    ? "bg-green-800 text-green-200"
                                                    : "bg-gray-500 text-white"
                                        }`}
                                    >
                                        {loan.status}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {loan.action}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                            />
                        </PaginationItem>
                        {Array.from({length: totalPages}).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === index + 1}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default LoansApplicationTable;