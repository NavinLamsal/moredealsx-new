"use client";

import { useFetchNetworks } from "@/lib/action/moreClub/Network";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import NetworkTable from "./NetworkTable";


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
    list_type: searchParams.get("list_type") || "",
  };

  const { fetchNetworkList } = useFetchNetworks();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["referals", queryParams],
    queryFn: () => fetchNetworkList(queryParams),
    staleTime: 360000,
  });

  return (
    <NetworkTable
      list={data?.data || []}
      meta={data?.meta}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default NetworkList;
