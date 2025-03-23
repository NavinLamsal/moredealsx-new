// import React from 'react'

// const Page = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default Page





import React, { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import Heading from "@/components/ui/heading";
import RestaurantList from "@/components/morefood/RestaurantList";



type Props = {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = params.ids[0];
//   const canonicalUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/`;

//   // fetch data
//   const restaurants: Station = await fetchStationIdDetails(id);

//   const previousImages = (await parent).openGraph?.images || [];

//   const imageUrls = restaurants.banner || {};
//   const openGraphImages = Object.values(imageUrls).map((format: any) => ({
//     url: format.url,
//     width: format.width,
//     height: format.height,
//     description: restaurants.short_description,
//   }));

//   const seoAttributes = {
//     robots: "index, follow",
//     canonical: canonicalUrl,
//     Publisher: "More Food",
//   };

//   const openGraph = {
//     images: [...openGraphImages, ...previousImages],
//     url: canonicalUrl,
//     type: "Restaurant",
//     site_name: "More Food",

//     location: restaurants.address,
//   };

//   return {
//     title: restaurants.name,
//     openGraph: {
//       images: [...openGraphImages, ...previousImages],
//     },
//     ...openGraph,
//     ...seoAttributes,
//   };
// }

// export async function generateStaticParams() {
//   try {
//     let allRestaurants = [];
//     let page = 1;

//     // Fetch the first page to get total pages
//     const initialResponse = await fetchStationLists(page);
//     const totalPages = initialResponse.meta.total_pages;

//     // Collect all restaurant data
//     allRestaurants.push(...initialResponse.data);

//     for (page = 2; page <= totalPages; page++) {
//       const paginatedResponse = await fetchStationLists(page);
//       allRestaurants.push(...paginatedResponse.data);
//     }

//     // Map to create slugs safely
//     const allRestaurant = allRestaurants.map((restaurant) => ({
//       ...restaurant,
//       name: restaurant.name
//         ? restaurant.name.replace(/\s+/g, "-")
//         : "default-name", // Fallback name
//     }));

//     return allRestaurant.map(({ id, restaurant, name }) => ({
//       ids: [id, restaurant, name],
//     }));
//   } catch (error) {
//     console.error("Error fetching restaurant data:", error);
//     return []; // Return an empty array in case of error
//   }
// }

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const { slug } = await params;
  const searchparams = await searchParams;
  const title = searchparams.title as string


  if (!slug) {
    return null
  }

  return (
    <div className="p-4">
      <Heading title={title as string} />
      <RestaurantList
        type={slug as string}
        searchParams={searchparams}
      />
    </div>
  );
}

