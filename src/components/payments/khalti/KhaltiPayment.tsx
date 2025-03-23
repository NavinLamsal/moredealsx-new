import { Button } from "@/components/ui/button";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import Image from "next/image";
import { useEffect } from "react";


function KhaltiPayment({ method,
payload}:{
    method:any,
    payload:{
        amount: number;
        products: any;
    }}) {
  
  const handlePayment = async (method:string) => {
 
         const url = `${process.env.NEXT_PUBLIC_BASE_URL}payments/initiate/`;
         const data = {...payload , 
             gateway: "khalti",
             website_url:"http://localhost:3000",
             return_url:`${window.location.origin}/wallet/load/success`
         };
     
         try {
           const response = await MoreClubApiClient.post(url, data);
     
           if (response.status === 200) {
             const responseData = response.data.data;
             localStorage.setItem("token", responseData.token);
             window.location.href = responseData.payment_url;
           } else {
             console.error("Failed to fetch:", response.status, response.statusText);
           }
         } catch (error) {
           console.error("Error during fetch:", error);
         }
       };


  useEffect(() => {
    const getOrders = async () => {
      const url = "http://localhost:5005/api/orders";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        //   setOrders(responseData);
        } else {
          console.error(
            "Failed to fetch:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    getOrders();
  }, []);

  return (
    
<button
  className="group flex flex-col items-center justify-center rounded-md shadow-lg  bg-white p-1.5 transition-all  text-black hover:bg-accent hover:text-accent-foreground 
    focus:border-primary focus:text-white active:border-primary active:text-white"
    onClick={() => handlePayment(method?.name)}
    >
  <Image
    src={method?.icon}
    alt="Khalti"
    width={150}
    height={150}
    className="h-20 w-auto  object-contain "
  />
</button>

    
  );
}

export default KhaltiPayment;