"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define unique colors for each category
const categoryColors: Record<string, string> = {
  "Bill Sharing": "#4CAF50", // 🟢 Green
  "Family Expenses": "#2196F3", // 🔵 Blue
  "Lend/Borrow": "#FF9800", // 🟠 Orange
  "Personal Use": "#E91E63", // 🔴 Pink
  "Others": "#9C27B0", // 🟣 Purple
};

// Function to generate random expense data
const generateData = (multiplier: number) => [
  { name: "Bill Sharing", total: Math.floor(Math.random() * 5000 * multiplier) + 1000 },
  { name: "Family Expenses", total: Math.floor(Math.random() * 5000 * multiplier) + 1000 },
  { name: "Lend/Borrow", total: Math.floor(Math.random() * 5000 * multiplier) + 1000 },
  { name: "Personal Use", total: Math.floor(Math.random() * 5000 * multiplier) + 1000 },
  { name: "Others", total: Math.floor(Math.random() * 5000 * multiplier) + 1000 },
];

export function Overview() {
  const [selectedPeriod, setSelectedPeriod] = useState<"weekly" | "monthly" | "yearly">("monthly");

  // Generate data based on the selected period
  const data =
    selectedPeriod === "weekly" ? generateData(0.2) : selectedPeriod === "monthly" ? generateData(1) : generateData(12);

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row justify-between w-full">
        <CardTitle>Overview</CardTitle>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedPeriod("weekly")}>This Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("monthly")}>This Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("yearly")}>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="space-y-4">
          {/* Dropdown Menu for Selecting Timeframe */}
          

          {/* Chart Display */}
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip />

              {/* Single Bar with Dynamic Colors */}
              <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={categoryColors[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

  );
}
