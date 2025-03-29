"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { clearCart } from "@/lib/redux/slice/morefood/productCart";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";


export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const dispatch = useDispatch();
  // console.log("Payment confirmed successfully and cart cleared");
  dispatch(clearCart()); // Dispatch the action to clear the cart
  // Redirect or further update the UI as needed

  const restaurant_slug = useAppSelector((state) => state.foodCart.restaurant_slug);

  const paths = restaurant_slug ? `/restaurant/${restaurant_slug.replace(/^"(.*)"$/, "$1")}` : "/restaurant";

  return (
    <div className="flex items-center justify-center p-4">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-2">Thank you for ordering!</h2>
        
        <p className="mb-4">
          Your order has been placed Successfully 
        </p>
        <Link href={`${!restaurant_slug ? `/morefood/` : `/morefood/restaurant/${restaurant_slug}`}`}>
            <Button  variant="morefoodPrimary">
              View Resturants
            </Button>
          </Link>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8"
      >
        <div className="flex items-center justify-center space-x-2">
          <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
          <Image
                src="/images/png/morefood.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-8 h-8"
              />
            </div>
            <p className="text-xl font-semibold text-red-500">MOREFOOD</p>
            
        </div>
        <p className="text-xs font-semibold text-muted-foreground mt-4"> powered by MORE DEALS CLUB</p>
      </motion.div>
    </motion.div>
  </div>

    
  );
}

// <div className="flex flex-col items-center justify-center p-10">
    //   <div className="bg-white dark:bg-dark-primary rounded-lg shadow p-5 text-center">
    //     <div className="text-orange-500  animate-bounce mb-4">
    //       <TiTick className="text-[200px] mx-auto rotate-12" />
    //     </div>
        // <h2 className="text-2xl font-semibold mb-2">Thank you for ordering!</h2>
        
        // <p className="mb-4">
        //   Your order has been placed Successfully 
        // </p>
    //     <div className="flex gap-4">
        //   <Link href="/restaurant">
        //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        //       View Resturants
        //     </button>
        //   </Link>

    //       <Link href={paths}>
    //         <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
    //           Add More Items
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
