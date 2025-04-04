"use client";


import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { UpdateSelectedtime } from "@/lib/redux/slice/WalletSlice";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

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
  const dispatch = useAppDispatch();
  const wallet = useAppSelector((state) => state.wallet);
  const { transactions, selectedtime } = useSelector(
    (state: RootState) => state.wallet
  );  

 


  const generateData = (value: 'today'| 'week' | 'month' | 'year') => {
    const currentTransaction = transactions[value];
    return[
    { name: "Bill Sharing", total: currentTransaction.chart_data.bill_sharing_transaction_sums },
    { name: "Family Expenses", total: currentTransaction.chart_data.family_expenses_transaction_sums },
    { name: "Lend/Borrow", total: currentTransaction.chart_data.lend_borrow_transaction_sums },
    { name: "Personal Use", total: currentTransaction.chart_data.personal_use_transaction_sums },
    { name: "Others", total: currentTransaction.chart_data.others_transaction_sums },
  ];}
 
  // Generate data based on the selected period
  const data =generateData(selectedtime)


  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row justify-between w-full">
        <CardTitle>Overview</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{wallet.selectedtime.charAt(0).toUpperCase() + wallet.selectedtime.slice(1)}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => dispatch(UpdateSelectedtime("today"))}>Today</DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch(UpdateSelectedtime("week"))}>This Week</DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch(UpdateSelectedtime("month"))}>This Month</DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch(UpdateSelectedtime("year"))}>This Year</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="space-y-4">
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
