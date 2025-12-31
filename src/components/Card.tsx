import React from "react";
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
    change?: string;
}

const Card: React.FC<CardProps> = ({ title, value, date, change }) => {
    const dateOptions = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days"];

    // Split the title into the first word and the rest
    const [firstWord, ...restOfTitle] = title.split(" ");

    return (
        <div className="p-3 sm:p-4 bg-white rounded shadow-sm text-xs sm:text-[13px] font-light">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="whitespace-pre-wrap text-xs sm:text-sm flex-1 min-w-0">
                    {firstWord} <br /> {restOfTitle.join(" ")}
                </span>
                <Select defaultValue={date}>
                    <SelectTrigger className="font-bold border rounded p-[0.25rem] w-20 sm:w-24 h-7 sm:h-8 text-xs border-[#FFD280] text-[#FFD280] bg-white focus:outline-none flex-shrink-0">
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
            <div className="text-lg sm:text-2xl font-bold my-2">{value}</div>
            <div className="text-xs sm:text-sm">
                {change && (
                    <span className="bg-green-200 text-green-600 rounded-full px-2 py-1 inline-block text-xs">
                        +{change}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Card;