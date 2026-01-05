import filter from "../../public/assets/filter.png";
import Image from "next/image";
import React, {useState} from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import DataTable from "./data-table";

interface LoanTableProps {
    title: string;
}

const LoanTable: React.FC<LoanTableProps> = ({ title }) => {
    const loans = [
        {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        }, {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        }, {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        }, {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        }, {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        }, {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        }, {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        }, {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        }, {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        }, {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        },
    ];
    const columns = [
        {key:'date',label:'Date', searcable:true},
        {key:'borrower',label:'Borrower', searcable:true},
        {key:'loanId',label:'Loan Id', searcable:true},
        {key:'loanType',label:'Loan Type', searcable:true},
        {key:'amount',label:'Amount', searcable:true},
        {key:'status',label:'Status', searcable:true},
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(loans.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLoans = loans.slice(startIndex, startIndex + itemsPerPage);


    return (
        <DataTable
            theme="light"
            data={loans}
            columns={columns}
            onView={(item) => console.log('View', item)}
            onEdit={(item) => console.log('Edit', item)}
            onDelete={(item) => console.log('Delete', item)}
            // itemsPerPage={10}
         />
    );
};

export default LoanTable;