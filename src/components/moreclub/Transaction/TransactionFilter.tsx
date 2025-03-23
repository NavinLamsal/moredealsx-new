"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FilterProps {
  // isOpen: boolean;
  // onClose: () => void;
  // onApply: (filters: FilterState) => void;
}

interface FilterState {
  status: string;
  channel: string;
  transactionType: string;
  dateFrom: Date;
  dateTo: Date;
  quickDate: number;
  transactionProperty: string;
}

const statusOptions = ["All", "Pending", "Complete", "Cancelled", "Refunded"];
const channelOptions = ["All", "Web", "App"];
const transactionTypeOptions = ["All", "Debit", "Credit"];
const quickDateOptions = [7, 14, 30];

const FilterComponent: React.FC<FilterProps> = () => {
  const [filters, setFilters] = useState<FilterState>({
    status: "All",
    channel: "All",
    transactionType: "All",
    dateFrom: new Date(),
    dateTo: new Date(),
    quickDate: 7,
    transactionProperty: "",
  });


  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleQuickDateChange = (days: number) => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - days);
    setFilters((prev) => ({
      ...prev,
      dateFrom: pastDate,
      dateTo: today,
      quickDate: days,
    }));
  };

return (
    <div className=" p-6 rounded-lg">

      {/* Status */}
      <div className="mb-4">
        <p className="text-sm font-medium">Status</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {statusOptions.map((option) => (
            <Button
              key={option}
              variant={filters.status === option ? "default" : "outline"}
              onClick={() => handleFilterChange("status", option)}
              className="px-3 py-1 text-sm"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Channel */}
      <div className="mb-4">
        <p className="text-sm font-medium">Channel</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {channelOptions.map((option) => (
            <Button
              key={option}
              variant={filters.channel === option ? "default" : "outline"}
              onClick={() => handleFilterChange("channel", option)}
              className="px-3 py-1 text-sm"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Transaction Type */}
      <div className="mb-4">
        <p className="text-sm font-medium">Transaction Type</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {transactionTypeOptions.map((option) => (
            <Button
              key={option}
              variant={filters.transactionType === option ? "default" : "outline"}
              onClick={() => handleFilterChange("transactionType", option)}
              className="px-3 py-1 text-sm"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-4">
        <p className="text-sm font-medium">Date</p>
        <div className="flex gap-4 mt-2">
          <DatePicker
            selected={filters.dateFrom}
            onChange={(date) => handleFilterChange("dateFrom", date)}
            className="bg-gray-800 text-white p-2 rounded-md w-full"
          />

          <DatePicker
            selected={filters.dateTo}
            onChange={(date) => handleFilterChange("dateTo", date)}
            className="bg-gray-800 text-white p-2 rounded-md w-full"
          />
        </div>

        {/* Quick Date Selection */}
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
      <div className="mb-4">
        <p className="text-sm font-medium">Transaction Property</p>
        <input
          type="text"
          placeholder="e.g. SC No., Customer ID"
          value={filters.transactionProperty}
          onChange={(e) => handleFilterChange("transactionProperty", e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded-md outline-none"
        />
      </div>

      {/* Reset & Apply Buttons */}
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          className="w-1/3"
          onClick={() =>
            setFilters({
              status: "All",
              channel: "All",
              transactionType: "All",
              dateFrom: new Date(),
              dateTo: new Date(),
              quickDate: 7,
              transactionProperty: "",
            })
          }
        >
          RESET
        </Button>
        <Button variant="default" className="w-1/3" >
          APPLY
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;
