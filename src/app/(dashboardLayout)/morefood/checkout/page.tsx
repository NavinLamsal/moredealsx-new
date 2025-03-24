import DeliveryOptions from "@/components/form/morefood/DeliveryOption";
import Note from "@/components/form/morefood/Note";
import OrderInformation from "@/components/morefood/cart/OrderInformation";
import CartDetails from "@/components/morefood/Checkout/CartDetails";
import CheckoutButton from "@/components/morefood/Checkout/CheckoutButton";
import LocationChange from "@/components/morefood/Checkout/LocationChange";
import RecieverInformation from "@/components/morefood/Checkout/RecieverInformation";


export default function Checkout() {
    return (
      <div className="flex justify-start bg-gray-100 p-6">
        <div className="max-w-7xl w-full grid grid-cols-12  gap-6">
          {/* Left Section */}
          <div className="col-span-12 lg:col-span-7 bg-white p-6 rounded-lg shadow order-2 lg:order-1">
           <OrderInformation/>
          </div>
          
          {/* Right Section */}
          <div className="col-span-12 lg:col-span-5 bg-white p-6 rounded-lg shadow order-1 lg:order-2 h-screen">
          <CartDetails/>
          </div>
        </div>
      </div>
    );
  }
  