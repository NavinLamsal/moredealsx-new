"use client";
import { Clock } from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
// import { ArrangedWorkingDayData, Resturant } from "@/lib/Type";
// import { ContainerSkeleton } from "@/components/ui/Skeletions";
// import { fetchResturantsWorkingsHours } from "@/lib/action/resturant";
import { useQuery } from "@tanstack/react-query";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import { ContainerSkeleton } from "@/components/MapBox/Skeletons";
import { OpeningHours  as OpeningHoursType} from "@/lib/type/morefood/restaurant";
import Heading from "@/components/ui/heading";

const daysOfWeek: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const OpeningHours = ({ id }: { id: string }) => {
     const { fetchRestaurantOpeningHours} = useFetchRestaurant()
  const [showAllOpening, setShowallOpening] = useState(false);
  const {
    data: details,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`working hours for , ${id}`],
    queryFn: () => fetchRestaurantOpeningHours(id),
    staleTime: 10000, // 1 second stale time
  });

  if (isLoading) {
    return <ContainerSkeleton />;
  }

  if (error) {
    return <div>Error: Error getting menu items</div>;
  }


const today = new Date();
const todayIndex = today.getDay();
const extractCorrectIndex = (todayIndex - 1 + 7) % 7;
const todayData = details && details.find(
  (item) => item.day === daysOfWeek[extractCorrectIndex]
);
const tomorrowData = details && details.find(
  (item) => item.day === daysOfWeek[todayIndex % 7]
);

  return (
    <div className="bg-slate-200 dark:bg-dark-primary rounded-md drop-shadow-md p-2 my-4">
      <div className="flex items-center gap-2">
        <Clock className="mb-6"/>
      <Heading title="Opening Hours" />
      </div>
        

      <div className="md:hidden lg:grid grid grid-cols-2 text-xs md:text-sm justify-between p-4">
        <h6>Today</h6>
        {todayData && todayData?.is_open ? (
          <p className="text-end">
            {moment(todayData.from_time, "HH:mm:ss").format("LT")}-{" "}
            {moment(todayData.to_time, "HH:mm:ss").format("LT")}
          </p>
        ) : (
          <p className="text-end">Closed</p>
        )}
        <h6>Tomorrow</h6>
        {tomorrowData && tomorrowData?.is_open ? (
          <p className="text-end">
            {moment(tomorrowData.from_time, "HH:mm:ss").format("LT")}-{" "}
            {moment(tomorrowData.to_time, "HH:mm:ss").format("LT")}
          </p>
        ) : (
          <p className="text-end">Closed</p>
        )}

        <div className=" col-span-2 h-4"></div>
        {showAllOpening && details && <Allweek details={details} />}

        {/* <p
          onClick={() => setShowallOpening(!showAllOpening)}
          className="text-sm text-start mx-0 px-0 font-semibold cursor-pointer hover:underline text-green-800 dark:text-dark-P_text "
        >
          Show {showAllOpening ? "Less" : "All"}
        </p> */}
      </div>
      <div className="hidden sm:grid lg:grid  grid-cols-2 text-xs md:text-sm justify-between p-4">
        {details && <Allweek details={details} />}
      </div>
    </div>
  );
};

export default OpeningHours;
const Allweek = ({ details }: { details: OpeningHoursType[] }) => {
  return (
    <>
      {details.map((dayData) => (
        <>
          <h6>{dayData.day}</h6>
          <p className="text-end">
            {dayData.is_open ? (
              <>
                {moment(dayData.from_time, "HH:mm:ss").format("LT")} -{" "}
                {moment(dayData.to_time, "HH:mm:ss").format("LT")}
              </>
            ) : (
              "Closed"
            )}
          </p>
        </>
      ))}
    </>
  );
};
