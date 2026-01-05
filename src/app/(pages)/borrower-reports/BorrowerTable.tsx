import React, {useState} from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

const BorrowerTable = () => {
    const loans = [
        {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'Owing',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'Owing',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'No Debt',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'No Debt',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'Cancelled',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'Cancelled',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'No Debt',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'Cancelled',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'Owing',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            number: '1837993',
            loanType: 'House Loan',
            email: 'doe@gmail.com',
            status: 'Cancelled',
            action: 'John Doe',
        },
        // ... (other loan entries)
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(loans.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLoans = loans.slice(startIndex, startIndex + itemsPerPage);



    return (
        <div className="p-5 bg-white w-[95%] ml-6 rounded-t-2xl shadow-sm">
            <div className="mb-4 flex justify-between items-center">
                <span className="font-bold text-xl">Borrower</span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower
                            Name and ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone
                            Number & Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
                            Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debt
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action
                            By
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedLoans.map((loan, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.borrower}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{loan.number}
                                <br/> {loan.loanType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span
                                className={`inline-block text-xs px-2 py-1 rounded-full ${loan.status === 'Owing' ? 'bg-[#F04438] text-white' : loan.status === 'No Debt' ? 'bg-green-800 text-green-200' : 'bg-gray-500 text-white'}`}>
                            {loan.status}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.action}</td>
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

export default BorrowerTable;