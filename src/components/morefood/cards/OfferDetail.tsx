import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FoodtypeswithMenu, OfferType, RelatedFoodItem, Variation } from "@/lib/type/morefood/restaurant";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addOffer, addProduct } from "@/lib/redux/slice/morefood/productCart";
import { showToast } from "@/lib/utilities/toastService";
import { CirclePlus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { prevStep } from "@/lib/redux/slice/morefood/CheckoutSlice";

const DetailComponent = ({
    item
}: {
    item: OfferType;

}) => {




    const dispatch = useAppDispatch();
    const delivery = useSelector((state: RootState) => state.delivery);


    const handleAddToCart = () => {

        const cartitems = {
            id: item.id,
            restaurant_slug: item.restaurant_slug,
            name: `${item.name}`,
            image: item.banner as string,
            description: ``,
            price: Number(item.price),
            quantity: 1,
            currency_symbol: item.currency_symbol,
            currency_code: item.currency_code,
        }
        dispatch(addOffer(cartitems));
        if (delivery.step !== 1) {
            dispatch(prevStep());
        }
        showToast("Item added to cart", "success");
    };



    return (
        <>
            <div className="grid grid-cols-1 gap-8 w-full">
                {/* Image Section */}
                <div className="w-full h-64 relative -z-10">
                    <Image
                        src={item.banner || "/Images/morefood.jpg"}
                        alt={item.name}
                        width={1024}
                        height={768}
                        className="w-full h-64 object-cover bg-gray-300 border-2 border-b-S_btn"
                    />
                </div>

                {/* Details Section */}
                <div className="space-y-1">
                    <div className="flex flex-col items-center p-2">
                        <h1 className="text-sm sm:text-base md:text-xl font-bold text-center">{item.name}</h1>
                    </div>
                    <div className="p-4 flex justify-between items-center ">
                        <Button variant={"morefoodOutline"} className="text-sm sm:text-base md:text-xl font-semibold  border-morefoodPrimary">{item.currency_symbol}&nbsp;{item.price}
                        </Button>
                        <Button variant={"morefoodPrimary"} className="flex justify-center items-center space-x-2 py-2 rounded-md"
                            // disabled={!item.has_variation ? false: !selectedVariation }
                            onClick={handleAddToCart}
                        >
                            <CirclePlus />
                            <span>Add to Cart</span>
                        </Button>
                    </div>



                    {/* Related Items Section */}
                    {item.food_item.length > 0 &&
                        <div className=" p-2">
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold flex justify-between">
                                Food Items
                            </h4>
                            <div className="m-2">

                                {item.food_item.map((relatedItem) => (
                                    <div
                                        id={`#${name}-${relatedItem.id}`}
                                        className="relative flex flex-row items-center justify-between w-full h-auto p-2 md:h-36 rounded-md bg-white dark:bg-slate-600 shadow-md hover:bg-red-200 cursor-pointer mb-2"
                                    >
                                        <div className="flex flex-col w-2/3 md:w-full pl-2 overflow-hidden"
                                        >
                                            <p className="font-bold text-sm md:text-xl truncate mb-1">{relatedItem.name}&nbsp;{(relatedItem.value)}</p>
                                            <p className="text-xs md:text-sm line-clamp-2 h-8 md:h-9">{relatedItem.ingredients} abjkabd jadb jkasb d jad kja</p>


                                        </div>
                                        <div className="flex items-center justify-center w-24 h-24 md:w-full md:h-32 overflow-hidden rounded-md my-0 mx-1 pr-0"

                                        >
                                            <Image
                                                src={relatedItem.image || "/Images/morefood.jpg"}
                                                alt={relatedItem.name}
                                                title={relatedItem.name}
                                                width={200}
                                                height={200}
                                                className="object-cover w-full h-full bg-gray-300"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <h6 className="text-sm sm:text-base md:text-lg font-semibold p-2">Description</h6>
                    <p className="text-sm text-muted-foreground p-2 pb-4">{item.description}</p>
                </div>
            </div>
        </>
    );
};

export default DetailComponent;
