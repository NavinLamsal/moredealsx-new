import React from 'react'
import QuickCard from '../cards/QuickCard'




const QuickLinks = () => {

  const QuickLink = [
    {
      id: 1,
      title: "Send",
      url: "/dashboard/wallet/send",
      image: "/images/svg/send.svg",
      dark: "/images/svg/send.svg",
      visibility: true,
      background: "bg-success",
      foreground: "text-success-foreground"

    },
    {
      id: 2,
      title: "Withdraw",
      url: "/wallet/withdraw",
      image: "/images/svg/withdraw_amount.svg",
      dark: "/images/svg/withdraw_amount.svg",
      visibility: true,
      background: "bg-destructive",
      foreground: "text-destructive-foreground"
    },
    {
      id: 3,
      title: "Load",
      url: "/wallet/load",
      image: "/images/svg/load_amount.svg",
      dark: "/images/svg/load_amount.svg",
      visibility: true,
      background: "bg-warning",
      foreground: "text-warning-foreground"
    },

    {
      id: 4,
      title: "Scan",
      url: "/scan",
      image: "/images/svg/ScanBlack.svg",
      dark: "/images/svg/ScanWhite.svg",
      background: "bg-card",
      foreground: "text-card-foreground",
      visibility: true
    },
    {
      id: 5,
      title: "Network",
      url: "/network/networks",
      image: "/images/svg/NetworkYellow.svg",
      dark: "/images/svg/NetworkWhite.svg",
      background: "bg-card",
      foreground: "text-card-foreground",
      visibility: true
    },
    {
      id: 6,
      title: "Leads",
      url: "/network/leads",
      image: "/images/svg/leads.svg",
      dark: "/images/svg/leads.svg",
      background: "bg-card",
      foreground: "text-card-foreground",
      visibility: true
    },
    {
      id: 7,
      title: "Transactions",
      url: "/transaction",
      image: "/images/svg/Transaction.svg",
      dark: "/images/svg/Transaction.svg",
      background: "bg-card",
      foreground: "text-card-foreground",
      visibility: true
    },
  ]


  return (
    <div className="container grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4">
      {QuickLink && QuickLink.filter((item) => item.visibility).map((category, index) => (
        <QuickCard key={index} category={category} />
      ))}
    </div>
  )
}

export default QuickLinks;
