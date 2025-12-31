import React from 'react'
import CardList from '@/components/CardList'
import BarChart from '@/components/BarChart'
import Table from './Table'

const Repayment = () => {
    const cardItems = [
        {
            title:"Total Repayment",
            amount:"₦160,000,000.69", 
            change:"8%",
            count: 100
        },
        {
            title:"Total Overdue",
            amount:"₦30,000,000.69",
            change:"8%",
            count: 47
        },
        {
            title:"Total Outstanding", 
            amount:"₦130,000,000.69", 
            change:"8%",
            count: 53,
        },
        {
            title:"Delinquent Payment", 
            amount:"₦17,000", 
            change:"8%",
            count: 0,
        }

    ]
  return (
    <div className='font-poppins'>
        <CardList cardItems={cardItems} />
        <BarChart />
        <Table title='Repayment' />
    </div>
  )
}

export default Repayment