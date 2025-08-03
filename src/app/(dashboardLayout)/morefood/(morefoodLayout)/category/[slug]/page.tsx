import React from "react";
import Heading, { HeadingChild } from "@/components/ui/heading";
import RestaurantList from "@/components/morefood/RestaurantList";
import CategoriesTopList from "@/components/morefood/Category/categoryListing";
import OfferList from "@/components/morefood/OfferList";
import BackButton from "@/components/ui/back_button";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const searchparams = await searchParams;
  const title = searchparams.title as string;
  const category = searchparams.category as string;

  if (!slug) {
    return null;
  }

  const normalizedSlug = slug.toLowerCase();
  const isComboToday =
    normalizedSlug.includes("combos") || normalizedSlug.includes("today-offer");

  return (
    <>
      <CategoriesTopList activepath={slug} />

      {isComboToday ? (
        <>
          <Heading title={title as string} />
          <OfferList
            type={slug === "combos" ? "combo/list" : "list"}
            searchParams={searchparams}
          />
        </>
      ) : title === "category" ? (
        <div className="mt-4">
          <HeadingChild>
            <div className="flex items-center space-x-2">
              <BackButton />{" "}
              <h2 className="text-xl  font-semibold text-gray-800 dark:text-gray-100">
                {`Find your restaurant for `}
                <span className="text-morefoodPrimary">{category}</span>{" "}
              </h2>
            </div>
          </HeadingChild>
          <RestaurantList
            dashboard={true}
            type={`list`}
            searchParams={{ ...searchparams, category: category }}
          />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between space-x-2">
            <Heading title={title as string} />
          </div>

          <RestaurantList dashboard={true} type={`${slug}/list`} searchParams={searchparams} />
        </>
      )}
    </>
  );
}
