import { Button } from "@/components/ui/button";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import Image from "next/image";
import { useEffect } from "react";


function PaypalPayment({ method,
payload}:{
    method:any,
    payload:{
        amount: number;
        products: any;
        payment_method: "khalti";
    }}) {
  
  const handlePayment = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}orders/create`;
    const data = payload;

    try {
      const response = await MoreClubApiClient(url, {data});

      // Check if the request was successful (status code 2xx)
      if (response.data.status === "success") {
        const responseData = await response.data.data;
        if (responseData.payment_method === "paypal") {
            PaypalCall(responseData.data);
        }
        // console.log(responseData);
        // if (responseData.payment_method === "esewa") {
        //   esewaCall(responseData.formData);
        // } else if (responseData.payment_method === "khalti") {
        //   khaltiCall(responseData.data);
        // }
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const PaypalCall = (data: any) => {
    window.location.href = data.payment_url;
  };

  const esewaCall = (formData: any) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
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

export default PaypalPayment;