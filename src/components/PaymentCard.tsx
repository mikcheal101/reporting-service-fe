import React from "react";

interface CardProps {
    title: string;
    amount: string;
    change?: string;
    count: number;
}

const Card: React.FC<CardProps> = ({ title, amount,  change, count }) => {
    const dateOptions = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days"];

    // Split the title into the first word and the rest
    const [firstWord, ...restOfTitle] = title.split(" ");

    return (
        <div className="p-4 bg-white rounded shadow-sm text-[13px] font-light">
            <div className="flex justify-between items-center">
                <span className={`${(firstWord === "Pending" || title === "Total Overdue") ? "text-[#B01212]" : "text-[#7D7D7D]"}  whitespace-pre-wrap`}>
                    {firstWord} <br/>{restOfTitle.join(" ")}
                </span>
                <div>
                    <div className="" >
                        <select name="dateOptions" id="dateOptions" className="border border-[#FFA500] py-2 px-3 bg-inherit text-[#FFA500] rounded-sm outline-none">
                            {dateOptions.map((date, index)=>(<option key={index} className="text-sm" value={date}>{date}</option>))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-center" >
                <div className={`${(firstWord === "Pending" || title === "Total Overdue") && "text-[#B01212]"} text-2xl font-bold my-2`}>{count}</div>
                <div className={`${(firstWord === "Pending" || title === "Total Overdue") ? "text-[#B01212]" : "text-[#7D7D7D]" } ml-auto font-medium text-base`}>{amount}</div>
            </div>
            <div className="text-sm">
                <span className="bg-green-200 text-green-600 rounded-full px-2 py-1 inline-block">
                    +{change}
                </span>
            </div>
        </div>
    );
};

export default Card;