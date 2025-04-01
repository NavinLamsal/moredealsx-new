"use client";
import { getTotalQuantity } from "@/components/morefood/cards/OrderCard";
import MapView from "@/components/morefood/order/MapView";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import { OrderDetail_foodItem, OrderDetail_offerItem, OrderDetail_orderItem, OrderDetail_RelatedFooditem } from "@/lib/type/morefood/restaurant";
import { useQuery } from "@tanstack/react-query";
import { Mail, MailOpen, MapPin, NotebookIcon, Phone, User, Utensils } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";


const OrderDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { fetchOrderDetails } = useFetchRestaurant();

  const { data: orderdetail, isLoading, isError } = useQuery({
    queryKey: ["order Details", id],
    queryFn: async () => await fetchOrderDetails(id),
    staleTime: 360000,

  });

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error fetching order details.</p>
  }


  if (!orderdetail) {
    return <p>Order details not found.</p>;
  }


  const totalQuantity = getTotalQuantity(orderdetail);

  return (

    <div className="pb-4">
      <Heading title="Order Details" />

      
      <div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4">
          <Card className="grid gap-4 p-4 bg-violet-600/20 dark:bg-card order-2 lg:order-1">

            {orderdetail.items.map((item: OrderDetail_orderItem, index: number) => {
              if (item.food_item && Object.keys(item.food_item).length > 0) {
                return (
                  <div key={`${item.food_item.name}-${index}`} className="bg-white dark:bg-background p-2 rounded-md">
                    <OrderItem
                      key={`${item.food_item.name}-${index}`}
                      name={item.food_item.name}
                      quantity={item.food_item.quantity}
                      price={`${orderdetail.currency} ${item.food_item.price} `}
                      img={item.food_item.image}
                    />
                    {item.related_food_items && item.related_food_items.length > 0 && (
                      <div key={`related-${index}`} >
                        <p className="text-xs text-muted-foreground my-4">Related items:</p>
                        <div className="ml-4 grid gap-4 ">
                          {item.related_food_items.map((related, rIndex) => (

                            <OrderItem
                            imageSize={"sm"}
                              key={`${related.name}-${rIndex}`}
                              name={related.name}
                              quantity={item.food_item.quantity}
                              price={`${orderdetail.currency} ${20} `}
                              img={related.image}
                            />



                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.offer && Object.keys(item.offer).length > 0) {
                return (
                  <div className="bg-white dark:bg-background p-2 rounded-md">

                    <OrderItem
                      key={`${item.offer.offer_id}-${index}`}
                      name={item.offer.offer_name}
                      quantity={item.offer.quantity}
                      price={`${orderdetail.currency} ${item.offer.offer_price} `}
                      img={item.offer.offer_banner}
                    />
                  </div>

                );
              }



              return null; // Prevent React warnings
            })}

            <div className="text-xs lg:text-sm 2xl:text-base  p-4 w-full mt-4 bg-white rounded-md">
              <h1 className="text-lg font-semibold">Total Summary</h1>
              <div className="grid grid-cols-2">
                <p>Total Items</p>
                <p className="text-end">{totalQuantity}</p>
                <p>Total Amount</p>
                <p className="text-end">
                  {orderdetail.currency}&nbsp;{orderdetail.order_total_price}
                </p>
                {orderdetail.user_sent_amount && (
                  <>
                    <p>Discount</p>
                    <p className="text-end">
                      {orderdetail.currency}&nbsp;{(Number(orderdetail.order_total_price) - Number(orderdetail.user_sent_amount)).toFixed(2)}
                    </p>
                    <p>Grand Total</p>
                    <p className="text-end">
                      {orderdetail.currency}&nbsp;{orderdetail.user_sent_amount}
                    </p>
                  </>
                )}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 items-start gap-4 order-1 lg:order-2">
          
            <Card className="text-xs lg:text-sm 2xl:text-base  p-4 w-full">
            <div className="dark:text-white text-black flex justify-start gap-2 items-center col-span-1 md:col-span-2 lg:col-span-1">
          <Badge variant="danger">{orderdetail.order_type}</Badge>
        <Badge>{orderdetail.order_status}</Badge>
      </div>
              <div className="flex justify-between">
                <p className="font-bold text-base">
                  
                  Order: #&nbsp;{orderdetail.order_id}</p>
                <p>
                  <strong>Date:</strong> &nbsp;
                  {moment.utc(orderdetail.ordered_date).local().format("MMM Do YY")}
                  &nbsp;
                </p>

              </div>
              <p className="flex items-center my-1"><span className="flex font-bold"><User size="14" />&nbsp;Name:</span> &nbsp;{orderdetail.receiver_name}</p>
              <p className="flex items-center my-1"><span className="flex font-bold"><Phone size="14" />&nbsp;Contact No:</span> &nbsp;{orderdetail.phone_no}</p>


              {orderdetail.email && <p className="flex items-center my-1"><span className="flex font-bold"><Mail size="14" />&nbsp;Email:</span> &nbsp;{orderdetail.email}</p>}
              <p className="flex items-start my-1"><span className="flex font-bold"><MapPin size="14"  />&nbsp;Address:</span> &nbsp;{orderdetail.address}</p>
              
              {!orderdetail.note && <p className="flex items-start my-1"><span className="flex font-bold"><NotebookIcon size="14"  />&nbsp;Note:</span> &nbsp;{orderdetail.note}</p>}
            </Card>
            <Card className="text-xs lg:text-sm 2xl:text-base p-4 w-full">
               <h4 className="text-base font-bold mb-2">Restaurant Details</h4>
               <p className="flex items-start my-1"><span className="flex font-bold"><Utensils size="14"  />&nbsp;Name:</span> &nbsp;{orderdetail.restaurant.name}</p>
               <p className="flex items-start my-1"><span className="flex font-bold"><MapPin size="14"  />&nbsp;Address:</span> &nbsp;{orderdetail.restaurant.address}</p>
               <p className="flex items-start my-1"><span className="flex font-bold"><Phone size="14"  />&nbsp;Contact No:</span> &nbsp;{orderdetail.restaurant.phone_number}</p>
              

            </Card>

            {/* <Card className="text-xs lg:text-sm 2xl:text-base  p-4 w-full mt-4">
              <h1 className="text-lg font-semibold">Total Summary</h1>
              <div className="grid grid-cols-2">
                <p>Total Items</p>
                <p className="text-end">{totalQuantity}</p>
                <p>Total Amount</p>
                <p className="text-end">
                  {orderdetail.currency}&nbsp;{orderdetail.order_total_price}
                </p>
                {orderdetail.user_sent_amount && (
                  <>
                    <p>Discount</p>
                    <p className="text-end">
                      {orderdetail.currency}&nbsp;{(Number(orderdetail.order_total_price) - Number(orderdetail.user_sent_amount)).toFixed(2)}
                    </p>
                    <p>Grand Total</p>
                    <p className="text-end">
                      {orderdetail.currency}&nbsp;{orderdetail.user_sent_amount}
                    </p>
                  </>
                )}
              </div>
            </Card> */}

          </div>

        </div>



      </div>

     
       
    {orderdetail.order_type === "Delivery" ? (
        <MapView
          lat={orderdetail.restaurant.lat}
          lng={orderdetail.restaurant.lng}
          deliveryOption={orderdetail.order_type}
          address={orderdetail.address}
          
          // address={orderdetail.restaurant.address}
          // deliveryOption={orderdetail.order_type}
          // finallat={orderdetail.lat}
          // finallng={orderdetail.lng}
        />)
      : (
        <MapView
          lat={orderdetail.restaurant.lat}
          lng={orderdetail.restaurant.lng}
          deliveryOption={orderdetail.order_type}
          address={orderdetail.restaurant.address}
          // address={orderdetail.address}
          // deliveryOption={orderdetail.order_type}
          // finallat={orderdetail.lat}
          />
    )}
         
    </div>
  );
};

export default OrderDetailPage;


const OrderItem = ({ name, price, quantity, img,  imageSize }: { name: string; price: string; quantity: number; img: string,  imageSize?: "sm" | "lg"}) => (

  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
      <Avatar className={imageSize === "sm" ? "w-8 h-8" : "w-10 h-10"}>
        <AvatarImage src={img} className={imageSize === "sm" ? "w-8 h-8" : "w-10 h-10"}/>
        <AvatarFallback className={imageSize === "sm" ? "w-8 h-8" : "w-10 h-10"}>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-muted-foreground text-xs">{name}</p>

      </div>
    </div>

    <p className="text-xs text-muted-foreground flex items-center gap-1">{quantity} x <span className='font-semibold text-sm'>{price}</span></p>
  </div>
);

