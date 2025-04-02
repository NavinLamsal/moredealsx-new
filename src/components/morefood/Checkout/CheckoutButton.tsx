import { Button } from '@/components/ui/button';
import { useFetchRestaurant } from '@/lib/action/morefood/restaurantlist';
import { nextStep, setFieldError } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { RootState } from '@/lib/redux/store';
import { showToast } from '@/lib/utilities/toastService';
import { validateLocationDetails, validateRequired } from '@/lib/validation/common';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutButton = () => {
  const dispatch = useDispatch();
  const { fetchResturantDetails } = useFetchRestaurant();
  const product = useSelector((state: RootState) => state.foodCart);
  const delivery = useSelector((state: RootState) => state.delivery);
  const { receiverName, mobileNumber, deliverytype, note, arrivalTime, location, lat, lon } = delivery;
  
  const { data: resDetail, isLoading, isError } = useQuery({
    queryKey: ["restaurant Details", product.restaurant_slug],
    queryFn: () => fetchResturantDetails(product.restaurant_slug),
    staleTime: 360000,
    enabled: Boolean(product.restaurant_slug),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalItems = [...product.items, ...product.exclusiveOffers].reduce((total, item) => total + (item.quantity || 0), 0);
  const subtotal = [...product.items, ...product.exclusiveOffers].reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);

  const validate = async (fieldValues: Partial<{
    receiverName: string;
    mobileNumber: string;
    deliverytype: string;
    note: string;
    arrivalTime: string;
    location: string;
    lat: number;
    lon: number;
  }> = { receiverName, mobileNumber, deliverytype, note, arrivalTime, location, lat, lon }) => {
    const tempErrors: Record<string, string> = { ...errors };

    if ("receiverName" in fieldValues) {
      const errorMessage = validateRequired(fieldValues.receiverName || "", "Receiver Name");
      tempErrors.receiverName = errorMessage;
      if (errorMessage) dispatch(setFieldError({ field: "receiverName", message: errorMessage }));
    }

    if ("mobileNumber" in fieldValues) {
      const errorMessage = validateRequired(fieldValues.mobileNumber || "", "Mobile Number");
      tempErrors.mobileNumber = errorMessage;
      if (errorMessage) dispatch(setFieldError({ field: "mobileNumber", message: errorMessage }));
    }

    if ("deliverytype" in fieldValues) {
      const errorMessage = validateRequired(fieldValues.deliverytype || "", "Delivery Type");
      tempErrors.deliverytype = errorMessage;
      if (errorMessage) dispatch(setFieldError({ field: "deliverytype", message: errorMessage }));
    }

    if ("arrivalTime" in fieldValues) {
      let errorMessage = "";
      if (deliverytype !== "delivery") {
        errorMessage = validateRequired(fieldValues.arrivalTime || "", "Arrival Time");
      }
      tempErrors.arrivalTime = errorMessage;
      if (errorMessage) dispatch(setFieldError({ field: "arrivalTime", message: errorMessage }));
    }

    if ("location" in fieldValues) {
      const errorMessage = validateLocationDetails("Location", fieldValues.location || "", `${lat}` || "", `${lon}` || "");
      tempErrors.location = errorMessage;
      if (errorMessage) dispatch(setFieldError({ field: "location", message: errorMessage }));
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => !error);
  };

  const handleCheckout = async () => {
    if (totalItems === 0) {
      showToast("Your cart is empty. Please add items before proceeding.", "error");
      return;
    }

    if (!(await validate())) return;
    dispatch(nextStep());
  };

  const getButtonProps = () => {
    if (totalItems === 0) return { disabled: true, text: "Checkout" };
    if (isLoading) return { disabled: true, text: "Loading..." };
    if (isError || !resDetail) return { disabled: true, text: "Checkout" };
    if (!resDetail.open_hrs) return { disabled: true, text: "Restaurant is closed" };
    if (resDetail.min_order > subtotal && deliverytype === "delivery") {
      return { disabled: true, text: `Order must be more than ${resDetail.currency_symbol}${resDetail.min_order}` };
    }
    return { disabled: false, text: deliverytype !== "delivery" ? "Continue to payment" : "Checkout", onClick: handleCheckout };
  };

  const { disabled, text, onClick } = getButtonProps();

  return (
    <Button variant="morefoodPrimary" disabled={disabled} className="mt-4 w-full py-3 rounded-lg text-lg" onClick={onClick}>
      {text}
    </Button>
  );
};

export default CheckoutButton;