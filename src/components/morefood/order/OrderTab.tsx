import React from "react";
import Link from "next/link";

const OrderTab = ({type}:{type:string}) => {
    
    const tablist = [
        {
            id: "6",
            value: "all",
            name: "All",
            link: `/morefood/order`,
        },
        {
            id: "3",
            value: "delivery",
            name: "Delivery",
            link: `/morefood/order?order_type=delivery`,
        },
        {
            id: "1",
            value: "dine-here",
            name: "Dine",
            link: `/morefood/order?order_type=dine-here`,
        },
        {
            id: "2",
            value: "Delivered",
            name: "Delivered",
            link: `/morefood/order?order_status=Delivered`,
        },
        {
            id: "4",
            value: "Cancelled",
            name: "Cancelled",
            link: `/morefood/order?order_status=Cancelled`,
        },
    ];

    return (
        <div className="w-full  overflow-hidden pb-2 max-w-5xl mx-auto">

            <div className=" w-full flex items-center justify-start  border-b border-muted-foreground dark:border-gray-700 bg-inherit rounded-none overflow-x-auto hide-scroll-bar">
                {tablist.map((item) => (
                    <Link href={item.link} key={item.id}>
                    <div
                        key={item.id}
                       
                        className={`relative px-4 py-2 text-sm sm:text-base font-medium  hover:text-morefoodPrimary transition-all duration-300 cursor-pointer
                        ${type === item.value ? "border-b-4 shadow-none bg-transparent text-morefoodPrimary dark:text-white rounded-none" : "text-muted-foreground"}
              `}
                    >
                        {item.name}
                        {/* Active Tab Underline */}
                        <span className={`absolute left-0 bottom-0 w-full h-[2px]  transition-all duration-300 ${type === item.value ? "bg-morefoodPrimary dark:bg-morefoodPrimary" : "bg-transparent"}`}></span>
                    </div>
                    </Link>
                ))}
            </div>


        </div>
    );
};

export default OrderTab;

