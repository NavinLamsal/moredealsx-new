import OrderInformation from "@/components/morefood/cart/OrderInformation";
import CartDetails from "@/components/morefood/Checkout/CartDetails";



export default function Checkout() {
    return (
      <div className="flex justify-start bg-gray-100 dark:bg-background lg:p-6 lg:mt-0 mt-6">
        <div className="max-w-7xl w-full grid grid-cols-12  gap-6 ">
          {/* Left Section */}
          <div className="col-span-12 lg:col-span-7 bg-card p-6 rounded-lg shadow order-2 lg:order-1">
           <OrderInformation/>
          </div>
          
          {/* Right Section */}
          <div className="col-span-12 lg:col-span-5 bg-card p-6   rounded-lg shadow order-1 lg:order-2 lg:h-screen">
          <CartDetails/>
          </div>
        </div>
      </div>
    );
  }
  