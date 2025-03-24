"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Restaurant } from '@/lib/type/morefood/restaurant'
import React from 'react'
import Overview from './overview'
import Reviews from './Reviews'

const RestaurantTab = ({details}:{details:Restaurant}) => {
    // const activetab = searchParams?.get("tab");

    const tablist = [
      {
        id: "5",
        value: "review",
        name: "Reviews",
        content: <Reviews slug={details.slug} />
        
      },
        
        {
          id: "4",
          value: "gallery",
          name: "Gallery",
          content:<>
          {/* <ResturantGallery Gallery={Gallery} /> */}
          gallery
          </> ,
        },
          
          {
            id: "1",
            value: "overview",
            name: "Overview",
            content: (
              <>
              <Overview
              details={details}
              />
              </>
              // <Suspense fallback={<p>Loading...</p>}>
              //   <ResturantAllDetail id={id} />
              // </Suspense>
            ),
          },
      ]


  return (
    <Tabs
        defaultValue={"review"}
        className="mx-auto w-full"
      >
        <TabsList className="4xl:max-w-9xl py- md:py-8 3xl:max-w-8xl max-w-7xl mx-auto w-full hide-scroll-bar overflow-x-scroll overflow-y-hidden bg-inherit dark:bg-inherit mt-5  rounded-none flex items-center justify-start border-t">
          {tablist.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.value}
              className="w-1/2 text-xs sm:text-sm md:text-base lg:text-lg py-1 sm:py-2 data-[state=active]:border-b-4 data-[state=active]:shadow-none data-[state=active]:bg-morefoodPrimary  data-[state=active]:text-white rounded-none data-[state=active]:border-morefoodPrimary data-[state=active]:dark:bg-morefoodPrimary data-[state=active]:dark:text-white"
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tablist.map((item) => (
          <TabsContent key={item.id} value={item.value}>
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
  )
}

export default RestaurantTab
