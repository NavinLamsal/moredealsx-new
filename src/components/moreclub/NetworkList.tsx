"use client";
import { useFetchNetworks } from "@/lib/action/moreClub/Network";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import NetworkTable from "./NetworkTable";
import NetworkLeadFilter from "./NetworkFilter";
import NetworkSkeleton from "../Skeletons/NetworkSkeleton";

const NetworkList = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const offset = Number(searchParams.get("offset")) || 0;
  const queryParams = {
    page,
    limit,
    offset,
    query: searchParams.get("q") || "",
    time: searchParams.get("time") || "",
    date_from: searchParams.get("date_from") || "",
    date_to: searchParams.get("date_to") || "",
  };

  const { fetchNetworkList } = useFetchNetworks();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["referals", queryParams],
    queryFn: () => fetchNetworkList(queryParams),
    staleTime: 360000,
  });

  if (isLoading) {
    return (
      <>
        {" "}
        <Suspense fallback={<div>Loading...</div>}>
          <NetworkLeadFilter></NetworkLeadFilter>
        </Suspense>
        <NetworkSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <NetworkLeadFilter></NetworkLeadFilter>
        </Suspense>
        <p>error</p>
      </>
    );
  }

  return (
    <>
      {data && data.data && data.data.length > 0 && (
        <NetworkTable list={data.data} meta={data.meta} />
      )}
      {data && data.data && data.data.length === 0 && (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <NetworkLeadFilter></NetworkLeadFilter>
          </Suspense>
          <p className="text-center mb-10">No Referals found</p>
          <NetworkSkeleton />
        </>
      )}
    </>
  );
};

export default NetworkList;
