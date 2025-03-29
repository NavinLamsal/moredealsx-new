// import { Button } from '@/components/ui/button'
// import { nextStep } from '@/lib/redux/slice/morefood/CheckoutSlice';
// import { RootState } from '@/lib/redux/store';
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// const CheckoutButton = () => {
//     const dispatch = useDispatch();
//     const product = useSelector((state: RootState) => state.foodCart);
//     const delivery = useSelector((state: RootState) => state.delivery);
//     const [loading, setLoading] = React.useState(false);




//   return (
//     <>

//     <Button variant={"morefoodPrimary"} className="w-full" onClick={() => {dispatch(nextStep())}}>Continue to payment</Button>
//     </>
//   )
// }

// export default CheckoutButton


import { Button } from '@/components/ui/button';
import { nextStep, setFieldError } from '@/lib/redux/slice/morefood/CheckoutSlice';
import { RootState } from '@/lib/redux/store';
import { showToast } from '@/lib/utilities/toastService';
import { validateLocationDetails, validateRequired } from '@/lib/validation/common';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutButton = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.foodCart);
  const delivery = useSelector((state: RootState) => state.delivery);
  const { receiverName, mobileNumber, deliverytype,
    note,
    arrivalTime,
    location,
    lat,
    lon } = useSelector((state: RootState) => state.delivery);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});


  // const validate = async (fieldValues: Partial<{
  //   receiverName: string;
  //   mobileNumber: string;
  //   deliverytype: string;
  //   note: string;
  //   arrivalTime: string;
  //   location: string;
  //   lat: number;
  //   lon: number;
  // }> = { receiverName, mobileNumber , deliverytype, note, arrivalTime, location, lat, lon }) => {

  //   // Explicitly define tempErrors as a dynamic object
  //   const tempErrors: Record<string, string> = { ...errors };

  //   if ("receiverName" in fieldValues) {
  //     tempErrors.receiverName = validateRequired(fieldValues.receiverName || "", "Receiver Name");
  //   }

  //   if ("mobileNumber" in fieldValues) {
  //     tempErrors.mobileNumber = validateRequired(fieldValues.mobileNumber || "", "Mobile Number");
  //   }
  //   if ("deliverytype" in fieldValues) {
  //     tempErrors.deliverytype = validateRequired(fieldValues.deliverytype || "", "Delivery Type");
  //   }
  //   if("arrivalTime" in fieldValues) {
  //     if(deliverytype === "delivery"){
  //       tempErrors.arrivalTime = ""
  //     }else{
  //       tempErrors.arrivalTime = validateRequired(fieldValues.arrivalTime || "", "Arrival Time");
  //     }
  //   }
  //   if("location" in fieldValues) {
  //     tempErrors.location = validateLocationDetails("Location", fieldValues.location || "", `${lat}` || "",  `${lon}` || "");
  //   }
   
  //   console.log("tempErrors", tempErrors);
  //   dispatch
  //   setErrors(tempErrors);
  //   return Object.values(tempErrors).every((error) => !error);
  // };

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
  
    // Explicitly define tempErrors as a dynamic object
    const tempErrors: Record<string, string> = { ...errors };
  
    // Validate receiverName
    if ("receiverName" in fieldValues) {
      const errorMessage = validateRequired(fieldValues.receiverName || "", "Receiver Name");
      tempErrors.receiverName = errorMessage;
      if (errorMessage) {
        dispatch(setFieldError({ field: "receiverName", message: errorMessage }));
      }
    }
  
    // Validate mobileNumber
    if ("mobileNumber" in fieldValues) {
      const errorMessage = validateRequired(fieldValues.mobileNumber || "", "Mobile Number");
      tempErrors.mobileNumber = errorMessage;
      if (errorMessage) {
        dispatch(setFieldError({ field: "mobileNumber", message: errorMessage }));
      }
    }
  
    // Validate deliverytype
    if ("deliverytype" in fieldValues) {
      const errorMessage = validateRequired(fieldValues.deliverytype || "", "Delivery Type");
      tempErrors.deliverytype = errorMessage;
      if (errorMessage) {
        dispatch(setFieldError({ field: "deliverytype", message: errorMessage }));
      }
    }
  
    // Validate arrivalTime (only if deliverytype is not 'delivery')
    if ("arrivalTime" in fieldValues) {
      let errorMessage = "";
      if (deliverytype === "delivery") {
        errorMessage = "";
      } else {
        errorMessage = validateRequired(fieldValues.arrivalTime || "", "Arrival Time");
      }
      tempErrors.arrivalTime = errorMessage;
      if (errorMessage) {
        dispatch(setFieldError({ field: "arrivalTime", message: errorMessage }));
      }
    }
  
    // Validate location
    if ("location" in fieldValues) {
      const errorMessage = validateLocationDetails("Location", fieldValues.location || "", `${lat}` || "", `${lon}` || "");
      tempErrors.location = errorMessage;
      if (errorMessage) {
        dispatch(setFieldError({ field: "location", message: errorMessage }));
      }
    }
  
    // Set all errors to Redux store
    // dispatch(setErrors(tempErrors));
     setErrors(tempErrors);
    // Return true if no errors, false otherwise
    return Object.values(tempErrors).every((error) => !error);
  };
  


  const handleCheckout = async () => {
    const totalItem = product.items.reduce((total, item) => total + (item.quantity || 0), 0);
    const totalOffer = product.exclusiveOffers.reduce((total, item) => total + (item.quantity || 0), 0);
    const totalItems = totalItem + totalOffer;





    // Check if there are products in the cart
    if (totalItems === 0) {
      showToast("Your cart is empty. Please add items before proceeding.", "error");
      // alert('Your cart is empty. Please add items before proceeding.');
      return;
    }

    // Check if the necessary delivery form fields are set
    if (!(await validate())) {
      // alert('Please complete all delivery information before proceeding.');
      return;
    }

    // Dispatch nextStep if all checks pass
    dispatch(nextStep());
  };

  return (
    <Button
      variant={"morefoodPrimary"}
      className="w-full"
      onClick={handleCheckout}
      disabled={loading}
    >
      Continue to payment
    </Button>
  );
};

export default CheckoutButton;
