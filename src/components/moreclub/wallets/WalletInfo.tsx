"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useCallback, useEffect } from 'react'

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
      <div className="grid grid-cols-8 w-full">
        <h2 className="text-2xl font-bold col-span-6 w-full">
          {error && error}
          {loading && !balance && (
            <span>
              <span className="h-2 w-4 bg-gray-200"></span>&nbsp;
              <span className="h-2 w-12 bg-gray-200"></span>
            </span>
          )}
          {balance?.currency.symbol ?? ""} {balance?.balance ?? ""}
        </h2>
        <p className='col-span-2 font-extrabold'>
        {balance?.currency.symbol ? (
              balance.currency.symbol
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            )}

        </p>
        <p className="text-sm text-muted-foreground col-span-8">Available Balance</p>
      </div>
    </div>
  );
};

export const WalletInfo =()=>{

  return(
    <Card className="w-full p-4 rounded-xl shadow-lg ">
    <CardHeader className="flex justify-between items-center w-full">
      <h3 className="text-lg font-semibold flex justify-between items-center w-full"><span className="text-lg font-semibold">Account Balance</span>
       </h3>
    </CardHeader>
    <CardContent>
    <WalletDetail/>
    
    </CardContent>
    </Card>
  )

}


export default WalletInfo


import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { fetchUserBalance } from '@/lib/action/moreClub/wallet/balance';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const quickLinks = [
  { name: "Send", icon: '/images/svg/send.svg', link:"/wallet/send" },
  { name: "Load", icon: '/images/svg/load_amount.svg' , link:"/wallet/load" },
  { name: "Withdraw", icon: '/images/svg/withdraw_amount.svg' , link:"/wallet/withdraw" },
  { name: "Transaction", icon: '/images/png/businesstransaction.png', link:"/transaction/user/" },
  { name: "Profile", icon: '/images/png/user.png', link:"/dashboard/profile" },
  { name: "Kyc", icon: '/images/png/kyc.png', link:"/settings/kyc" },
  { name: "Events", icon: '/images/svg/events.svg' ,link:"/event" },
  { name: "Offers", icon: '/images/png/offers.png' ,link:"#"},
];
const Morefood = [
  { name: "Restaurants", icon: '/images/png/restaurant.png' , link:"/morefood/category/lists?title=All Restaurants" },
  { name: "Orders", icon: '/images/png/order.png' , link:"/morefood/order" },
  { name: "Reviews", icon: '/images/png/reviews.png', link:"/morefood/reviews" },
  { name: "Offers", icon: '/images/png/offers.png', link:"/morefood/category/today-offer?title=Today's Offers"},
];
const Moresalon = [
  { name: "Restaurants", icon: '/images/svg/send.svg' },
  { name: "Orders", icon: '/images/svg/send.svg' },
  { name: "Reviews", icon: '/images/svg/send.svg' },
  { name: "Offers", icon: '/images/svg/send.svg' },
];

export function QuickLinks() {
  return (
    <Card className=" p-4 rounded-lg shadow-lg">
      <p className='text-muted-foreground text-sm my-4'>QUICK LINKS</p>
      <div className="grid grid-cols-4 gap-4 text-center text-primary">
        {quickLinks.map((link, index) => (
          <Link href={link.link} key={index} className="flex flex-col items-center">
            <Avatar>
              <AvatarImage src={link.icon} alt={link.name}  className='size-10 p-1 dark:bg-white rounded-full'/>
              <AvatarFallback className="text-2xl size-10 font-extrabold bg-primary p-4 rounded-full text-white">{link.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm mt-1">{link.name}</span>
          </Link>
        ))}
      </div>
      <p className='text-muted-foreground text-sm my-4'>MOREFOOD</p>
      <div className="grid grid-cols-4 gap-4 text-center text-primary dark:text-primary-foreground">
        {Morefood.map((link, index) => (
          <Link href={link.link} key={index} className="flex flex-col items-center">
            <Avatar className=''>
              <AvatarImage src={link.icon} alt={link.name}  className='size-10 p-1  dark:bg-white rounded-full overflow-hidden'/>
              <AvatarFallback className="text-2xl size-10 font-extrabold bg-primary p-4 rounded-full dark:bg-white text-white">{link.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm  mt-1">{link.name}</span>
          </Link>
        ))}
      </div>
      {/* <div className='mt-4 flex flex-col justify-center items-center'>

        <Button className="mt-4   py-2 rounded-lg flex justify-center items-center gap-2">
          View More <ChevronDown size={16} />
        </Button>
      </div> */}
    </Card>
  );
}





