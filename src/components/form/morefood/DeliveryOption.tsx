// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/lib/redux/store";
// import { updateFormData } from "@/lib/redux/slice/morefood/CheckoutSlice";


// export default function DeliveryOptions({   deliveryOptions }:{ deliveryOptions: string[] }) {

//     const dispatch = useDispatch()
//     const formData = useSelector((state: RootState) => state.delivery);


//     const optionData = {
//         delivery: {
//           label: "Delivery",
//           Icon: () => (
//             <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M19 15c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3m-9-7H5v2h5zm7-1h-3v2h3v2.65L13.5 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.5l4.5-5.65V7a2 2 0 0 0-2-2M7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1"
//               ></path>
//             </svg>
//           ),
//         },
//         packed: {
//           label: "Pick Up",
//           Icon: () => (
//             <svg xmlns="http://www.w3.org/2000/svg" width={28} height={24} viewBox="0 0 28 24">
//               <path
//                 fill="currentColor"
//                 d="M.482 24a.393.393 0 0 1-.389-.393v-1.783c0-.217.176-.393.393-.393h1.347V8.671a.8.8 0 0 1 .039-.244l-.002.006a3.27 3.27 0 0 1-1.8-1.287l-.007-.011A.4.4 0 0 1 0 6.921V.394C0 .177.176.001.393 0h27.014c.217 0 .393.176.393.393V6.92a.4.4 0 0 1-.064.215l.001-.002a3.49 3.49 0 0 1-2.687 1.468h-.008V21.43h1.091c.217 0 .393.176.393.393v1.783a.393.393 0 0 1-.393.393h-.001zm22.99-2.965V8.673q0-.106.026-.202l-.001.006a3.5 3.5 0 0 1-1.53-.836l.002.002a3.82 3.82 0 0 1-2.68.976h.006a3.8 3.8 0 0 1-2.69-.996l.003.003a3.8 3.8 0 0 1-2.574.995l-.119-.002h.006a3.82 3.82 0 0 1-2.69-.996l.003.003a3.8 3.8 0 0 1-2.575.995l-.128-.002h.006a3.8 3.8 0 0 1-2.69-.996l.003.003a3.74 3.74 0 0 1-2.441.993h-.005v12.417H4.56v-5.253c0-.217.176-.393.393-.393h4.651c.217 0 .393.176.393.393v5.253z"
//               ></path>
//             </svg>
//           ),
//         },
//         "dine-here": {
//           label: "Dine",
//           Icon: () => (
//             <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M17.012 10.192H6.994l-.352 2.731h10.735zM4.9 18.472l1.114-8.28h-2.36q-.327 0-.528-.265t-.114-.586l1.175-4.058q.061-.23.234-.362q.173-.133.408-.113H19.19q.234 0 .407.132q.173.133.235.362l1.175 4.038q.086.321-.115.587q-.2.265-.528.265h-2.373l1.108 8.28q.03.218-.112.383q-.144.164-.363.164q-.183 0-.326-.122t-.174-.305l-.627-4.669H6.502l-.627 4.689q-.03.182-.174.295t-.326.112q-.22 0-.363-.164T4.9 18.47"
//               ></path>
//             </svg>
//           ),
//         },
//       } as const;

//     const handleDeliveryTypeChange = (deliverytype: string) => {
//         if (deliverytype === "delivery") {
//         //   const storedLocation = localStorage.getItem("location") || "No location selected";
//         //   const storedLat = localStorage.getItem("latitude");
//         //   const storedLon = localStorage.getItem("longitude");
//         //   dispatch(
//         //     updateFormData({
//         //       location: storedLocation,
//         //       lat: parseFloat(lat),
//         //       lon: parseFloat(lng),
//         //     })
//         //   );
//         // } else {
//         //   dispatch(
//         //     updateFormData({
//         //       location: address,
//         //       lat: parseFloat(lat),
//         //       lon: parseFloat(lng),
//         //     })
//         //   );
//         // }
    
//         dispatch(updateFormData({ deliverytype }));
    
//       };


//   return (
//     <div className="flex bg-gray-100 rounded-full p-1 w-full max-w-md mx-auto">
//       {deliveryOptions.map((option: string) => {
//          const isSelected = formData.deliverytype === option;
//          const key = option as keyof typeof optionData; 
//          const { label, Icon } = optionData[key];
 
//          return (
//            <button
//              key={option}
//              type="button"
//              value={option}
//              onClick={() => handleDeliveryTypeChange(option)}
//              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-full transition ${
//                isSelected ? "bg-white text-black shadow-md" : "text-gray-500"
//              }`}
//            >
//              <Icon />
//              <span className="ml-2">{label}</span>
//            </button>
//          );
//        })}
//     </div>
//   );
// }}
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
              isSelected ? "bg-white text-black shadow-md" : "text-gray-500"
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

