"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const DelinquencyRateChart = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<"1m" | "6m" | "1y">("1m");

    const dataMap = {
        "1m": [
            { date: "Jan 2023", value: 5000 },
            { date: "Feb 2023", value: 10000 },
            { date: "Mar 2023", value: 15000 },
            { date: "Apr 2023", value: 20000 },
            { date: "May 2023", value: 25000 },
            { date: "Jun 2023", value: 30000 },
            { date: "Jul 2023", value: 35000 },
            { date: "Aug 2023", value: 40000 },
            { date: "Sep 2023", value: 45000 },
            { date: "Oct 2023", value: 50000 },
            { date: "Nov 2023", value: 55000 },
            { date: "Dec 2023", value: 60000 },
        ],
        "6m": [
            { date: "Jul 2023", value: 30000 },
            { date: "Aug 2023", value: 40000 },
            { date: "Sep 2023", value: 45000 },
            { date: "Oct 2023", value: 50000 },
            { date: "Nov 2023", value: 55000 },
            { date: "Dec 2023", value: 60000 },
        ],
        "1y": [
            { date: "2017", value: 0 },
            { date: "2018", value: 10000 },
            { date: "2019", value: 20000 },
            { date: "2020", value: 40000 },
            { date: "2021", value: 30000 },
            { date: "2022", value: 60000 },
            { date: "2023", value: 80000 },
            { date: "2024", value: 100000 },
        ],
    };

    const handlePeriodChange = (period: "1m" | "6m" | "1y") => {
        setSelectedPeriod(period);
    };

    const currentData = dataMap[selectedPeriod];

    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle>Delinquency Rate Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2 mb-4">
                    {["1m", "6m", "1y"].map((period) => (
                        <Button
                            key={period}
                            onClick={() => handlePeriodChange(period as "1m" | "6m" | "1y")}
                            variant="outline"
                            className={clsx("bg-white text-black", {
                                "bg-green-500 text-white": selectedPeriod === period,
                            })}
                        >
                            {period === "1m" && "1 Month"}
                            {period === "6m" && "6 Months"}
                            {period === "1y" && "1 Year"}
                        </Button>
                    ))}
                </div>
                <div className="w-full h-72">
                    <ResponsiveContainer>
                        <LineChart
                            data={currentData}
                            margin={{ top: 20, right: 20, left: 15, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis
                                tickFormatter={(value: number) => `$${value.toLocaleString()}`}
                            />
                            <Tooltip
                                formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                                labelStyle={{ fontWeight: "bold" }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#90EE90" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default DelinquencyRateChart;