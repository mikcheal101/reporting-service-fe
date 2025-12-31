"use client";

import React, { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

interface LoanTableProps {
    title: string;
}

const CustomerTableData: React.FC<LoanTableProps> = ({ title }) => {
    const router = useRouter();
    const loans = [
        { sn: '1', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
        { sn: '2', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
        { sn: '3', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
        { sn: '4', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
        { sn: '5', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
        { sn: '6', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
        { sn: '7', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
        { sn: '8', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
        { sn: '9', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
        { sn: '10', borrower: 'Gerald Cole', loanId: '1837993', loans: '25', amount: '150,000,000.56', status: 'Active' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(loans.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLoans = loans.slice(startIndex, startIndex + itemsPerPage);

    const handleRowClick = (loanId: string) => {
        router.push(`/customer-details/${loanId}`);
    };

    return (
        <div className="p-4 bg-white rounded shadow-sm">
            <div className="mb-4 flex justify-between items-center">
                <span className="font-bold text-xl">{title}</span>
            </div>
            <div className="mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3">
                            <input type="checkbox" className="form-checkbox" />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Borrower Name and ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No. of Loans
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gross Loan Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Loan Status
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
                            <td className="px-4 py-4 whitespace-nowrap">
                                <input type="checkbox" className="form-checkbox" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.sn}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {loan.borrower} <br /> {loan.loanId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.loans}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <span
                                        className={`inline-block text-xs px-2 py-1 rounded-full ${
                                            loan.status === "Pending"
                                                ? "bg-[#F04438] text-white"
                                                : loan.status === "Active"
                                                    ? "bg-[#E7F1FE] text-[#7BB2F9]"
                                                    : "bg-red-200 text-red-800"
                                        }`}
                                    >
                                        {loan.status}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-end  mt-4">
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
                        {Array.from({ length: totalPages }).map((_, index) => (
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

export default CustomerTableData;