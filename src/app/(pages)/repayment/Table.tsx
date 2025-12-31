import React from 'react';
import Image from "next/image";
import filter from "../../../../public/assets/filter.png";
import TableItem from './TableItem';

interface TableProps
{
    title : string;
}

const Table : React.FC<TableProps> = ( {title} ) => {
    const repayments = [
        {
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Disbursed',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Disbursed',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Cancelled',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Disbursed',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Pending',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Cancelled',
            action: 'John Doe',
        },{
            date: '30/10/2024',
            borrower: 'Samuel Doe',
            loanId: '1837993',
            loanType: 'House Loan',
            amount: '150,000,000.56',
            status: 'Cancelled',
            action: 'John Doe',
        }
        
    ];

    return (
        <div className="p-4 bg-white w-[97%] mx-auto rounded-t-2xl rounded shadow-sm mb-4">
            <div className="mb-4 flex justify-between items-center">
                <span className="font-bold text-xl">{title}</span>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 border flex gap-2 border-[#FFC760] items-center text-sm text-[#FFC760] bg-white rounded">
                        Filter
                        <Image src={filter} alt="filter" width={25} height={25} />
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower Name and ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repayment ID & Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repayment Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repayment Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action By</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {repayments.map((repayment, index) => (
                        <TableItem  repayment={repayment}  key={index} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table