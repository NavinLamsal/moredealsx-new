"use client"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { updateFormData } from "@/lib/redux/slice/morefood/CheckoutSlice";

export default function DeliveryOptions({ deliveryOptions }: { deliveryOptions: string[] }) {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.delivery);

  const optionData = {
    delivery: {
      label: "Delivery",
      Icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 15c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m-9-7H5v2h5zm7-1h-3v2h3v2.65L13.5 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.5l4.5-5.65V7a2 2 0 0 0-2-2M7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1"
          ></path>
        </svg>
      ),
    },
    pickup: {
      label: "Pick Up",
      Icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512">
	<path fill="currentColor" d="m151.7 112.2l-23.3 42.7l16.2 8.9l172.8 13.5l28.7-23l-32.2 5.3l14.3-35.9zM346 125.8l21.8 27.3l-9.9 102.9l2.8 120.1l43.6 43.3l-12.1-51.2l5.5-112.9l-25.3-109.7zm-1.2 47.1l-34.6 29.4l-162.4-14.7l-33.3 44.2l-13.4 124.6l173.2 28.1l-174.88-12.4l-7.28 67.7l195.26 26.7l8.8-216.5zm6.1 18.8L313.7 256l-6.2 185.9l35.9-60.6l.3-125.3zm3.6 201.1l-47 79.7l92.8-30.6z"></path>
</svg>
      ),
    },
    "dine-here": {
      label: "Dine",
      Icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17.012 10.192H6.994l-.352 2.731h10.735zM4.9 18.472l1.114-8.28h-2.36q-.327 0-.528-.265t-.114-.586l1.175-4.058q.061-.23.234-.362q.173-.133.408-.113H19.19q.234 0 .407.132q.173.133.235.362l1.175 4.038q.086.321-.115.587q-.2.265-.528.265h-2.373l1.108 8.28q.03.218-.112.383q-.144.164-.363.164q-.183 0-.326-.122t-.174-.305l-.627-4.669H6.502l-.627 4.689q-.03.182-.174.295t-.326.112q-.22 0-.363-.164T4.9 18.47"
          ></path>
        </svg>
      ),
    },
  } as const;

  const handleDeliveryTypeChange = (deliverytype: string) => {
    dispatch(updateFormData({ deliverytype }));
  };

  return (
    
    <div className="flex bg-gray-100 rounded-full p-1 w-full max-w-md my-2">
      <p>{formData.errors.deliverytype}</p>
      {deliveryOptions.map((option) => {
         const key = option as keyof typeof optionData; // Ensure option is a valid key

         if (!optionData[key]) {
           console.error(`Invalid delivery option: ${option}`);
           return null; // Skip this option if it's invalid
         }
   
         const { label, Icon } = optionData[key];
         const isSelected = formData.deliverytype === option;

        return (
          <button
            key={option}
            type="button"
            value={option}
            onClick={() => handleDeliveryTypeChange(option)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-full transition ${
              isSelected ? " bg-morefoodPrimary text-morefoodPrimary-foreground shadow-md" : " bg-white text-black"
            }`}
          >
            <Icon />
            <span className="ml-2">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

