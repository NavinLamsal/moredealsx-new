"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { fetchDashboardStats, selectDashboardStats } from "@/lib/redux/slice/DashboardSlice";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import DashboardSectionTitle from "../ui/DashboardSectionTitle";
import { Award, PackageOpen, PiggyBank, Users } from "lucide-react";

const STATIC_STATS = [
  { name: "Total Points", value: "4,420", unit: "pts", icon: <Award/> },
  { name: "Savings This Month", value: "$1,250", unit: "USD", icon: <PiggyBank/> },
  { name: "Active Deals", value: "18", unit: "deals", icon: <PackageOpen/> },
  { name: "Network Size", value: "44", unit: "people", icon: <Users/> },
];

const STATIC_MEMBERSHIPS = [
  { title: "Restaurants", icon: "🍽️", points: "4,200 pts", tier: "Gold Tier", tierColor: "destructive" },
  { title: "Hotels", icon: "🏨", points: "3,750 pts", tier: "Silver Tier", tierColor: "muted" },
  { title: "Salons", icon: "✂️", points: "2,980 pts", tier: "Silver Tier", tierColor: "muted" },
  { title: "Stores", icon: "🛍️", points: "1,850 pts", tier: "Bronze Tier", tierColor: "secondary" },
];

const SkeletonGrid = ({ count = 4 }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-5 mb-5">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="bg-card rounded-xl p-5 shadow-md shadow-black/30 border-l-4 border-primary dark:shadow-white/30 animate-pulse"
      >
        <div className="h-3 w-20 bg-muted rounded mb-2"></div>
        <div className="flex items-baseline gap-1">
          <div className="h-6 w-14 bg-muted rounded"></div>
          <div className="h-3 w-6 bg-muted rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const Stat = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector(selectDashboardStats);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const { mergedStats, updatedMemberships } = useMemo(() => {
    if (!data) {
      return { mergedStats: STATIC_STATS, updatedMemberships: STATIC_MEMBERSHIPS };
    }

    return {
      mergedStats: [
        { name: "Total Points", value: data.total_points?.toLocaleString() || "0", unit: "pts", icon: <Award/>},
        { name: "Savings This Month", value: data.total_savings?.toLocaleString() || "0", unit: data.currency_symbol.toString() || "SEK" ,  icon: <PiggyBank/>},
        { name: "Active Memberships", value: data.active_deals?.toLocaleString() || "0", unit: "deals", icon: <PackageOpen/> },
        { name: "Network Size", value: data.network_size?.toLocaleString() || "0", unit: "people" ,icon: <Users/>  },
      ],
      updatedMemberships: [
        { title: "Restaurants", icon: "🍽️", points: `${data.total_points_restaurants?.toLocaleString() || 0} pts`, tier: "Gold Tier", tierColor: "destructive" },
        { title: "Hotels", icon: "🏨", points: `${data.total_points_hotel?.toLocaleString() || 0} pts`, tier: "Silver Tier", tierColor: "muted" },
        { title: "Salons", icon: "✂️", points: `${data.total_points_saloon?.toLocaleString() || 0} pts`, tier: "Silver Tier", tierColor: "muted" },
        { title: "Stores", icon: "🛍️", points: `${data.total_points_marketplace?.toLocaleString() || 0} pts`, tier: "Bronze Tier", tierColor: "secondary" },
      ],
    };
  }, [data]);

  if (loading) return <SkeletonGrid />;
  if (error) return null;

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-5 mb-5">
        {mergedStats.map((item, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-5 shadow-md shadow-black/30 border-l-4 border-primary dark:shadow-white/30"
          >
            <h3 className="text-sm flex justify-between items-center text-muted-foreground mb-2 uppercase font-medium">
             <span>{item.name}</span> 
              {item.icon}
            </h3>
            <div className="text-2xl font-extrabold text-primary">
              {item.value}{" "}
              <span className="text-xs font-extrabold text-foreground">
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Memberships */}
      <div>
        <DashboardSectionTitle title="Your Memberships" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10 gap-4">
          {updatedMemberships.map((membership, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden shadow-sm shadow-black/30 dark:shadow-white/30"
            >
              <div className="bg-primary text-primary-foreground text-center p-4">
                <h3 className="font-semibold uppercase">{membership.title}</h3>
              </div>
              <div className="p-5 text-center">
                <div className="text-4xl text-primary mb-4">{membership.icon}</div>
                <div className="text-2xl font-extrabold text-foreground mb-3">{membership.points}</div>
                {/* <span
                  className={`px-2 py-2.5 bg-${membership.tierColor} text-${membership.tierColor}-foreground rounded-full text-sm font-extrabold uppercase`}
                >
                  {membership.tier}
                </span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stat;
