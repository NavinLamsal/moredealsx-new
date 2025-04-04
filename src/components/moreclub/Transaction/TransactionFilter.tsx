
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import moment from "moment";

interface FilterProps {}

interface FilterState {
  transaction_status: string;
  transaction_type: string;
  start_date: Date | null;
  end_date: Date | null;
  quickDate: number | null;
}

const statusOptions = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Complete", value: "complete" },
  { label: "Refunded", value: "refunded" },
];

const transactionTypeOptions = [
  { label: "All", value: "" },
  { label: "Send", value: "SEND" },
  { label: "Receive", value: "RECEIVE" },
  { label: "Discounts", value: "DISCOUNT" },
];

const quickDateOptions = [7, 14, 30];

const FilterComponent: React.FC<FilterProps> = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<FilterState>({
    transaction_status: "",
    transaction_type: "",
    start_date: null,
    end_date: null,
    quickDate: null,
   
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleQuickDateChange = (days: number) => {
    const today = new Date()
    const pastDate = new Date()
    pastDate.setDate(today.getDate() - days);
    setFilters((prev) => ({
      ...prev,
      start_date: pastDate,
      end_date: today,
      quickDate: days,
    }));
  };


  const handleReset = () => {
    // Reset the filters in state
    setFilters({
      transaction_status: "",
      transaction_type: "",
      start_date: null,
      end_date: null,
      quickDate: null,
    });
  
    // Clear all the query parameters from the URL
    const url = new URL(window.location.href);
    url.search = '';  // This removes all search params
    
    // Push the updated URL (without any search params)
    router.push(url.toString());
  };
  
  const handleApply = () => {
    const query = new URLSearchParams();

    if (filters.transaction_status) query.set("transaction_status", filters.transaction_status);
    if (filters.transaction_type) query.set("transaction_type", filters.transaction_type);
    if (filters.start_date) query.set("start_date", new Date(filters.start_date).toISOString().split("T")[0]);
    if (filters.end_date) query.set("end_date", new Date(filters.end_date).toISOString().split("T")[0]);
    if (filters.quickDate) query.set("quickDate", String(filters.quickDate));

    router.push(`?${query.toString()}`);
  };

  return (
    <div className="p-6 rounded-lg">

      {/* Status Filter */}
      <div className="mb-4">
        <p className="text-sm font-medium">Status</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.transaction_status === option.value ? "default" : "outline"}
              onClick={() => handleFilterChange("transaction_status", option.value)}
              className="px-3 py-1 text-sm"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Transaction Type Filter */}
      <div className="mb-4">
        <p className="text-sm font-medium">Transaction Type</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {transactionTypeOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.transaction_type === option.value ? "default" : "outline"}
              onClick={() => handleFilterChange("transaction_type", option.value)}
              className="px-3 py-1 text-sm"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <p className="text-sm font-medium">Date</p>
        <div className="flex gap-4 mt-2">
          <DatePicker
            selected={filters.start_date}
            placeholderText={`${moment(new Date).format("YYYY-MM-DD")}`}
            // onChange={(date) => handleFilterChange("dateFrom", date)}
            onChange={(date) => {
              const formatted = date && date.toISOString().split("T")[0]; // "yyyy-mm-dd"
              handleFilterChange("start_date", formatted);
            }}
            className="border border-input bg-transparent px-3 py-1 text-base  p-2 rounded-md w-full"
          />
          <DatePicker
            selected={filters.end_date}
            onChange={(date) => {
              const formatted = date && date.toISOString().split("T")[0]; // "yyyy-mm-dd"
              handleFilterChange("end_date", formatted);
            }}
            placeholderText={`${moment(new Date).format("YYYY-MM-DD")}`}
            className="border border-input bg-transparent px-3 py-1 text-base  p-2 rounded-md w-full"
          />
        </div>

        <div className="flex gap-2 mt-3">
          {quickDateOptions.map((days) => (
            <Button
              key={days}
              variant={filters.quickDate === days ? "default" : "outline"}
              onClick={() => handleQuickDateChange(days)}
              className="px-3 py-1 text-sm"
            >
              {days} days
            </Button>
          ))}
        </div>
      </div>

      {/* Transaction Property */}
      

      {/* Reset & Apply Buttons */}
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          className="w-1/3"
          onClick={handleReset}
        >
          RESET
        </Button>
        <Button variant="default" className="w-1/3" onClick={handleApply}>
          APPLY
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;
