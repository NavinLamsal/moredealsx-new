import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
// import { OrderCardSkeleton } from "@/components/ui/Skeletions";
import dynamic from "next/dynamic";

// const Allorder = dynamic(
//   () => import("@/components/order/pageviews/Allorder"),
//   { ssr: false }
// );
// const ToCancelled = dynamic(
//   () => import("@/components/order/pageviews/Cancelled"),
//   { ssr: false }
// );
// const Completed = dynamic(
//   () => import("@/components/order/pageviews/Completed"),
//   { ssr: false }
// );
// const ToPickUp = dynamic(
//   () => import("@/components/order/pageviews/ToPickUp"),
//   { ssr: false }
// );
// const ToDine = dynamic(() => import("@/components/order/pageviews/ToReceive"), {
//   ssr: false,
// });

// const ToDelivery = dynamic(() => import("@/components/order/pageviews/ToDelivery"), {
//   ssr: false,
// });

import React, { Suspense, useMemo } from "react";
import { OrderCardSkeleton } from '@/components/Skeletons/OrderCardSkeleton';
import OrderList from '@/components/morefood/order/orderlisting';
import OrderTab from '@/components/morefood/order/OrderTab';

const OrderPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) => {

    const searchparams = await searchParams;
    const orderType=searchparams.order_type ? searchparams.order_type as string : searchparams.order_status  as string
    
//  const tablist = useMemo(
//    () => [
//      { id: "1", value: "all", name: "All", content: <Allorder /> },
     
//      { id: "6", value: "to-deliver", name: "To Delivery", content: <ToDelivery /> },
//      { id: "2", value: "to-dine", name: "To Dine", content: <ToDine /> },

//      { id: "3", value: "to-pickup", name: "To Pickup", content: <ToPickUp /> },
//      { id: "4", value: "completed", name: "Completed", content: <Completed /> },
//      {
//        id: "5",
//        value: "cancelled",
//        name: "Cancelled",
//        content: <ToCancelled />,
//      },
//    ],
//    []
//  );

//  const tablist = useMemo(
//   () => [
//     { id: "1", value: "all", name: "All", content: <OrderList type="all" searchParams={searchParams}/> },
    
//     { id: "6", value: "to-deliver", name: "To Delivery", content: <>deliver</> },
//     { id: "2", value: "to-dine", name: "To Dine", content: <>dine</> },

//     { id: "3", value: "to-pickup", name: "To Pickup", content: <>pick</> },
//     { id: "4", value: "completed", name: "Completed", content: <>Complete</> },
//     {
//       id: "5",
//       value: "cancelled",
//       name: "Cancelled",
//       content: <>cancel</>,
//     },
//   ],
//   []
// );



  return (
    <>
      <h1 className=" text-3xl font-bold text-center  mx-auto  my-3 ">
        Orders
      </h1>
      <OrderTab type={(orderType as string) ?? "all"}/>
      <OrderList type={(orderType as string) ?? "all"} searchParams={searchparams}/>
     
    </>
  );
};

export default OrderPage;
