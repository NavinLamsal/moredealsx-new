"use client";
// import PopularResturantsCard from "@/components/cards/PopularResturantsCard";
import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { CardSkeleton } from "../Skeletons/CardSkeleton";
import SalonCard from "./cards/SalonCard2";
import { SaloonTypes } from "@/lib/type/moresalons/salon";
import { useFetchSalon } from "@/lib/action/moreSalon/salonlist";
import AnimatedSection from "../ui/animations/FadeUpView";
import HorizontalCarousel from "../carousel/horizontalCarousel";

const Salons = ({ Dashboard }: { Dashboard?: boolean }) => {

  const { fetchPopularSalonList } = useFetchSalon()


  const { data, error, isLoading } = useQuery({
    queryKey: ["Popular Salon", 1],
    queryFn: () => fetchPopularSalonList(),
    staleTime: 6000,
  });

  if (isLoading) {
    return (
      <div>
        <CardSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }


  if (!data || data.data.length === 0) {
    return null;
  }


  return (
    <div className="p-1 lg:p-4">
      <HorizontalCarousel center={Dashboard ? false : true} dashboard={Dashboard} title="Salons & Spas" viewAll="/moresalon/category/featured-salons?title=Featured Salons">
        {data.data.map((item: SaloonTypes, index: number) => (
          <div className="flex-shrink-0 w-60" key={item.id}>
            <AnimatedSection key={item.id} index={index}>
              <SalonCard key={item.id} {...item} />
            </AnimatedSection>
          </div>
        ))}
      </HorizontalCarousel>
    </div>
  );
};


export default Salons;
