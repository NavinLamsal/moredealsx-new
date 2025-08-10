"use client";

import { updateSelectionData } from "@/lib/redux/slice/NetworkSlice";
import { RootState } from "@/lib/redux/store";
import React, { Suspense, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NetworkCard from "../cards/NetworkCard";
import { NetworkUser } from "@/lib/type/moreclub/Network";
import { Input } from "../ui/input";
import { Download, FilterIcon, Mail } from "lucide-react";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import FilterComponent from "./NetworkListFilter";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import NetworkSkeleton from "../Skeletons/NetworkSkeleton";

interface NetworkRow {
  id: string;
  user: NetworkUser;
  created: string;
}

interface MetaData {
  count: number;
  total_pages: number;
}


interface NetworkTableProps {
  list: NetworkRow[];
  meta?: MetaData;
  isLoading?: boolean;
  isError?: boolean;
}

const NetworkTable: React.FC<NetworkTableProps> = ({ list, meta, isLoading, isError }) => {
  const dispatch = useDispatch();
  const selectedRows = useSelector((state: RootState) => state.network.selectedList);
  const [selectAll, setSelectAll] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelection = e.target.checked ? list.map((row) => row.user) : [];
    dispatch(updateSelectionData(newSelection));
    setSelectAll(e.target.checked);
  };

  const handleDownloadCSV = () => {
    const selectedData = selectedRows.map((row) => [
      row.first_name + " " + row.last_name,
      row.email,
      row.phone_number,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([["Name", "Email", "Phone"], ...selectedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SelectedData");
    XLSX.writeFile(wb, "network_list.xlsx");
  };

  const filterSummary = useMemo(() => {
    const filters: string[] = [];
    const q = searchParams.get("q");
    const time = searchParams.get("time");
    const date_from = searchParams.get("date_from");
    const date_to = searchParams.get("date_to");
    const transaction_status = searchParams.get("transaction_status");
    const transaction_type = searchParams.get("transaction_type");

    if (q) filters.push(`Search: ${q}`);
    if (transaction_status) filters.push(`Status: ${transaction_status}`);
    if (transaction_type) filters.push(`Type: ${transaction_type}`);
    if (time && time !== "custom") filters.push(`Time: ${time}`);
    if (date_from && date_to)
      filters.push(`Date: ${moment(date_from).format("YYYY-MM-DD")} to ${moment(date_to).format("YYYY-MM-DD")}`);

    return filters.length > 0 ? filters.join(", ") : null;
  }, [searchParams]);

  return (
    <div className="space-y-4">
      {/* Top bar with actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 items-center">
          <Input
            type="checkbox"
            checked={selectAll}
            onChange={toggleSelectAll}
            className="w-5 h-5 accent-blue-600"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Select All</span>
        </div>
        <div className="flex gap-2 items-center">

          <Button
            disabled={selectedRows.length === 0}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
          >
            <Mail className="w-4 h-4" />
          </Button>

          <Button
            onClick={handleDownloadCSV}
            disabled={selectedRows.length === 0}
            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
          >
            <Download className="w-4 h-4" />
          </Button>

          <div className="">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button size="icon">
                  <FilterIcon className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>Filter Referrals</SheetTitle>
                </SheetHeader>
                <FilterComponent onClose={() => setIsFilterOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {filterSummary && (
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-gray-700 dark:text-gray-200">Filters:</span> {filterSummary}
        </div>
      )}

      {/* Content Area */}
      {isLoading ? (
        <NetworkSkeleton />
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load referrals.</p>
      ) : list.length === 0 ? (
        <p className="text-center mb-10">No referrals found.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:p-4">
          {list.map((row) => (
            <NetworkCard key={row.user.username} user={row.user} id={row.id} />
          ))}
        </div>
      )}

      {/* {meta?.count > 0 && (
        <div className="mt-4">


        </div>
      )} */}
    </div>
  );
};

export default NetworkTable;