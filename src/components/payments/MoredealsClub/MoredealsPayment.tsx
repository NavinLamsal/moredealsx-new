import React from "react";
import PaymentForms from "./PayementForm";
import { MoreDealOrderTypes, orderFoodItem, orderItem } from "@/lib/type/morefood/restaurant";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";


const Moredeals = ({paymentfor}:{paymentfor:string}) => {
    const products = useSelector((state: RootState) => state.foodCart);
    const delivery = useSelector((state: RootState) => state.delivery);

    if(paymentfor === "morefood"){
        const formattedData: Partial<MoreDealOrderTypes> = {
            restaurant_slug: products.restaurant_slug,
            order_type: delivery.deliverytype,
            items: products.items.reduce(
              (acc: { [id: string]: orderFoodItem }, item) => {
                const uniqueKey = `${item.id}-${item.description}`;
                acc[uniqueKey] = {
                  id: item.id,
                  price: item.price,
                  description: item.description,
                  name: item.name,
                  quantity: item.quantity ?? 0,
                  related_food_item: item.related_food_item.map((rel) => rel.id) ?? [],
                };
            
                return acc;
              },
              {}
            ),
            offer_items: products.exclusiveOffers.reduce(
              (acc: { [id: string]: orderItem }, item) => {
                acc[item.id] = {
                  id: item.id,
                  price: item.price,
                  quantity: item.quantity ?? 0,
                };
                return acc;
              },
              {}
            ),
            full_name: delivery.receiverName,
            phone_no: delivery.mobileNumber,
            payment_method: "moredeals",
            platform: "morefood",
            address: delivery.location,
            lat: delivery.lat?.toString() ?? "",
            lng: delivery.lon?.toString() ?? "",
            // pin: pinvalue,
            ...(delivery.deliverytype !== "delivery" && {arrival_time: delivery.arrivalTime}),
            ...(delivery.note !== "" && { note: delivery.note }),
          };
        return(
            <div>
        <PaymentForms amount={100}  formattedData={formattedData} currency_symbol={"Rs"}  />
      
    </div>
        )

    }

  return (
    <div>
        <PaymentForms amount={100}  formattedData={{
            "testing": "test"
        }} currency_symbol={"Rs"}  />
      
    </div>
  );
};

export default Moredeals;


// {
//   "restaurant": "babu-roshan-restro-bar",
//   "receiver_name": "John Doe",
//   "email": "johndoe@example.com",
//   "arrival_time": "2025-03-24T18:30:00Z",
//   "phone_no": "1234567890",
//   "order_type": "delivery",
//   "lat": 40.712776,
//   "lng": -74.005974,
//   "address": "123 Example St, City, Country",
//   "note": "Please deliver to the front door.",
//   "items": [
//       {
//           "food_item": "a0600f52-2a5b-4bdf-b296-320c82088594",  
//           "quantity": 2,
//         "related_food_items:[""        },
// {
//             "offer": "ac5123c1-4d92-48a5-940a-84deb92ed7e3" 
//           "quantity": 2,
         
//       }
//   ]
// }