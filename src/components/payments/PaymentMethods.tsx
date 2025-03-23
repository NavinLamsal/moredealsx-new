import React, { useState, useEffect } from "react";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Loader2 } from "lucide-react";
import KhaltiPayment from "./khalti/KhaltiPayment";
import PaypalPayment from "./paypal/paypalPayment";

interface PaymentMethod {
    id: string;
    code:string;
    icon: string;
    name: string;
}

interface PaymentMethodsProps {
    payload: any;
    method: string
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({  payload , method }) => {
    // const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    // const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [error, setError]= useState("")
    const [loading, setLoading]= useState(false)


    // useEffect(() => {
    //     // Replace this with your API call to get payment methods
    //     const fetchPaymentMethods = async () => {
    //         try{
    //             setLoading(true)
    //             const response = await MoreClubApiClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}payment/gateway/${countryCode}/list/`);
    //             const methods = await response.data.data
    //             setError("");
    //             setPaymentMethods(methods);

    //         }catch(err:any){
                
    //             setError(err.response.data.message || "Oops error getting load Method")
    //         }finally{
    //             setLoading(false)
    //         }
    //     };

    //     fetchPaymentMethods();
    // }, []);

      const handlePayment = async (method:string) => {

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}payments/initiate/`;
        const data = {...payload , 
            gateway:method,
            website_url:"http://localhost:3000",
            return_url:`${window.location.origin}/wallet/load/success`
        };
    
        try {
          const response = await MoreClubApiClient.post(url, data);
    
          if (response.status === 200) {
            const responseData = response.data.data;
            if (data.gateway === "paypal") {
                PaypalCall(responseData);
            }else if(data.gateway === "khalti"){
                khaltiCall(responseData.payment_url);
            }
          } else {
            console.error("Failed to fetch:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error during fetch:", error);
        }
      };

      const PaypalCall = (data: any) => {``
        window.location.href = data;
      };


      const khaltiCall = (data: any) => {
        window.location.href = data
      };




    return (
        <div className="space-y-4">
            {/* <div>
                <label className="block text-sm font-medium mb-1">Select Payment Method</label>
                {loading && 
                <Loader2 className="h-10 w-10 animate-spin"/>
                }
                {error && 
                error
                }
                
                <RadioGroup defaultValue={selectedMethod} className="grid grid-cols-3 gap-4" onValueChange={(value) =>  handlePayment(value)}
                    >
                {paymentMethods.length > 0 && paymentMethods.map((method) => (
                      <div>
                        <RadioGroupItem value={method.code} id={method.code} className="peer sr-only" />
                        <label
                          htmlFor={method.code}
                          className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-1.5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:text-white [&:has([data-state=checked])]:bg-primary"
                        >
                          {method?.icon ? 
                        <Image
                          src={method?.icon}
                          alt={method.name}
                          width={150}
                          height={150}
                          className="h-20 w-auto  object-contain"
                        />
                        :
                        <span className="h-20 w-20 flex justify-center items-center font-bold group-active:text-white">
                            {method.name.toUpperCase()}
                        </span>

                    }
                        </label>
                      </div>
                     
               
          
             
                    // <button
                    //   className="group flex flex-col items-center justify-center rounded-md shadow-lg  bg-white p-1.5 transition-all  text-black hover:bg-accent hover:text-accent-foreground 
                    //     focus:border-primary focus:text-white active:border-primary active:text-white"
                    //     onClick={(e)=> {e.preventDefault(); handlePayment(method.code)}}
                        
                    //     >
                    // {method?.icon ? 
                    //     <Image
                    //       src={method?.icon}
                    //       alt="Khalti"
                    //       width={150}
                    //       height={150}
                    //       className="h-20 w-auto  object-contain "
                    //     />
                    //     :
                    //     <span className="h-20 w-20 flex justify-center items-center font-bold group-active:text-white">
                    //         {method.name.toUpperCase()}
                    //     </span>

                    // }
                    // </button>
                    // <div>
                    //     {method.name === "Khalti" &&
                    //         <KhaltiPayment
                    //             method={method}
                    //             payload={payload}
                    //         />
                    //     }
                    //     {method.name === "Paypal" &&
                    //         <PaypalPayment
                    //             method={method}
                    //             payload={payload}
                    //         />
                    //     }
                    // </div>
                ))}
                </RadioGroup>

            </div> */}
            <div>
            {method === "khalti" &&
            <KhaltiPayment
            method={method}
            payload={payload}
            />
            }
            {method === "paypal" &&
            <PaypalPayment
            method={method}
            payload={payload}
            />
            }
                    </div>
        </div>
    );
};

export default PaymentMethods;
