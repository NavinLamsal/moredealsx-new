"use client";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";


const OrderDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const {fetchOrderDetails}= useFetchRestaurant();

  const { data:orderdetail, isLoading, isError } = useQuery({
    queryKey: ["order Details" , id],
    queryFn: async() => await fetchOrderDetails(id),
    staleTime: 360000,

});

if(isLoading){
  return <p>Loading...</p>
}

if(isError){
  return <p>Error fetching order details.</p>
}


  if (!orderdetail) {
    return <p>Order details not found.</p>;
  }

  // const totalOffer = orderdetail.offer.reduce(
  //   (total: number, offer: OfferDetails) => total + offer.quantity,
  //   0
  // );

  // const totalitems = orderdetail.items.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // );

  // const totalquantity = totalitems + totalOffer;

  return (
    <>
    order</>
    // <div className="pb-4">
    //   <Heading className="flex justify-between items-center">
    //     Order Details
    //     <Button variant={"link"}>
    //       <MoveLeft />
    //       &nbsp;Back
    //     </Button>
    //   </Heading>

    //   <div className="dark:text-white text-black flex justify-between items-center">
    //     <Heading className="flex gap-4 items-center text-black dark:text-white">
    //       <span className="h-8 w-8 bg-P_text p-1.5 rounded-md">
    //         <Utensils size={20} className=" text-black" />
    //       </span>{" "}
    //       {/* {orderdetail.restaurant.name}&nbsp; */}
    //       <p className="mt-1 text-sm px-2 text-black bg-dark-P_text rounded-full  ">
    //         {orderdetail.order_type}
    //       </p>
    //     </Heading>
    //     <p className="mt-1 text-sm md:text-base px-2 text-white bg-black  bg-secondary rounded-full  ">
    //       {orderdetail.order_status}
    //     </p>
    //   </div>
    //   <div>

    //     {/* foodItems  */}
    //     {orderdetail.items.map((item: orderFoodItemTypes) => (
    //       <Items key={item.id} item={item} currency={orderdetail.currency_symbol} />
    //     ))}
    //     {orderdetail.offer.map((item: OfferDetails) => (
    //       <OfferItems key={item.id} item={item} />
    //     ))}
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="text-xs lg:text-sm 2xl:text-base bg-white dark:bg-dark-secondary shadow-sm rounded-md p-4 w-full">
    //       <p>Order: &nbsp;{orderdetail.order_id}</p>
    //       <p>
    //         Date: &nbsp;
    //         {moment.utc(orderdetail.ordered_date).local().format("MMM Do YY")}
    //         &nbsp;
    //       </p>
    //       <p>Note: &nbsp; {orderdetail.note}</p>
    //       <p>Address: &nbsp; {orderdetail.address}</p>
    //     </div>
    //     {orderdetail.restaurant ? (
    //       <div className="text-xs lg:text-sm 2xl:text-base bg-white dark:bg-dark-secondary shadow-sm rounded-md p-4 w-full">
    //         <p>Resturant Detail</p>
    //         <p>
    //           Name: &nbsp;
    //           {orderdetail.restaurant.name}
    //           &nbsp;
    //         </p>
    //         <p>Address: &nbsp; {orderdetail.restaurant.address}</p>
    //         <p>
    //           Contact No: &nbsp;
    //           {orderdetail.restaurant.contact_no}
    //           &nbsp;
    //         </p>
    //         <p>Email: &nbsp; {orderdetail.restaurant.email}</p>
    //       </div>
    //     ) : (
    //       <div className="text-xs lg:text-sm 2xl:text-base bg-white dark:bg-dark-secondary shadow-sm rounded-md p-4 w-full">
    //         <p>Station Detail</p>
    //         <p>
    //           Name: &nbsp;
    //           {orderdetail.station.name}
    //           &nbsp;
    //         </p>
    //         <p>Address: &nbsp; {orderdetail.station.address}</p>
    //         <p>
    //           Contact No: &nbsp;
    //           {orderdetail.station.contact}
    //           &nbsp;
    //         </p>
    //         <p>
    //           Email: &nbsp;
    //           {orderdetail.station.email}
    //         </p>
    //       </div>
    //     )}
    //   </div>

    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div className="text-xs lg:text-sm 2xl:text-base bg-white dark:bg-dark-secondary shadow-sm rounded-md p-4 w-full mt-4">
    //       <p>Name: &nbsp;{orderdetail.full_name}</p>
    //       <p>
    //         Contact No: &nbsp;
    //         {orderdetail.phone_no}
    //         &nbsp;
    //       </p>
    //       <p>Email: &nbsp; {orderdetail.email}</p>
    //     </div>
    //     <div className="text-xs lg:text-sm 2xl:text-base bg-white dark:bg-dark-secondary shadow-sm rounded-md p-4 w-full mt-4 ">
    //       <h1 className="text-lg font-semibold">Total Summary</h1>
    //       <div className="grid grid-cols-2">
    //         <p>Total Items</p>
    //         <p className="text-end">{totalquantity}</p>
    //         <p>Total Amount</p>
    //         <p className="text-end">
    //           {orderdetail.currency_symbol}&nbsp;{orderdetail.total_price}
    //         </p>
    //         {orderdetail.user_sent_amount && (
    //           <>
    //         <p>Discount</p>
    //         <p className="text-end">
    //           {orderdetail.currency_symbol}&nbsp;{(Number(orderdetail.total_price) - Number(orderdetail.user_sent_amount)).toFixed(2)}
    //         </p>
    //         <p>Grand Total</p>
    //         <p className="text-end">
    //           {orderdetail.currency_symbol}&nbsp;{orderdetail.user_sent_amount}
    //         </p>
    //         </>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   <Suspense>
       
    // {orderdetail.restaurant ? (
    //     <MapView
    //       lat={orderdetail.restaurant.lat}
    //       lng={orderdetail.restaurant.lng}
    //       address={orderdetail.restaurant.address}
    //       deliveryOption={orderdetail.order_type}
    //       finallat={orderdetail.lat}
    //       finallng={orderdetail.lng}
    //     />
    //   ) : (
    //     <MapView
    //       lat={orderdetail.station.lat}
    //       lng={orderdetail.station.lng}
    //       address={orderdetail.station.address}
    //       deliveryOption={orderdetail.order_type}
    //       finallat={orderdetail.lat}
    //       finallng={orderdetail.lng}
    //     />
    //   )}
   
      
    //   </Suspense>
    // </div>
  );
};

