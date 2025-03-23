"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useCallback, useEffect } from 'react'

// export const WalletDetail = ({onlyBalance}:{onlyBalance?:boolean}) => {
//   const dispatch = useDispatch();
//   const { balance, loading, error } = useSelector((state: RootState) => state.balance);
//   const fetchBalance = useCallback(async () => {
//     await fetchUserBalance(dispatch)
//   }, [dispatch]);

//   useEffect(() => {
//     fetchBalance(); // Fetch immediately on component mount
//     const interval = setInterval(fetchBalance, 60000); // Refresh balance every 60 sec
//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, [fetchBalance]);


//   return (
   
//         <div className="flex flex-col gap-4">
//           <div>
//             <h2 className="text-2xl font-bold">
//               {error && error}
//               {loading && !balance && <span>
//                 <span className="h-2 w-4 bg-gray-200"></span>&nbsp;
//                 <span className="h-2 w-12 bg-gray-200"></span>
//               </span>}

//               {balance?.currency.symbol ?? ""} {balance?.balance ?? ""}

//             </h2>
//             <p className="text-sm text-muted-foreground">Available Balance</p>
//           </div>
//           {onlyBalance &&
//           <div>
//             <h2 className="text-2xl font-bold">750 ETH</h2>
//             <p className="text-sm text-muted-foreground">Total Earnings</p>
//           </div>
//           }
//         </div>
    

//   )
// }
export const WalletDetail = ({ onlyBalance }: { onlyBalance?: boolean }) => {
  const dispatch = useDispatch();
  const { balance, loading, error } = useSelector(
    (state: RootState) => state.balance
  );

  const fetchBalance = useCallback(async () => {
    await fetchUserBalance(dispatch);
  }, [dispatch]);

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 60000);
    return () => clearInterval(interval);
  }, [fetchBalance]);

  if (onlyBalance) {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">
          {error && !balance && error}
          {loading && !balance && (
            <span>
              <span className="h-2 w-4 bg-gray-200"></span>&nbsp;
              <span className="h-2 w-12 bg-gray-200"></span>
            </span>
          )}
          {balance?.currency.symbol ?? ""} {balance?.balance ?? ""}
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold">
          {error && error}
          {loading && !balance && (
            <span>
              <span className="h-2 w-4 bg-gray-200"></span>&nbsp;
              <span className="h-2 w-12 bg-gray-200"></span>
            </span>
          )}
          {balance?.currency.symbol ?? ""} {balance?.balance ?? ""}
        </h2>
        <p className="text-sm text-muted-foreground">Available Balance</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold">750 ETH</h2>
        <p className="text-sm text-muted-foreground">Total Earnings</p>
      </div>
    </div>
  );
};

export const WalletInfo =()=>{

  return(
    <Card className="w-full p-4 rounded-xl shadow-lg ">
    <CardHeader className="flex justify-between items-center w-full">
      <h3 className="text-lg font-semibold flex justify-between items-center w-full"><span className="text-lg font-semibold">Account Balance</span>
        <a href="#" className="text-blue-500 text-sm">View All</a></h3>
    </CardHeader>
    <CardContent>
    <WalletDetail/>
    </CardContent>
    </Card>
  )

}


export default WalletInfo


import {
  Phone,
  Bolt,
  Droplet,
  Wifi,
  Plane,
  Bus,
  Tv,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { fetchUserBalance } from '@/lib/action/moreClub/wallet/balance';

const quickLinks = [
  { name: "Topup", icon: Phone },
  { name: "Electricity", icon: Bolt },
  { name: "Khanepani", icon: Droplet },
  { name: "Internet", icon: Wifi },
  { name: "Airlines", icon: Plane },
  { name: "Bus Tickets", icon: Bus },
  { name: "TV", icon: Tv },
  { name: "Credit Card", icon: CreditCard },
];

export function QuickLinks() {
  return (
    <Card className=" p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-4 gap-4 text-center text-primary">
        {quickLinks.map((link, index) => (
          <div key={index} className="flex flex-col items-center">
            <link.icon size={24} />
            <span className="text-sm mt-1">{link.name}</span>
          </div>
        ))}
      </div>
      <div className='mt-4 flex flex-col justify-center items-center'>

        <Button className="mt-4   py-2 rounded-lg flex justify-center items-center gap-2">
          View More <ChevronDown size={16} />
        </Button>
      </div>
    </Card>
  );
}





