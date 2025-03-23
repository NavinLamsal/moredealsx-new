"use client";

import { updateSelectionData } from "@/lib/redux/slice/NetworkSlice";
import { RootState } from "@/lib/redux/store";
import React, { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NetworkCard from "../cards/NetworkCard";
import NetworkLeadFilter from "./NetworkFilter";
import { NetworkUser } from "@/lib/type/moreclub/Network";
import { Input } from "../ui/input";
import { Download, Mail } from "lucide-react";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";



interface NetworkRow {
    user: NetworkUser;
}

interface MetaData {
    count: number;
    total_pages: number;
}

interface NetworkTableProps {
    list: NetworkRow[];
    meta: MetaData;
}

const NetworkTable: React.FC<NetworkTableProps> = ({ list, meta }) => {
    const dispatch = useDispatch();
    //   const { permissions, isLoading, isError } = usePermissions();
    const selectedRows = useSelector((state: RootState) => state.network.selectedList);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    // Handle Select All
    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSelection = e.target.checked ? [...list.map((row) => row.user)] : [];
        dispatch(updateSelectionData(newSelection));
        setSelectAll(e.target.checked);
    };

    // Handle Download CSV
      const handleDownloadCSV = () => {
        const selectedData = selectedRows.map((row) => [row.first_name + " " + row.last_name, row.email, row.phone_number]);

        const ws = XLSX.utils.aoa_to_sheet([["Name", "Email", "Phone"], ...selectedData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SelectedData");
        XLSX.writeFile(wb, "network_list.xlsx");
      };

    //   if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    //   if (isError) return <UniversalErrorbox message="Error fetching permissions" />;

    return (
        <div className="space-y-4">
            {/* Filters & Actions */}
            <Suspense fallback={<div>Loading...</div>}>
            <NetworkLeadFilter onSelect={toggleSelectAll} selectAll={selectAll}
            onDownload={handleDownloadCSV}
            downloadCondition={selectedRows.length > 0}
            
            >
                <>
                    <div className="flex gap-2 items-center">
                        <Input type="checkbox" checked={selectAll} onChange={toggleSelectAll} className="w-5 h-5 accent-blue-600" />
                        <span className="text-gray-700 dark:text-gray-300">Select All</span>
                    </div>
                    <div className="flex gap-4">
                        {/* {permissions?.send_sms_refer && ( */}
                        <Button disabled={selectedRows.length === 0} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                            <Mail className="w-4 h-4" />
                        </Button>
                        {/* )} */}
                        {/* {permissions?.download && ( */}
                        <Button
                            onClick={handleDownloadCSV}
                            disabled={selectedRows.length === 0}
                            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                            <Download className="w-4 h-4" />
                        </Button>
                        {/* )} */}
                    </div>
                </>
            </NetworkLeadFilter>
            </Suspense>
            


            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:p-4">
                {list.length > 0 ? (
                    list.map((row) =>
                        <>
                            <NetworkCard key={row.user.username} user={row.user} />
                        </>
                    )
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No referrals found</p>
                )}
            </div>


            {/* Pagination */}
            {meta?.count > 0 && (
                <div className="mt-4">
                    {/* <Pagination totalItems={meta.count} totalPages={meta.total_pages} itemsPerPage={20} /> */}
                </div>
            )}
        </div>
    );
};

export default NetworkTable;
