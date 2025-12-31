import React from 'react'

interface Repayment
{
    date: string;
    borrower: string;
    loanId: string
    loanType: string;
    amount: string;
    status: string;
    action: string;
}


interface TableItemProps
{
    repayment : Repayment;
}


const TableItem : React.FC<TableItemProps> = ( { repayment } ) => {
  return (
    <>
    <tr className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{repayment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{repayment.borrower}</td>
                            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{repayment.loanId} <br/> {repayment.loanType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{repayment.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span
                                className={`inline-block text-xs px-2 py-1 rounded-full ${repayment.status === 'Pending' ? 'bg-[#F04438] text-white' : repayment.status === 'Disbursed' ? 'bg-green-800 text-green-200' : 'bg-gray-500 text-white'}`}>
                            {repayment.status}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{repayment.action}</td>
                        </tr>
    </>
  )
}

export default TableItem