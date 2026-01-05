"use client"
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    // Dropdown state to manage selected time period
    const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'monthly' | 'yearly'>('yearly');

    // Chart Data for each time period
    const dataMap: Record<string, ChartData<'bar'>> = {
        daily: {
            labels: ['Sep 23', 'Sep 24', 'Sep 25', 'Sep 26', 'Sep 27', 'Sep 28', 'Sep 29', 'Sep 30', 'Oct 01'],
            datasets: [
                {
                    label: 'Paid',
                    data: [200000, 150000, 300000, 100000, 500000, 200000, 800000, 1000000, 500000],
                    backgroundColor: '#00C853', 
                    borderRadius: 6,
                    categoryPercentage: 0.2,
                    barPercentage: 0.5
                    
                },
                {
                    label: 'Unpaid',
                    data: [100000, 50000, 200000, 75000, 300000, 150000, 400000, 700000, 400000],
                    backgroundColor: '#FFA500', 
                    borderRadius: 6,
                    categoryPercentage: 0.2,
                    barPercentage : 0.5
                    
                },
            ],
        },
        monthly: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Paid',
                    data: [1000000, 2000000, 1500000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000, 5500000, 6000000, 7000000],
                    backgroundColor: '#00C853',
                    borderRadius: 6,
                    categoryPercentage: 0.2,
                    barPercentage: 0.7
                },
                {
                    label: 'Unpaid',
                    data: [500000, 1000000, 800000, 1200000, 1500000, 2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5000000],
                    backgroundColor: '#FFA500',
                    borderRadius: 6,
                    categoryPercentage: 0.2,
                    barPercentage: 0.7
                },
            ],
        },
        yearly: {
            labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Paid',
                    data: [8500000, 5500000, 7500000, 10000000, 15000000, 5000000, 10000000, 14000000],
                    backgroundColor: '#00C853',
                    borderRadius: 6,
                    categoryPercentage: 0.2,
                    barPercentage: 0.5
                    
                },
                {
                    label: 'Unpaid',
                    data: [9000000, 7000000, 9000000, 10000000, 12000000, 4500000, 5800000, 10000000],
                    backgroundColor: '#FFA500',
                    borderRadius: 6,
                    categoryPercentage: 0.2,
                    barPercentage: 0.5
                    
                },
            ],
        },
    };

    // Dynamic chart data based on selected period
    const data: ChartData<'bar'> = dataMap[selectedPeriod];

    // Chart options
    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false, // Disable aspect ratio to control height/width
        plugins: {
            legend: {
                position: 'top', // Legend position
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let value = context.raw as number;
                        return `N${value.toLocaleString()}`; // Format values as currency
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, 
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    // stepSize : 50,
                    callback: (value) => {
                        if (Number(value) >= 1000000) {
                            return `${Number(value) / 1000000}m`;
                        } else if (Number(value) >= 1000) {
                            return `${Number(value) / 1000}k`; 
                        }
                        return value;
                    },
                },
                
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded shadow-md flex w-[97%] mx-auto h-[225px] mb-5">
            <div className='w-[80%] pr-4'>
              <Bar data={data} options={options} />
            </div>
            <div className=" flex flex-col justify-between ml-auto pr-2">
                <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value as 'daily' | 'monthly' | 'yearly')}
                    className="border border-[#FFCD71] py-2 px-3 bg-inherit text-[#454545] font-normal rounded-sm outline-none "
                >
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>

                <div className="text-lg font-medium text-right mb-4 "><span className="block text-[#7D7D7D] text-lg font-medium">Paid vs Unpaid</span> <span className="block text-[#7D7D7D] text-lg font-medium">Delinquency Loan</span></div>
            </div>
            
        </div>
    );
};

export default BarChart;