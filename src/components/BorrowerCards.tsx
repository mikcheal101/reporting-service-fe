// Card.tsx
import React from "react";

interface CardProps {
    title: string;
    value: string;
    change?: string;
}

const BorrowerCards: React.FC<CardProps> = ({ title, value,  change }) => {
    const dateOptions = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days"];

    // Split the title into the first word and the rest
    const [firstWord, ...restOfTitle] = title.split(" ");

    return (
        <div className="p-4 bg-white rounded shadow-sm text-[13px] font-light">
            <div className="flex justify-between items-center">
                <span className="whitespace-pre-wrap">
                    {firstWord} <br/> {restOfTitle.join(" ")}
                </span>
            </div>
            <div className="text-2xl font-bold my-2">{value}</div>
            <div className="text-sm">
                <span className="bg-green-200 text-green-600 rounded-full px-2 py-1 inline-block">
                    +{change}
                </span>
            </div>
        </div>
    );
};

export default BorrowerCards;