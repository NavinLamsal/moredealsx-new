"use client";

import RestroOfferCard from "@/components/cards/morefood/RestroOfferCard";
import HorizontalCarouselWithOutTitle from "@/components/carousel/HorizontalCarouselWithotTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { OfferDealType } from "@/lib/type/morefood/restaurant";
import { useState } from "react";

const offerDeals: OfferDealType[] = [
  {
    id: "deal1",
    banner: "/images/png/restro/food.png",
    start_date: "2025-06-10",
    end_date: "2025-06-20",
    currency_code: "USD",
    food_item: [
      {
        id: "food1",
        name: "Margherita Pizza",
        image: "/images/png/restro/food.png",
        price: "12.00",
        discount_price: "10.00",
      },
      {
        id: "food2",
        name: "Caesar Salad",
        image: "/images/png/restro/food.png",
        price: "8.00",
        discount_price: "7.00",
      },
    ],
    description: "Enjoy a delightful combo of pizza and salad.",
    is_hot_deal: true,
    name: "Pizza & Salad Combo",
    price: 17.0,
    orginal_price: 20.0,
    repeat_sunday: true,
    repeat_monday: false,
    repeat_tuesday: true,
    repeat_wednesday: false,
    repeat_thursday: true,
    repeat_friday: false,
    repeat_saturday: true,
  },
  {
    id: "deal2",
    banner: "/images/png/restro/food.png",
    start_date: "2025-06-15",
    end_date: "2025-06-25",
    currency_code: "USD",
    food_item: [
      {
        id: "food3",
        name: "Veggie Burger",
        image: "/images/png/restro/food.png",
        price: "9.00",
        discount_price: "7.50",
      },
      {
        id: "food4",
        name: "French Fries",
        image: "/images/png/restro/food.png",
        price: "4.00",
        discount_price: "3.00",
      },
    ],
    description: "Enjoy a delightful combo of pizza and salad.",
    is_hot_deal: true,
    name: "Pizza & Salad Combo",
    price: 17.0,
    orginal_price: 20.0,
    repeat_sunday: true,
    repeat_monday: false,
    repeat_tuesday: true,
    repeat_wednesday: false,
    repeat_thursday: true,
    repeat_friday: false,
    repeat_saturday: true,
  },
];

const RestroOfferSection: React.FC = () => {
  //   const slug = getStoredSlug();
  //   const {
  //     data: offersList,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useQuery({
  //     queryKey: ["Offer List", slug],
  //     queryFn: async () => await fetchOfferList(slug || ""),
  //     staleTime: 360000,
  //   });

  const [isLoading, setisLoading] = useState(false);

  return (
    <div>
      <Card className="mt-4">
        <CardHeader className="flex justify-between py-2">
          <CardTitle className="hidden">Offers</CardTitle>
          <Heading title="Offers" />
        </CardHeader>
        <CardContent className="py-2">
          <div className="">
            {/* {isError && <p>Error loading offers!</p>} */}
            {isLoading ? (
              <p>Loading offers...</p>
            ) : offerDeals && offerDeals.length > 0 ? (
              <HorizontalCarouselWithOutTitle title="Offer">
                {offerDeals?.map((offer: OfferDealType, index: number) => (
                  <div key={index}>
                    <RestroOfferCard item={offer} />
                  </div>
                ))}
              </HorizontalCarouselWithOutTitle>
            ) : (
              <p>No offers at the moment.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestroOfferSection;
