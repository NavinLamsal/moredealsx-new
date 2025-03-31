import Image from "next/image";
import React from "react";
import moment from "moment";
import Link from "next/link";
import { Order, OrderItem } from "@/lib/type/morefood/restaurant";
// import { OfferDetails, OrderDetailsTypes } from "@/lib/type/Ordertype";


export const getTotalQuantity = (order: Order): number => {
    return order.items.reduce((total, item) => {
      const foodQuantity = item.food_item ? item.food_item.quantity : 0;
      const offerQuantity = item.offer ? item.offer.quantity : 0;
      return total + foodQuantity + offerQuantity;
    }, 0);
  };


const OrderCard = ({ item }: { item: Order }) => {

//   const totalitems = item.items.reduce(
//     (total: number, item: any) => total + item.quantity,
//     0
//   );

//   const totalOffer = item.offer.reduce(
//     (total: number, offer: any) => total + offer?.quantity,
//     0
//   );

 
//   const totalquantity = totalitems + totalOffer;
const totalquantity = getTotalQuantity(item)
  

  return (
    <Link
      href={`/order/${item.order_id}`}
      className="mb-2 rounded-lg bg-white dark:bg-dark-secondary p-6 shadow-md flex justify-start"
    >
      <Image
        src={item.items[0]?.food_item ? `${item.items[0].food_item.food_item_image}` : item.items[0]?.offer ? `${item.items[0]?.offer?.offer_banner}` : "/Images/morefood.jpg"}
        alt={item.items[0]?.food_item?.food_item_name ? `${item.items[0].food_item.food_item_name}` : item.items[0]?.offer?.offer_banner ? `${item.items[0].offer.offer_banner}` : "/Images/morefood.jpg"}
        width={500}
        height={500}
        className="w-20 h-20 object-cover rounded-lg sm:w-40 bg-white"
      />
      <div className="ml-4 flex flex-col w-full sm:flex-row justify-between">
        <div className="mt-0">
          <span className="cursor-pointer rounded-full  bg-gray-100 dark:bg-dark-primary py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 inline sm:hidden">
              {item.order_status}
            </span> 
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex gap-4">
            {item.restaurant_name }

            <p className="mt-1 text-sm px-2 text-black bg-dark-P_text rounded-full  ">
              {item.order_status}
            </p>
          </h2>
          <div className="flex gap-4">
            <p className="mt-1 text-xs text-gray-700 dark:text-gray-200">
              {moment.utc(item.created_at).local().format("MMM Do YY")}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-200 inline-flex flex-wrap">
            {item.items.map((food: OrderItem , index: number) => {
                
                if(food.food_item){
                  return(
                    <span key={food.food_item.food_item_name}>
                <span>{food.food_item.food_item_name}</span>
                {index < item.items.length - 1 && <span>,&nbsp;</span>}
              </span>
                  )
                }else{
                  return(
                    <span key={food.offer?.offer_name}>
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
            <span className="cursor-pointer rounded-full  bg-gray-100 dark:bg-dark-primary py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 hidden sm:block">
              {item.order_status}
            </span>
            <input
              className="h-8 w-8 border bg-white dark:bg-dark-secondary text-center text-xs outline-none"
              type="number"
              name="quantity"
              id="quantity"
              value={totalquantity}
              readOnly
              min="1"
            />
          </div>
          <div className="flex sm:items-center sm:space-x-4 text-end">
            <p className="text-sm font-bold">
              {/* {item.currency_symbol}&nbsp;{item.total_price} */}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
