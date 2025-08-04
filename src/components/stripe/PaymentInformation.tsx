// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { useDispatch } from "react-redux";
// import { ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import PaymenSelections from "../payment/PaymentSelection";



// // import PaymentSections from "./PaymentSections"; // Component that handles actual payment process UI

// type Props = {
//   amount: number;
//   currency: string;
//   metadata?: Record<string, any>;
//   confirmation_url: string;
//   onfinish?: () => void;
//   onSuccess?: () => void;
//   backbutton?: boolean;
// };

// const paymentOptions = [
//   {
//     id: "Stripe",
//     label: "Stripe",
//     lightIcon: "/images/png/stripePrimary.png",
//     darkIcon: "/images/png/stripeWhite.png",
//     isTextOnly: false,
//   },

//   {
//     id: "MoreDeals",
//     label: "More Deals",
//     lightIcon: "/images/png/moredeals.png",
//     darkIcon: "/images/png/MembersClubWhite.png",
//     isTextOnly: false,
//   },
//   {
//     id: "COD",
//     label: "Cash on Delivery",
//     lightIcon: "/images/png/moredeals.png",
//     darkIcon: "/images/png/MembersClubWhite.png",
//     isTextOnly: true,
//   },
// ];

// const PaymentInformation = ({
//   amount,
//   currency,
//   metadata,
//   onfinish,
//   onSuccess,
//   confirmation_url,
//   backbutton = true,
// }: Props) => {
//   const dispatch = useDispatch();
//   // const {
//   //   data: paymentOptions,
//   //   isLoading: paymentOptionsLoading,
//   //   isError: paymentOptionsError,
//   // } = usePaymentMethods();

//   // const [selectedPayment, setSelectedPayment] = useState<any>(null);
//   const [selectedPayment, setSelectedPayment] = useState<PaymentOption | null>(
//     null
//   );

//   const handlePaymentChange = (paymentId: PaymentOption) => {
//     setSelectedPayment(paymentId);
//     // If needed, trigger analytics, update local state, etc.
//   };

//   const handleBack = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(prevStep());
//   };

//   return (
//     <div className="rounded-lg w-full">
//       <h3 className="text-2xl font-semibold mb-4 flex justify-between">
//         Payment Options
//         {backbutton && (
//           <Button
//             className="bg-yellow-400 hover:bg-yellow-500"
//             variant={"outline"}
//             onClick={handleBack}
//           >
//             <ArrowLeft />
//             back
//           </Button>
//         )}
//       </h3>

//       <div className="flex flex-wrap gap-4 ">
//         {paymentOptionsLoading && (
//           <p className="text-sm text-black text-center border-2 border-muted foreground  p-4 bg-yellow-500 rounded-md">
//             Getting the available payment methods for you...
//           </p>
//         )}
//         {!paymentOptionsLoading && paymentOptionsError && (
//           <p className="text-red-500 text-sm text-center  border-2 border-muted foreground  p-4  rounded-md">
//             Failed to get payment methods
//           </p>
//         )}
//         {!paymentOptionsLoading &&
//           paymentOptions &&
//           paymentOptions.length === 0 && (
//             <p className="text-sm text-black text-center border-2 border-muted foreground bg-yellow-500 p-4  rounded-md">
//               Sorry no payment methods available for you please contact support
//             </p>
//           )}
//         {paymentOptions &&
//           paymentOptions.map((option) => (
//             <div className="group " key={option.id}>
//               <input
//                 type="radio"
//                 name="payment"
//                 id={option.id}
//                 className="hidden"
//                 onChange={() => handlePaymentChange(option)}
//                 checked={selectedPayment === option}
//               />
//               <label
//                 htmlFor={option.id}
//                 className={`flex flex-col items-center  p-4 w-36 h-24 justify-center shadow-lg rounded-lg cursor-pointer border transition-all
//                 ${
//                   selectedPayment === option
//                     ? "border-2 bg-yellow-400 border-yellow-400 text-white hover:bg-yellow-400 hover:border-yello-400"
//                     : "border-2 bg-transparent border-foreground hover:bg-yellow-400 hover:text-primary-foreground"
//                 }`}
//               >
//                 {option.isTextOnly ? (
//                   <p
//                     className={`text-center font-semibold ${
//                       selectedPayment === option
//                         ? "text-white"
//                         : "text-foreground"
//                     }`}
//                   >
//                     {option.label}
//                   </p>
//                 ) : (
//                   <>
//                     <Image
//                       src={option.lightIcon || ""}
//                       alt={option.label}
//                       width={500}
//                       height={500}
//                       className="w-24 h-16 object-contain dark:hidden block"
//                     />
//                     <Image
//                       src={option.darkIcon || ""}
//                       alt={option.label}
//                       width={500}
//                       height={500}
//                       className="w-24 h-16 object-contain dark:block hidden"
//                     />
//                   </>
//                 )}
//               </label>
//             </div>
//           ))}
//       </div>
//       <p className="text-[13px] text-gray-300 mt-4 italic">
//         * Please ensure your selected payment method is supported in your
//         region. For any issues, contact our support team.
//       </p>
//       {selectedPayment && (
//         <PaymenSelections
//           selectedPayment={selectedPayment}
//           amount={amount}
//           currency={currency}
//           metadata={metadata}
//           confirmation_url={confirmation_url}
//           onfinish={onfinish}
//           onSuccess={onSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default PaymentInformation;
