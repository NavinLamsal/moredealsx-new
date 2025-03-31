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
import Heading from '@/components/ui/heading';

const OrderPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) => {

    const searchparams = await searchParams;
    const orderType=searchparams.order_type ? searchparams.order_type as string : searchparams.order_status  as string
    

  return (
    <><div>
    <Heading title="Orders"/>

    <p className="text-muted-foreground">
      Here&apos;s a list of your orders!
    </p>
  </div>
     
      <OrderTab type={(orderType as string) ?? "all"}/>
      <OrderList type={(orderType as string) ?? "all"} searchParams={searchparams}/>
     
    </>
  );
};

export default OrderPage;
