import React from "react";
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
