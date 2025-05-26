"use client";
import { fetchBusinessData } from "@/lib/action/moreClub/Business";
import { useAppSelector } from "@/lib/redux/hooks";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BusinessProfileCard from "./BusinessProfileCard";
import BusinessQuickLinks from "./BusinessQuickLinks";
import BusinessProfileSkeleton from "../Skeletons/BusinessProfileSkeleton";

const BusinessContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const business = useAppSelector((state: RootState) => state.business);
  useEffect(() => {
    dispatch(fetchBusinessData({ fetchForce: false }));
  }, [dispatch]);

  if (business.isLoading) {
    return <BusinessProfileSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 min-[950px]:grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-2 items-start">
      <BusinessProfileCard />
      <div>
        <BusinessQuickLinks />
      </div>
    </div>
  );
};

export default BusinessContent;
