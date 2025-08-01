// import Image from "next/image";
// import React, { forwardRef } from "react";
// import moment from "moment";
// import Link from "next/link";
// import { Order, OrderDetail, OrderItem } from "@/lib/type/morefood/restaurant";
// import { Badge } from "@/components/ui/badge";

// type OrderCardProps = {
//   item: Order;
// };

// const OrderCard = forwardRef<HTMLDivElement, OrderCardProps>(({ item }, ref) => {

//   return (
//     <Link
//       href={`/morefood/order/${item.order_id}`}
//       className="mb-2 rounded-lg bg-card p-3 shadow-md flex justify-start"
//     >

//       <Image
//               src={item.order_banner}
//               alt={"/images/png/morefood.png"}
//               width={500}
//               height={500}
//               className="w-20 h-20 object-cover rounded-lg sm:w-40 bg-white"
//             />

//       <div className="ml-4 flex w-full flex-row justify-between" ref={ref}>
//         <div className="mt-0 flex flex-col justify-between">
//           <div className="flex flex-row sm:flex-col justify-between sm:justify-start">
//           <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex gap-4 line-clamp-1">
//             {item.restaurant_name}
//           </h2>
//           {/* <Badge className="inline sm:hidden" >{item.order_status}</Badge> */}

//           </div>
//           <div className="flex gap-4">
//             <p className="mt-1 text-xs text-gray-700 dark:text-gray-200">
//               {moment.utc(item.created).local().format("Do MMM, YY")}
//             </p>
//           </div>
//           <div className="flex gap-4 my-1">

//           <Badge>#{item.order_id}</Badge>
//           </div>

//         </div>
//         <div className=" mt-0 flex flex-col justify-between  ">
//           <div className="flex sm:items-center  border-gray-100">
//             <Badge className="">{item.order_status}</Badge>
//           </div>

//             <Badge variant="danger" >{item.order_type[0].toUpperCase() + item.order_type.slice(1)}</Badge>
//         </div>
//       </div>
//     </Link>
//   );
// });

// export default OrderCard;

import Image from "next/image";
import React, { forwardRef } from "react";
import moment from "moment";
import Link from "next/link";
import { Order } from "@/lib/type/morefood/restaurant";
import { Badge } from "@/components/ui/badge";

type OrderCardProps = {
  item: Order;
};

const OrderCard = forwardRef<HTMLDivElement, OrderCardProps>(
  ({ item }, ref) => {
    return (
      <Link
        href={`/morefood/order/${item.id}`}
        className="mb-2 flex rounded-lg bg-card p-3 shadow-md"
      >
        {/* <Image
          src={item.order_banner}
          alt="Order Banner"
          width={500}
          height={500}
          className="h-20 w-20 rounded-lg object-cover bg-white sm:w-40"
        /> */}

        <div className=" sm:ml-4 flex w-full justify-between" ref={ref}>
          <div className="flex flex-col justify-between">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
              {item.restaurant}
            </h2>

            <p className="mt-1 text-xs text-gray-700 dark:text-gray-200">
              {moment.utc(item.orderedAt).local().format("Do MMM, YY")}
            </p>

            <Badge>#{item.id}</Badge>
          </div>

          <div className="flex flex-col justify-between items-end">
            <Badge>{item.status}</Badge>
            <Badge variant="danger">
              {item.delivery_type.charAt(0).toUpperCase() +
                item.delivery_type.slice(1)}
            </Badge>
          </div>
        </div>
      </Link>
    );
  }
);

export default OrderCard;
