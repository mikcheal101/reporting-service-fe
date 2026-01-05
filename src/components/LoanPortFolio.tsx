"use client"

import React, { useState } from "react";
import { Pie, PieChart, LabelList } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { category: "Car Loans", percentage: 35, fill: "hsl(var(--chart-1))" },
  { category: "Business Loans", percentage: 25, fill: "hsl(var(--chart-2))" },
  { category: "House Loans", percentage: 40, fill: "hsl(var(--chart-3))" },
  { category: "Other Loans", percentage: 15, fill: "hsl(var(--chart-4))" },
];

const LoanPieChart: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>("");

  return (
    <Card className="p-4 bg-white rounded shadow-sm w-full">
      <CardHeader className="flex justify-between items-center pb-4">
        <CardTitle>Loan Portfolios</CardTitle>
        <Select
          onValueChange={(value) => setSelectedRange(value)}
        >
          <SelectTrigger className="w-[150px] text-sm border rounded p-1">
            <SelectValue placeholder="Select Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Date Range</SelectLabel>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="Yesterday">Yesterday</SelectItem>
              <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
              <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex justify-center">
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            dataKey="percentage"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="currentColor"
          >
           <LabelList
              dataKey="category"
              position="outside"
              formatter={(value: string, entry: any) =>
              `${value}: ${entry?.percentage ?? 0}%`
           }
            style={{ fontSize: 12, fill: "#0e0e0e" }}
          />

          </Pie>
        </PieChart>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <div>Showing loan distribution by categories</div>
      </CardFooter>
    </Card>
  );
};

export default LoanPieChart;
