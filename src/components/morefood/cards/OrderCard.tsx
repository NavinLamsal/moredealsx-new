import Image from "next/image";
import React, { forwardRef } from "react";
import moment from "moment";
import Link from "next/link";
import { Order, OrderDetail, OrderItem } from "@/lib/type/morefood/restaurant";
import { Badge } from "@/components/ui/badge";


export const getTotalQuantity = (order: Order | OrderDetail): number => {
  return order.items?.reduce((total, item) => {
    const foodQuantity = item.food_item?.quantity ?? 0;
    const offerQuantity = item.offer?.quantity ?? 0;
    return total + foodQuantity + offerQuantity;
  }, 0) ?? 0;
};




type OrderCardProps = {
  item: Order;
};

const OrderCard = forwardRef<HTMLDivElement, OrderCardProps>(({ item }, ref) => {

  const totalQuantity = getTotalQuantity(item);

const foodItemImage = item?.items[0]?.food_item?.food_item_image;
const offerBanner = item?.items[0]?.offer?.offer_banner;
const defaultImage = "/images/png/morefood.png";

const imageSrc = foodItemImage || offerBanner || defaultImage;


  return (
    <Link
      href={`/morefood/order/${item.order_id}`}
      className="mb-2 rounded-lg bg-card p-3 shadow-md flex justify-start"
    >

      <Image
              src={imageSrc}
              alt={"/images/png/morefood.png"}
              width={500}
              height={500}
              className="w-20 h-20 object-cover rounded-lg sm:w-40 bg-white"
            /> 

      <div className="ml-4 flex flex-col w-full sm:flex-row justify-between" ref={ref}>
        <div className="mt-0">
          {/* <span className="cursor-pointer rounded-sm  text-red-600 bg-red-600/25 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50  text-xs font-bold hidden sm:inline">
            {item.order_type[0].toUpperCase() + item.order_type.slice(1)}
          </span> */}
          <Badge variant="danger" >{item.order_type[0].toUpperCase() + item.order_type.slice(1)}</Badge>
          <div className="flex flex-row sm:flex-col justify-between sm:justify-start">
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex gap-4 line-clamp-1">
            {item.restaurant_name}

            {/* <p className="mt-1 text-sm px-2 font-bold  bg-violet-600/25 text-primary block sm:hidden rounded-full  ">
              {item.order_status}
            </p> */}
          </h2>
          <Badge className="inline sm:hidden" >{item.order_status}</Badge>
          

          </div>
          <div className="flex gap-4">
            <p className="mt-1 text-xs text-gray-700 dark:text-gray-200">
              {moment.utc(item.created).local().format("MMM Do YY")}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-200  line-clamp-1">
            {item.items.map((food: OrderItem, index: number) => {
              if (food.food_item && JSON.stringify(food.food_item) !== "{}") {
                return (
                  <span key={`${food.food_item.food_item_name}-${index}`}>
                    <span>{food.food_item.food_item_name}</span>
                    {index < item.items.length - 1 && <span>,&nbsp;</span>}
                  </span>
                )
              } else {
                return (
                  <span key={`${food.offer?.offer_name}-${index}`}>
                    <span>{food.offer?.offer_name}</span>
                    {index < item.items.length - 1 && <span>,&nbsp;</span>}
                  </span>
                )
              }

            })}

          </p>
        </div>
        <div className=" mt-0 flex flex-row sm:flex-col justify-between  ">
          <div className="flex sm:items-center  border-gray-100">
            <Badge className="hidden sm:block">{item.order_status}</Badge>
          </div>
          <div className="flex w-full items-center justify-between sm:items-end sm:space-x-4 text-end">
          <Badge variant="danger" className="inline sm:hidden">{item.order_type[0].toUpperCase() + item.order_type.slice(1)}</Badge>
          
            <p className="text-sm font-bold">
              <input
                className="h-8 w-8 border bg-white dark:bg-dark-secondary text-center text-xs outline-none"
                type="number"
                name="quantity"
                id="quantity"
                value={totalQuantity}
                readOnly
                min="1"
              />
              {/* {item.currency_symbol}&nbsp;{item.total_price} */}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default OrderCard;
