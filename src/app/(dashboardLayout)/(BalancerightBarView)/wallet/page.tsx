import QuickCard from "@/components/cards/QuickCard";

import { Button } from "@/components/ui/button";

import { Metadata } from "next";
import Link from "next/link";
import WalletPageContent from "@/components/moreclub/wallets/WalletPageContent";
import BackButton from "@/components/ui/back_button";

const WalletLink = [
  {
    id: 1,
    title: "Send",
    url: "/wallet/send",
    image: "/images/svg/send.svg",
    dark: "/images/svg/send.svg",
    visibility: true,
    background: "bg-success",
    foreground: "text-success-foreground",
  },
  {
    id: 2,
    title: "Withdraw",
    url: "/wallet/withdraw",
    image: "/images/svg/withdraw_amount.svg",
    dark: "/images/svg/withdraw_amount.svg",
    visibility: true,
    background: "bg-destructive",
    foreground: "text-destructive-foreground",
  },
  {
    id: 3,
    title: "Load",
    url: "/wallet/load",
    image: "/images/svg/load_amount.svg",
    dark: "/images/svg/load_amount.svg",
    visibility: true,
    background: "bg-warning",
    foreground: "text-warning-foreground",
  },
];

export const metadata: Metadata = {
  title: "Wallet | MOREDEALS CLUB",
  description: "Wallet page for the User",
};

export default function WalletPage() {
  return (
    <>
      <div className="flex-1 space-y-4 lg:p-8 pt-6">
        <div className="flex items-center justify-between  space-y-2 ">
          <div className="flex items-center space-x-2">
            <BackButton />
            <h2 className="text-3xl font-bold tracking-tight">Wallet</h2>
          </div>

          <div className=" items-center space-x-2 hidden md:flex">
            {WalletLink &&
              WalletLink.filter((item) => item.visibility).map(
                (category, index) => (
                  <Link href={category.url} key={category.id}>
                    <Button
                      className={`${category.background} ${category.foreground}`}
                    >
                      {category.title}
                    </Button>
                  </Link>
                )
              )}
          </div>
        </div>
        <div className="grid grid-cols-3 md:hidden gap-2">
          {WalletLink &&
            WalletLink.filter((item) => item.visibility).map(
              (category, index) => <QuickCard key={index} category={category} />
            )}
        </div>

        <WalletPageContent />
      </div>
    </>
  );
}
