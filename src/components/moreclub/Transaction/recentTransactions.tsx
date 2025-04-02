"use client"
import TransactionCard from "@/components/cards/TransactionCard";
import { fetchRecentTransactions } from "@/lib/action/moreClub/transaction";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";


export function RecentSales() {


  const { data, isLoading, isError } = useQuery({
    queryKey: ["recentTransactions"],
    queryFn: () => fetchRecentTransactions(),
    staleTime:500000
  });
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching transactions.</p>;




  return (


    <div className="">

 {!data?.data[0]?.transactions.length && <p className="text-center">No Transactions Found</p>}
 
{data?.data[0]?.transactions.map((row) => (
      <TransactionCard
      key={`${row.id}`}
      id={`${row.id}`}
      type={row.transaction_type}
      narration={row.narration}
      time={moment(row.timestamp).format("MMM D, YY hh:mm A")}
      amount={`${row.amount}`}
      prevbalance={row.previous_balance}
      currency={
        row.transaction_type === "" ? row.currency_sent_symbol : row.currency_received_symbol
      }
      default_currency="Rs"
      is_Completed= {true}

    />
    ))}

    </div>
  )
}