export default OrderDetailPage;


// const Items=({item , currency}:{item:orderFoodItemTypes , currency:string})=>{

//   return(
//     <div
//     key={item.id}
//     className="mb-6 rounded-lg bg-white dark:bg-dark-secondary p-6 shadow-md flex justify-start"
//   >
//     <Image
//       src={item.image ? `${item.image}` : "/Images/morefood.jpg"}
//       alt={item.image ? `${item.image}` : "/Images/morefood.jpg"}
//       width={500}
//       height={500}
//       className="w-20 h-20 object-cover rounded-lg sm:w-40"
//     />
//     <div className="ml-4 flex flex-col w-full sm:flex-row justify-between">
//       {/* first row  */}
//       <div className="mt-0 ">
//         <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex gap-4">
//           {item.name}
//         </h2>
//         <p className="mt-1 text-xs text-gray-700 dark:text-gray-200 ">
//           {item.description}
//         </p>
        
//       </div>
//       {/* second row  */}
//       <div className="mt-0 flex flex-row sm:flex-col justify-between sm:justify-start gap-2">
        
//         <div className="flex items-center sm:items-start space-x-4 ">
//           <p className="text-sm">
//             {currency}&nbsp;{item.price}
//           </p>
//         </div>
//         <div className=" sm:mt-4 flex justify-between sm:space-y-6 mt-0 sm:block sm:space-x-6">
//           <div className="flex items-center border-gray-100">
//             <span className="text-xs block sm:hidden">Qty:&nbsp;</span>
//             <input
//               className="h-8 w-8 border bg-white dark:bg-dark-secondary text-center text-xs outline-none"
//               type="number"
//               name="quantity"
//               id="quantity"
//               value={item.quantity}
//               readOnly
//               min="1"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// const OfferItems=({item }:{item:OfferDetails})=>{

//   return(
//     <div
//     key={item.id}
//     className="mb-6 rounded-lg bg-white dark:bg-dark-secondary p-6 shadow-md  flex justify-start"
//   >
   

//     <Image
//       src={item.offer.banner ? `${item.offer.banner}` : "/Images/morefood.jpg"}
//       alt={item.offer.name ? `${item.offer.name}` : "/Images/morefood.jpg"}
//       width={500}
//       height={500}
//       className="w-20 h-20 object-cover rounded-lg sm:w-40 bg-white"
//     />
//     <div className="ml-4 flex flex-col w-full sm:flex-row justify-between">
//       {/* first row  */}
//       <div className="mt-0 ">
//         <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex gap-4">
//           {item.offer.name}
//         </h2>
//         <p className="mt-1 text-xs text-gray-700 dark:text-gray-200 ">
//           {item.offer.description}
//         </p>
//         <div className="mt-4 flex flex-wrap gap-2">
//       {item.offer.food_item.map((item) => (
//         <React.Fragment key={item.id}>
//         <span className="bg-blue-900 rounded-full text-xs px-2 py-1 font-bold text-white">
//           {item.name} ({item.value})
//         </span>
//         </React.Fragment>
//       ))}

//     </div>
        
//       </div>
      
//       {/* second row  */}
//       <div className="mt-0 flex flex-row sm:flex-col justify-between sm:justify-start gap-2">
//         <div className="flex items-center sm:items-start space-x-4 ">
//           <p className="text-sm">
//             {item.offer.currency_symbol}&nbsp;{item.price}
//           </p>
//         </div>
//         <div className=" sm:mt-4 flex justify-between sm:space-y-6 mt-0 sm:block sm:space-x-6">
//           <div className="flex items-center border-gray-100">
//             <span className="text-xs block sm:hidden">Qty:&nbsp;</span>
//             <input
//               className="h-8 w-8 border bg-white dark:bg-dark-secondary text-center text-xs outline-none"
//               type="number"
//               name="quantity"
//               id="quantity"
//               value={item.quantity}
//               readOnly
//               min="1"
//             />
//           </div>
//         </div>
//       </div>
      
//     </div>
//     </div>
    
//   )
// }
