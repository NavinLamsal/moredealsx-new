import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FoodtypeswithMenu, RelatedFoodItem, Variation } from "@/lib/type/morefood/restaurant";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addProduct } from "@/lib/redux/slice/morefood/productCart";
import { showToast } from "@/lib/utilities/toastService";
import { CirclePlus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { prevStep } from "@/lib/redux/slice/morefood/CheckoutSlice";

const DetailComponent = ({
  item
}: {
  item: FoodtypeswithMenu;

}) => {

  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const [selectedRelatedItems, setSelectedRelatedItems] = useState<RelatedFoodItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const delivery = useSelector((state: RootState) => state.delivery);

  const dispatch = useAppDispatch();

  const handleVariationSelect = (variation: Variation) =>
    setSelectedVariation(variation);

  const handleRelatedItemToggle = (relatedItem: RelatedFoodItem) =>
    setSelectedRelatedItems((prev) =>
      prev.includes(relatedItem) ? prev.filter((i) => i !== relatedItem) : [...prev, relatedItem]
    );

  const handleAddToCart = () => {

    if (!item.has_variation) {



      const price: number = selectedRelatedItems.reduce(
        (total, item) => total + Number(item.discount_price > 0 ? item.discount_price < item.price ? item.discount_price : item.price : item.price),  // Ensure item.price is a number
        0
      );

      const totalPrice: number = Number(item.dis_price) > 0 ? Number(item.dis_price) < Number(item.price) ? Number(item.dis_price) + price : item.price + price : item.price + price;// Ensure item.


      const cartitems = {
        id: item.variations ? item.variations[Object.keys(item.variations)[0]][0].id : item.id,
        restaurant_id: item.restaurant_id,
        restaurant_slug: item.restaurant_slug,
        name: `${item.name}`,
        image: item.image as string,
        description: selectedRelatedItems.length > 0 ? `with ${selectedRelatedItems.map((item) => `${item.name}(${item.value})`).join(", ")}` : `${item.name} only`,
        price: Number(totalPrice),
        quantity: 1,
        currency_symbol: item.currency_symbol,
        currency_code: item.currency_code,
        related_food_item: selectedRelatedItems.map((relatedItem) => ({
          id: relatedItem.id,
          name: relatedItem.name,
          price: relatedItem.price,
        })),
      }
      dispatch(addProduct(cartitems));
      if (delivery.step !== 1) {
        dispatch(prevStep());
      }
    } else {
      const price: number = selectedRelatedItems.reduce(
        (total, item) => total + Number(item.discount_price > 0 ? item.discount_price < item.price ? item.discount_price : item.price : item.price),  // Ensure item.price is a number
        0
      );

      const totalPrice = selectedVariation
        ? (selectedVariation.discount_price > 0) ? (selectedVariation.discount_price < selectedVariation.price) ? selectedVariation.discount_price + price : selectedVariation.price + price : selectedVariation.price + price
        : item.dis_price ?? item.price + price; // Assuming item.price is already a number


      const cartitems = {
        id: selectedVariation ? selectedVariation.id : item.id,
        restaurant_id: item.restaurant_id,
        restaurant_slug: item.restaurant_slug,
        name: `${selectedVariation?.value} ${item.name}`,
        image: item.image as string,
        description: selectedRelatedItems.length > 0 ? `with ${selectedRelatedItems.map((item) => `${item.name}(${item.value})`).join(", ")}` : `${item.name} only`,
        price: Number(totalPrice),
        quantity: 1,
        currency_symbol: item.currency_symbol,
        currency_code: item.currency_code,
        related_food_item: selectedRelatedItems.map((relatedItem) => ({
          id: relatedItem.id,
          name: relatedItem.name,
          price: relatedItem.price,
        })),
      }
      dispatch(addProduct(cartitems));
      if (delivery.step !== 1) {
        dispatch(prevStep());
      }
    }

    showToast("Item added to cart", "success");
  };



  return (
    <>
      <div className="grid grid-cols-1 gap-8 w-full">
        {/* Image Section */}
        <div className="w-full h-64 relative -z-10">
          <Image
            src={item.image || "/Images/morefood.jpg"}
            alt={item.name}
            width={1024}
            height={768}
            className="w-full h-64 object-cover bg-gray-300 border-2 border-b-S_btn"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="flex flex-col items-center p-2">
            <h1 className="text-sm sm:text-base md:text-xl font-bold text-center">{item.name}</h1>
            {!item.has_variation && <p className="text-sm sm:text-base md:text-xl font-semibold">{item.currency_symbol}&nbsp;{item.dis_price}
              {item.dis_price < item.price && (
                <span className="line-through text-xs text-P_text">
                  {item.currency_symbol}&nbsp;{item.price}
                </span>
              )}
            </p>}

          </div>
          <h6 className="text-sm sm:text-base md:text-lg font-semibold p-2">Ingredients</h6>
          <p className="text-sm text-muted-foreground  p-2">{item.ingredient}</p>
          <h6 className="text-sm sm:text-base md:text-lg font-semibold p-2">Description</h6>
          <p className="text-sm text-muted-foreground  p-2">{item.description}</p>

          {/* Variations Section */}
          {item.has_variation &&

            <div className="bg-slate-200 dark:bg-slate-800 p-2 m-2 rounded-lg">
              {Object.keys(item.variations).map((variationGroup) => (
                <div key={variationGroup}>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold flex justify-between">
                    {variationGroup}
                    <span className=" text-xs text-S_btn">Required</span>
                  </h4>
                  {item.variations[variationGroup].map((variation) => (
                    <div
                      key={variation.id}
                      className="flex items-center justify-between p-4 border border-muted-foreground rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer my-2 bg-inherit"
                    >
                      <label className="flex items-center space-x-4">
                        <input
                          type="radio"
                          name={variationGroup}
                          value={variation.id}
                          onChange={() => handleVariationSelect(variation)}
                          className="w-5 h-5 text-blue-600border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
                          {variation.value}
                        </span>
                      </label>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {item.currency_symbol}&nbsp;
                        {(variation.discount_price <= variation.price) && (variation.discount_price > 0) ?
                          variation.discount_price : variation.price}

                        {(Number(variation.discount_price) <= item.price) && (variation.discount_price > 0) && (
                          <span className="line-through text-xs text-P_text">
                            &nbsp;{item.currency_symbol}&nbsp;{variation.price}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          }


          {/* Related Items Section */}
          {item.related_food_items.length > 0 &&
            <div className=" p-2">
              <h4 className="text-sm sm:text-base md:text-lg font-semibold flex justify-between">
                People also buy <span className="text-gray-400 text-xs">(Optional)</span>
              </h4>
              <div className="m-2">

                {item.related_food_items.map((relatedItem) => (
                  <div
                    key={relatedItem.id}
                    className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <label className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        value={relatedItem.id}
                        onChange={() => handleRelatedItemToggle(relatedItem)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
                        {relatedItem.name} {relatedItem.value}
                      </span>
                    </label>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      +{item.currency_symbol}&nbsp;
                      {(Number(relatedItem.discount_price) != 0) || (Number(relatedItem.discount_price) <= relatedItem.price) ?
                        relatedItem.discount_price : relatedItem.price
                      }
                      {(Number(relatedItem.discount_price) <= relatedItem.price) && (relatedItem.discount_price > 0) && (
                        <span className="line-through text-xs text-P_text">
                          &nbsp;{item.currency_symbol}&nbsp;{relatedItem.price}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          }

          {/* Add to Cart Button */}

        </div>
      </div>
      <div className="">
        {/* Image and Close Button */}


        {/* Content Section */}


        {/* Footer Section */}
        <div className="w-full bg-white dark:bg-inherit shadow-md p-4 flex justify-between items-center">
          <Button variant={"morefoodPrimary"} className="w-full flex justify-center items-center space-x-2 py-2 rounded-md"
            disabled={!item.has_variation ? false : !selectedVariation}
            onClick={handleAddToCart}
          >
            <CirclePlus />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default DetailComponent;
