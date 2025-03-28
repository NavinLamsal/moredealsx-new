import CashOnDelivery from '@/components/payments/COD/CashOnDelivery';
import Moredeals from '@/components/payments/MoredealsClub/MoredealsPayment'
import { RootState } from '@/lib/redux/store';
import { FoodOrderTypes, MoreDealOrderTypes, orderFoodItem, orderItem } from '@/lib/type/morefood/restaurant';
import React from 'react'
import { useSelector } from 'react-redux';

const PaymentSections = ({ selectedPayment }: { selectedPayment: string }) => {

    const products = useSelector((state: RootState) => state.foodCart);
    const delivery = useSelector((state: RootState) => state.delivery);



    const itemsubtotal = products.items.reduce(
        (total, item) =>
            total +
            (item.price) *
            (item.quantity ?? 0),
        0
    );

    const offersubTotal = products.exclusiveOffers.reduce(
        (total, item) => total + item.price * (item.quantity ?? 0),
        0
    );

    const subtotal = itemsubtotal + offersubTotal;
    const shipping = 0;
    const total = subtotal + shipping;

    const currency_symbol =
        products.items && products.items.length > 0
            ? products.items[0].currency_symbol
            : products.exclusiveOffers && products.exclusiveOffers.length > 0
                ? products.exclusiveOffers[0].currency_symbol
                : "";


    // const formattedData: Partial<FoodOrderTypes> = {
    //     restaurant: products.restaurant_slug,
    //     order_type: delivery.deliverytype,

    //     items: [
    //         ...products.items.map((item) => {
    //             const formattedItem: { food_item?: string; quantity: number; offer?: string; related_food_item?: string[] } = {
    //                 food_item: item.id,  // If it's a food item
    //                 quantity: item.quantity ?? 0,
    //             };

    //             if (item.related_food_item?.length) {
    //                 formattedItem.related_food_items = item.related_food_item.map((rel) => rel.id);
    //             }

    //             return formattedItem;
    //         }),
    //         ...products.exclusiveOffers.map((item) => ({
    //             offer: item.id,  // If it's an offer
    //             quantity: item.quantity ?? 0,
    //         })),
    //     ],
        
    //     receiver_name: delivery.receiverName,
    //     phone_no: delivery.mobileNumber,
    //     platform: "morefood",
    //     address: delivery.location,
    //     lat: delivery.lat?.toString() ?? "",
    //     lng: delivery.lon?.toString() ?? "",
    //     ...(delivery.deliverytype !== "delivery" && { arrival_time: delivery.arrivalTime }),
    //     ...(delivery.note !== "" && { note: delivery.note }),
    // };
    const formattedData: Partial<FoodOrderTypes> = {
        restaurant: products.restaurant_slug,
        order_type: delivery.deliverytype,
      
        items: [
          ...products.items.map((item) => {
            const formattedItem: { food_item?: string; quantity: number; offer?: string; related_food_items?: string[] } = {
              food_item: item.id, // If it's a food item
              quantity: item.quantity ?? 0,
            };
      
            // Only add related_food_items if available
            if (item.related_food_item?.length) {
              formattedItem.related_food_items = item.related_food_item.map((rel) => rel.id);
            }
      
            return formattedItem;
          }),
          ...products.exclusiveOffers.map((item) => ({
            offer: item.id, // If it's an offer
            quantity: item.quantity ?? 0,
          })),
        ],
      
        receiver_name: delivery.receiverName,
        phone_no: delivery.mobileNumber,
        platform: "morefood",
        address: delivery.location,
        lat: delivery.lat?.toString() ?? "",
        lng: delivery.lon?.toString() ?? "",
        ...(delivery.deliverytype !== "delivery" && { arrival_time: new Date(delivery.arrivalTime).toISOString() }), // Correct format for arrival_time
        ...(delivery.note !== "" && { note: delivery.note }),
      }

    

    return (
        <>
            {selectedPayment === "Stripe" && (
                <div className="pt-4 mt-4 border-t">
                    <h4 className="font-semibold py-3">Stripe Payment Form</h4>
                    {/* <Stripe
                    currency_code={currency_code}
                    currency_symbol={currency_symbol}
                  /> */}
                </div>
            )}
            {/* {selectedPayment === "MoreDeals" &&
                !session?.data?.user?.accessToken && (
                  <div className="p-4 mt-4 border-t">
                    <LoginCTA/>
                  </div>
                )} */}
            {selectedPayment === "MoreDeals" &&
                // session?.data?.user?.accessToken && (
                <div className="pt-4 mt-4 border-t">
                    <h4 className="font-semibold py-2">Pay via More Deals</h4>
                    {/* Add More Deals-specific form elements here */}
                    <Moredeals
                        formattedOrderType={formattedData} currency_symbol={currency_symbol} amount={total}
                    //   paymentfor= {"morefood"}
                    />
                </div>
            }
            {selectedPayment === "COD" &&
                // session?.data?.user?.accessToken && (
                <div className="pt-4 mt-4 border-t">
                    <h4 className="font-semibold py-2">Pay via More Deals</h4>
                    {/* Add More Deals-specific form elements here */}
                    <CashOnDelivery
                        formattedOrderType={formattedData} currency_symbol={currency_symbol} amount={total}
                    />
                </div>
            }

        </>
    )
}

export default PaymentSections