import LocationChange from "@/components/morefood/Checkout/LocationChange";
import RecieverInformation from "@/components/morefood/Checkout/RecieverInformation";
import Heading from "@/components/ui/heading";

export default function Checkout() {
    return (
      <div className="flex justify-start bg-gray-100 p-6">
        <div className="max-w-7xl w-full grid grid-cols-12  gap-6">
          {/* Left Section */}
          <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Checkout</h2>
            
            {/* Delivery Address */}
            <LocationChange/>
            
            {/* Delivery Instructions */}
            {/* <div className="mt-4 border-b pb-4">
              <h3 className="font-medium">Meet at my door</h3>
              <p className="text-gray-500 text-sm">Add delivery instructions</p>
              <button className="text-blue-500 text-sm">Edit</button>
            </div> */}
            
            {/* Delivery Options */}
            {/* <div className="mt-4 border-b pb-4">
              <h3 className="font-medium">Reciever Information</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                  <div>
                    <span className="text-green-600 font-medium">Priority</span>
                    <p className="text-gray-500 text-sm">20-35 min - Delivered directly to you</p>
                  </div>
                  <span className="text-gray-600">+$3.99</span>
                </div>
                <div className="flex justify-between p-3 border rounded-lg bg-gray-200">
                  <div>
                    <span className="font-medium">Standard</span>
                    <p className="text-gray-500 text-sm">25-40 min</p>
                  </div>
                </div>
                <div className="flex justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                  <div>
                    <span className="font-medium">Schedule</span>
                    <p className="text-gray-500 text-sm">Choose a time</p>
                  </div>
                </div>
              </div>
            </div> */}
            <RecieverInformation/>
            
            {/* Payment */}
            <div className="mt-4">
              <h3 className="font-medium">Payment</h3>
              <p className="text-gray-500 text-sm">Add payment method</p>
              <button className="text-blue-500 text-sm">Edit</button>
            </div>
            
            {/* Continue Button */}
            <button className="mt-4 w-full bg-black text-white py-3 rounded-lg">Continue to payment</button>
          </div>
          
          {/* Right Section */}
          <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img className="w-12 h-12 rounded-full" src="/taco-bell-logo.png" alt="Taco Bell" />
              <div>
                <h3 className="font-medium">Taco Bell</h3>
                <p className="text-gray-500 text-sm">524 Academy</p>
              </div>
            </div>
            <button className="mt-3 w-full bg-black text-white py-2 rounded-lg">Continue to payment</button>
            
            {/* Cart Summary */}
            <div className="mt-4">
              <h3 className="font-medium">Cart summary (1 item)</h3>
            </div>
            
            {/* Promotion */}
            <div className="mt-4">
              <h3 className="font-medium">Promotion</h3>
              <button className="text-blue-500 text-sm">Add promo code</button>
            </div>
            
            {/* Order Total */}
            <div className="mt-4">
              <h3 className="font-medium">Order total</h3>
              <div className="mt-2 text-sm text-gray-700">
                <div className="flex justify-between"><span>Subtotal</span><span>$3.40</span></div>
                <div className="flex justify-between"><span>Delivery Fee</span><span>$13.99</span></div>
                <div className="flex justify-between"><span>Taxes & Other Fees</span><span>$5.30</span></div>
                <div className="flex justify-between font-semibold mt-2"><span>Total</span><span>$22.69</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  