"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FilterIcon,  Search, Mail, Download } from "lucide-react";

interface NetworkLeadFilterProps {
  invalidateKey?: string;
  showDateFilter?: boolean;
  children?: React.ReactNode;
  onDownload?: () => void;
  downloadCondition?: boolean;
  onMessage?: () => void;
  onSelect?: (e:React.ChangeEvent<HTMLInputElement>) => void;
  selectAll?: boolean
}

const NetworkLeadFilter: React.FC<NetworkLeadFilterProps> = ({
  invalidateKey,
  showDateFilter = true,
  children,
  downloadCondition,
  onDownload,
  onMessage,
  onSelect,
  selectAll = false

}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const initialSearch = searchParams.get("q") || "";
  const initialStartDate = searchParams.get("date_from") || null;
  const initialEndDate = searchParams.get("date_to") || null;
  const initialLimit = searchParams.get("limit") || "20";
  const initialTime = searchParams.get("time") || "";

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate ? new Date(initialStartDate) : null);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate ? new Date(initialEndDate) : null);
  const [filterTime, setFilterTime] = useState(initialTime);
  const [limit, setLimit] = useState(initialLimit);
  const [showFilters, setShowFilters] = useState(false);

  const updateUrlParams = (params: { [key: string]: string | null }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    router.push(`?${newParams.toString()}`);
  };

  const handleSearch = () => {
    updateUrlParams({
      q: searchInput,
      date_from: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      date_to: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      limit,
      time: filterTime,
    });
  };

  const clearFilters = () => {
    setSearchInput("");
    setStartDate(null);
    setEndDate(null);
    setFilterTime("");
    setLimit("20");
    router.push("?");
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: [invalidateKey] });
  };



  return (
    <div className="p-4 rounded-lg shadow-none lg:shadow-md space-y-4 bg-card">
      <div className={`${showFilters ? "flex" : "hidden xl:flex"} flex-wrap items-center justify-between space-y-4`}> 
        <div className="flex flex-col items-start">
          <label>Search</label>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Input type="text" placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full" />
            {searchInput && <button onClick={clearFilters} className="text-gray-400 hover:text-white px-2">✖</button>}
            <Button onClick={handleSearch}><Search className="w-4 h-4" /><span className="block lg:hidden">Search</span></Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm">Limit per page</label>
            <select value={limit} onChange={(e) => setLimit(e.target.value)} className="p-1 border border-gray-700 rounded-md bg-inherit">
              {[20, 50, 100, 250, 500, 1000].map((val) => <option key={val} value={val}>{val}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm">By Time</label>
            <select value={filterTime} onChange={(e) => setFilterTime(e.target.value)} className="p-1 border border-gray-700 rounded-md bg-inherit">
              <option value="">Select Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        {(showDateFilter || filterTime === "custom") && (
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm">From</label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" className="p-1 border border-gray-700 rounded-md bg-inherit  w-32" placeholderText="Select start date" maxDate={new Date()} />
            </div>
            <div>
              <label className="block text-sm">To</label>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="yyyy-MM-dd" className="p-1 border border-gray-700 rounded-md bg-inherit w-32" placeholderText="Select end date" minDate={startDate || undefined} maxDate={new Date()} />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Input type="checkbox" checked={selectAll} onChange={onSelect} className="w-5 h-5 accent-blue-600" />
        <span className="text-gray-700 dark:text-gray-300">Select All</span>
      </div>
      
      <div className="flex gap-4">
        {/* <Button onClick={onMessage} disabled={!downloadCondition} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
          <Mail className="w-4 h-4" />
        </Button> */}
        <Button onClick={onDownload} disabled={!downloadCondition} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
          <Download className="w-4 h-4" />
        </Button>
        <Button className="flex xl:hidden" onClick={() => setShowFilters(!showFilters)}>
          <FilterIcon className="w-4 h-4" />
        </Button>
      </div>


      </div>
      
    </div>
  );
};

export default NetworkLeadFilter;
