import React, { useState } from "react";
import { Dialog, DialogContent,  } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { BadgePercent, Bookmark, CirclePlus } from "lucide-react";
import Image from "next/image";
import { FoodtypeswithMenu } from "@/lib/type/morefood/restaurant";
import DetailComponent from "./Detail";
import { addProduct } from "@/lib/redux/slice/morefood/productCart";
import { useAppDispatch } from "@/lib/redux/hooks";
import { showToast } from "@/lib/utilities/toastService";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { prevStep } from "@/lib/redux/slice/morefood/CheckoutSlice";




export default function FoodCard({ item }: { item: FoodtypeswithMenu }) {
  const [showSheet, setShowSheet] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useAppDispatch();
  const delivery = useSelector((state: RootState) => state.delivery);



  const handleClick = async (item: FoodtypeswithMenu, show: string) => {
    

    if(!item.has_variation && item.related_food_items.length === 0){
      setShowSheet(false);
      setShowDialog(false);
      const price: number =  Number(item.discount_price) > 0 ? Number(item.discount_price) < Number(item.price) ? Number(item.discount_price) : item.price : item.price
      const cartitems = {
        id: item.variations ? item.variations[Object.keys(item.variations)[0]][0].id: item.id,
        restaurant_id: item.restaurant_id,
        restaurant_slug: item.restaurant_slug,
        name: item.name,
        image: item.image as string,
        description: ``,
        price: Number(price),
        quantity: 1,
        currency_symbol: item.currency_symbol,
        currency_code: item.currency_code,
        related_food_item: [],
      }

      dispatch(addProduct(cartitems));
        if(delivery.step !== 1){
           dispatch(prevStep()); 
        }
      showToast("Item added to cart", "success");
    }else{
      if (show === "sheet") {
        setShowSheet(true);
      }
      if (show === "dialog") {
        setShowDialog(true);
      }
    }

  };

  const handleAddToCart = () => {
    setShowSheet(false);
    setShowDialog(false);
  };

  const handleViewDetails = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setShowSheet(true);
    } else {
      setShowDialog(true);
    }
  };

  return (
    <>

      <div
        id={`#${name}-${item.id}`}
        className="group relative flex flex-row items-center justify-between w-full h-auto p-2 md:h-36 rounded-md bg-card shadow-md hover:bg-morefoodPrimary cursor-pointer"
        // onClick={handleViewDetails}
      >
        {/* Left Section */}
        <div className="flex flex-col w-2/3 md:w-full pl-2 overflow-hidden"
         onClick={handleViewDetails}
        >
          {item.discount_percentage > 0 && (
            <p className="flex items-center text-xs bg-morefoodPrimary w-fit rounded-xl text-white px-1">
              <BadgePercent size={12} className="mr-1" />
              <span>Offer <span className={`${!item.has_variation ? "hidden" : ""}`}>from</span> {item.discount_percentage}% off</span>
            </p>
          )}
          <p className="font-bold text-sm md:text-xl truncate">{item.name}</p>
          <p className="text-xs md:text-sm line-clamp-2 h-8 md:h-9">{item.description}</p>
          <p className="text-morefoodPrimary text-xs md:text-lg group-hover:text-white">
            {item.has_variation ? "from": "At"}&nbsp;
            {item.currency_symbol}
            &nbsp;{item.dis_price}&nbsp;
            {Number(item.dis_price) < item.price && (
              <span className="line-through text-xs md:text-sm">
                {item.currency_symbol}&nbsp;{item.price}
              </span>
            )}
          </p>
          
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center w-24 h-24 md:w-full md:h-32 overflow-hidden rounded-md my-0 mx-1 pr-0" 
         onClick={handleViewDetails}
        >
          <Image
            src={item.image || "/Images/morefood.jpg"}
            alt={item.name}
            title={item.name}
            width={200}
            height={200}
            className="object-cover w-full h-full bg-gray-300"
          />
        </div>

        {/* Action Buttons */}
        {/* <div className="absolute top-2 right-4 flex justify-center items-center h-8 w-8 rounded-full hover:bg-white/80 shadow-md"> */}
          {/* Bookmark Button (Optional) */}
          {/* <button
      onClick={(event) => {
        event.preventDefault();
        handleBookMark(item);
      }}
    >
      <Bookmark
        className={`hover:fill-orange-500 ${
          isInCart ? "fill-orange-600" : ""
        }`}
        color={isInCart ? "#FF9800" : "#FB8C00"}
      />
    </button> */}
        {/* </div> */}

        <div className="absolute bottom-2 md:bottom-6 right-4 flex justify-center items-center h-8 w-8 rounded-full bg-white hover:bg-white hover:scale-105 shadow-md">
          <button
            onClick={(event) => {
              event.preventDefault();
              handleClick(item, "sheet");
            }}
            className="text-xl text-orange-400 hover:text-orange-600 md:hidden block"
          >
            <CirclePlus />
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              handleClick(item, "dialog");
            }}
            className="text-xl text-orange-400 hover:text-orange-600  hidden md:block"
          >
            <CirclePlus />
          </button>
        </div>

      </div>
      {/* Sheet for Mobile */}
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-scroll p-0">
          <DetailComponent
            item={item}
          />
        </SheetContent>
      </Sheet>

      {/* Dialog for Desktop */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px] md:max-w-md lg:max-w-lg xl:max-w-xl md:max-h-[60%] lg:max-h-[75%] overflow-y-scroll hide-scroll-bar p-0">
        <DetailComponent
            item={item}    
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
