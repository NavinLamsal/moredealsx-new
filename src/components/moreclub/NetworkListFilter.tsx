"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterProps {
  onClose?: () => void;
}

interface FilterState {
  q: string;
  date_from: Date | null;
  date_to: Date | null;
  time: string | null;
  limit: string;
  list_type: string;
}

const quickDateOptions = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
  { label: "Custom", value: "custom" },
];

const listTypeOptions = [
    { label: "All", value: "" },
    { label: "Email", value: "email" },
    { label: "Phone Number", value: "phone" },
  ];

const listLimits = ["10", "25", "50", "100"];

const FilterComponent: React.FC<FilterProps> = ({ onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL
  const getInitialState = (): FilterState => {
    const time = searchParams.get("time");
    let date_from: Date | null = null;
    let date_to: Date | null = null;

    if (time === "custom") {
      const fromStr = searchParams.get("date_from");
      const toStr = searchParams.get("date_to");

      if (fromStr) date_from = moment(fromStr).toDate();
      if (toStr) date_to = moment(toStr).toDate();
    } else if (time) {
      const today = new Date();
      switch (time) {
        case "today":
          date_from = date_to = today;
          break;
        case "week":
          date_from = moment().startOf("week").toDate();
          date_to = moment().endOf("week").toDate();
          break;
        case "month":
          date_from = moment().startOf("month").toDate();
          date_to = moment().endOf("month").toDate();
          break;
        case "year":
          date_from = moment().startOf("year").toDate();
          date_to = moment().endOf("year").toDate();
          break;
      }
    }

    return {
      q: searchParams.get("q") || "",
      date_from,
      date_to,
      time: time || null,
      limit: searchParams.get("limit") || "25",
      list_type: searchParams.get("list_type") || "",
    };
  };

  const [filters, setFilters] = useState<FilterState>(getInitialState);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleQuickDateChange = (value: string) => {
    const today = new Date();
    let start: Date | null = null;
    let end: Date | null = null;

    switch (value) {
      case "today":
        start = end = today;
        break;
      case "week":
        start = moment().startOf("week").toDate();
        end = moment().endOf("week").toDate();
        break;
      case "month":
        start = moment().startOf("month").toDate();
        end = moment().endOf("month").toDate();
        break;
      case "year":
        start = moment().startOf("year").toDate();
        end = moment().endOf("year").toDate();
        break;
      case "custom":
        start = null;
        end = null;
        break;
    }

    setFilters((prev) => ({
      ...prev,
      time: value,
      date_from: start,
      date_to: end,
    }));
  };



  const handleReset = () => {
    setFilters({
      q: "",
      date_from: null,
      date_to: null,
      time: null,
      limit: "25",
      list_type: "",
    });

    const url = new URL(window.location.href);
    url.search = "";
    router.push(url.toString());

    onClose?.();
  };

  const handleApply = () => {
    const query = new URLSearchParams();

    if (filters.q && filters.q !== "") query.set("q", filters.q);
    if (filters.date_from)
      query.set("date_from", moment(filters.date_from).format("YYYY-MM-DD"));
    if (filters.date_to)
      query.set("date_to", moment(filters.date_to).format("YYYY-MM-DD"));
    if (filters.time) query.set("time", filters.time);
    if (filters.limit) query.set("limit", filters.limit);
    if (filters.list_type && filters.list_type !== "") query.set("list_type", filters.list_type);
    

    router.push(`?${query.toString()}`);
    onClose?.();
  };

  return (
    <div className="p-6 rounded-lg space-y-4">
      {/* Search Field */}
      <div>
        <p className="text-sm font-medium">Search (Email / Phone)</p>
        <Input
          type="text"
          placeholder="Enter email or phone..."
          value={filters.q}
          onChange={(e) => handleFilterChange("q", e.target.value)}
        />
      </div>


      <div>
        <p className="text-sm font-medium">List Type</p>
        <div className="flex gap-2 flex-wrap mt-2">
          {listTypeOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.list_type === option.value ? "default" : "outline"}
              onClick={() => handleFilterChange("list_type", option.value)}
              className="px-3 py-1 text-sm"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Time Quick Select */}
      <div>
        <p className="text-sm font-medium">Time</p>
        <div className="flex gap-2 flex-wrap mt-2">
          {quickDateOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.time === option.value ? "default" : "outline"}
              onClick={() => handleQuickDateChange(option.value)}
              className="px-3 py-1 text-sm"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {filters.time === "custom" && (
          <div className="flex gap-4 mt-3">
            <DatePicker
              selected={filters.date_from}
              onChange={(date) => handleFilterChange("date_from", date)}
              placeholderText="Start date"
              className="border border-input px-3 py-2 rounded-md w-full"
            />
            <DatePicker
              selected={filters.date_to}
              onChange={(date) => handleFilterChange("date_to", date)}
              placeholderText="End date"
              className="border border-input px-3 py-2 rounded-md w-full"
            />
          </div>
        )}
      </div>

      {/* List Limit */}
      <div>
        <p className="text-sm font-medium">Results per page</p>
        <Select
          value={filters.limit}
          onValueChange={(val) => handleFilterChange("limit", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            {listLimits.map((val) => (
              <SelectItem key={val} value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" className="w-1/3" onClick={handleReset}>
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
