"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactionDetail } from "@/lib/action/moreClub/transaction";
import moment from "moment";
import { getCurrencySymbolKey, getTransactionAmountKey } from "@/lib/utils";
import PdfMaker from "@/components/pdf/PdfMaker";
import TransactionBody from "@/components/pdf/Transaction";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Loader2, ReceiptText } from "lucide-react";



interface TransactionDetailProps {
  transactionId: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const TransactionDetailView: React.FC<TransactionDetailProps> = ({ transactionId, isOpen, onClose }) => {
  const [loading, setLoading]= useState<boolean>(false);
  const { data: transaction, isLoading, isError } = useQuery({
    queryKey: ["transactionDetail", transactionId], // ✅ Cache the transaction details
    queryFn: () => fetchTransactionDetail(transactionId),
    enabled: !!transactionId && isOpen, // ✅ Fetch only when modal is open
    staleTime: 5 * 60 * 1000, // ✅ Cache for 5 minutes
  });



  const handleGenerateAndDownload = async (transactionData: any) => {
    setLoading(true);

    // Create PDF document
    const doc = <PdfMaker title="Transaction Receipt"><TransactionBody transaction={transactionData} /></PdfMaker>;
    
    // Convert it to a blob
    const blob = await pdf(doc).toBlob();

    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transaction-receipt.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up
    URL.revokeObjectURL(url);
    setLoading(false);
  };

  return (
   <>


        {isLoading ? (
          <p className="text-center text-gray-400 h-48 w-full">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-400 h-48 w-full">Failed to get transaction.</p>
        ) : transaction ? (
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-semibold">{transaction.currency} {transaction.amount}</span>
            </div>

            <div className="flex justify-between">
              <span>Transaction Type:</span>
              <span className="uppercase font-semibold">{transaction.transaction_type}</span>
            </div>

            <div className="flex justify-between">
              <span>Receiver:</span>
              <span className="font-medium">{transaction.transaction_type === "RECEIVE" ? `${transaction?.user.first_name} ${transaction?.user.last_name}` : transaction.transaction_type === "REFER" ? `${transaction?.user?.first_name} ${transaction?.user.last_name}` : `${transaction.action_user?.first_name} ${transaction?.action_user?.last_name}`}</span>
            </div>

            <div className="flex justify-between">
              <span>Sender:</span>
              <span className="font-medium">{transaction.transaction_type === "RECEIVE" ? `${transaction?.action_user.first_name} ${transaction?.action_user.last_name}` : transaction?.transaction_type === "REFER" ? `${transaction?.action_user.first_name} ${transaction?.action_user.last_name}` : `${transaction?.user.first_name} ${transaction?.user.last_name}`}</span>
            </div>

            <div className="flex justify-between">
              <span>Transaction Date:</span>
              <span>
                {moment(transaction.timestamp).format("DD MMM, YY, h:mm A")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Transaction Status:</span>
              <span className="font-medium">{transaction.narration}</span>
            </div>

            <div className="flex justify-between">
              <span>Remarks:</span>
              <span>{transaction.remarks}</span>
            </div>

            <Button
            className=""
            onClick={()=>{handleGenerateAndDownload({
                "sender_name": transaction.transaction_type === "RECEIVE" ? `${transaction?.action_user.first_name} ${transaction?.action_user.last_name}` : transaction?.transaction_type === "REFER" ? `${transaction?.action_user.first_name} ${transaction?.action_user.last_name}` : `${transaction?.user.first_name} ${transaction?.user.last_name}`,
                "receiver_name": transaction.transaction_type === "RECEIVE" ? `${transaction?.user.first_name} ${transaction?.user.last_name}` : transaction.transaction_type === "REFER" ? `${transaction?.user?.first_name} ${transaction?.user.last_name}` : `${transaction.action_user?.first_name} ${transaction?.action_user?.last_name}`,
                "actual_amount": transaction[getTransactionAmountKey(transaction.transaction_type)],
                "send_amount": transaction.currency_sent_amount,
                "receive_amount": transaction.currency_received_amount,
                "sender_currency_symbol": transaction.sender_currency_symbol,
                "receiver_currency_symbol": transaction.receiver_currency_symbol,
                "remarks": transaction.remarks,
                "transaction_date":moment(transaction.transaction_date).format("DD MMM, YYYY h:mm A"),
                "narration": transaction.is_refund  ? `${transaction?.narration} (Refund)` : `${transaction.narration}`,
                "is_completed": transaction.is_completed,
              })}}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5 " /> : <ReceiptText className="w-5 h-5 " />} Download Receipt
          </Button>
          </div>
        ) : (
          <p className="text-center text-gray-400">No transaction found.</p>
        )}
     
    </>
  );
};

export default TransactionDetailView;
