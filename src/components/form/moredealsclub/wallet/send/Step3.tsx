"use client";
import React, { useState } from "react";
import moment from "moment";
import PaymentSuccessPage from "@/components/moreclub/success";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import PdfMaker from "@/components/pdf/PdfMaker";
import TransactionBody from "@/components/pdf/Transaction";
import { Button } from "@/components/ui/button";
import { Loader2, ReceiptText } from "lucide-react";

interface Step3Props {
  sendingInformation: { [key: string]: string };
}

const Step3Form: React.FC<Step3Props> = ({ sendingInformation, }) => {
  const [loading, setLoading] = useState(false);
  const transactionData = {
   
    "sender_name": sendingInformation.sender_name,
    "receiver_name": sendingInformation.receiver_name,
    "actual_amount": sendingInformation.actual_amount,
    "send_amount": sendingInformation.send_amount,
    "receive_amount": sendingInformation.receive_amount,
    "sender_currency_symbol": sendingInformation.sender_currency_symbol,
    "receiver_currency_symbol": sendingInformation.receiver_currency_symbol,
    "remarks": sendingInformation.remarks,
    "transaction_date":moment(sendingInformation.transaction_date).format("DD MMM, YYYY h:mm A"),
    "narration": sendingInformation.narration,
  };

  const handleGenerateAndDownload = async () => {
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
    <div className="space-y-4 text-center">
      <PaymentSuccessPage>
        <>
          <h3 className="text-4xl font-bold"><span className="text-xl">{transactionData.sender_currency_symbol}</span>{transactionData.send_amount}</h3>
          <p>Fund Transfered to {transactionData.receiver_name}</p>
          <p> {moment(transactionData.transaction_date).format("DD MMM, YYYY h:mm A")}</p>

          <Button
            className=""
            onClick={handleGenerateAndDownload}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5 " /> : <ReceiptText className="w-5 h-5 " />} Download Receipt
          </Button>
         
        </>
      </PaymentSuccessPage>

    </div>
  );
};

export default Step3Form;
