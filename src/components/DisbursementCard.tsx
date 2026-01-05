// Card.tsx
import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CardProps {
    title: string;
    value: string;
    date: string;
    amount: string
    change?: string;
}

const DisbursementCard: React.FC<CardProps> = ({ title, value, amount, date, change }) => {
    const dateOptions = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days"];

    // Split the ntitle into the first word and the rest
    const [firstWord, ...restOfTitle] = title.split(" ");

    return (
        <div className="p-4 bg-white rounded shadow-sm text-[13px] font-light">
            <div className="flex justify-between items-center">
                <span className="whitespace-pre-wrap">
                    {firstWord} <br/> {restOfTitle.join(" ")}
                </span>
                <Select defaultValue={date}>
                    <SelectTrigger className="font-bold border rounded p-[0.25rem] w-24 h-8 text-xs border-[#FFD280] text-[#FFD280] bg-white focus:outline-none">
                        <SelectValue placeholder="Select Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Date Range</SelectLabel>
                            {dateOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between my-2">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm font-light">
                    ₦{amount}
                </div>
            </div>
            <div className="text-sm">
                <span className="bg-green-200 text-green-600 rounded-full px-2 py-1 inline-block">
                    +{change}
                </span>
            </div>
        </div>
    );
};

export default DisbursementCard;