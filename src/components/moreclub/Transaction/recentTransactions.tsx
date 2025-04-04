"use client"
import TransactionCard from "@/components/cards/TransactionCard";
import { fetchRecentTransactions } from "@/lib/action/moreClub/transaction";
import { getCurrencySymbolKey, getTransactionAmountKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";


export function RecentSales() {


  const { data, isLoading, isError } = useQuery({
    queryKey: ["recentTransactions"],
    queryFn: () => fetchRecentTransactions(),
    staleTime: 500000
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching transactions.</p>;




  return (


    <div className="">

      {!data?.data[0]?.transactions.length && <p className="text-center">No Transactions Found</p>}

      {data?.data[0]?.transactions.map((row, index) => (
        <TransactionCard
          key={`${row.transaction_id}-${index}`}
          id={row.transaction_id}

          type={row.transaction_type}
          is_Completed={row.is_completed}
          narration={`${row.is_refund ? `${row.narration} (Refund)` : row.narration}`}
          time={moment(row.timestamp).format("hh:mm A")}
          amount={row[getTransactionAmountKey(row.transaction_type)]}
          prevbalance={row.previous_balance}
          currency={row[getCurrencySymbolKey(row.transaction_type)]}
          default_currency={row[getCurrencySymbolKey(row.transaction_type)]}
          ref={null}
        />
      ))}

    </div>
  )
}
