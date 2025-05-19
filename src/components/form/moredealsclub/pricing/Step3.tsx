"use client";
import React from "react";
import PaymentSuccessPage from "@/components/moreclub/success";


interface Step3Props {
  purchasingInformation: any 
}

const Step3Form: React.FC<Step3Props> = ({ purchasingInformation, }) => {
  // const [loading, setLoading] = useState(false);
  // const transactionData = {
  //   "sender_name": `${purchasingInformation?.user.first_name} ${purchasingInformation?.user?.last_name}`,

  //   "receiver_name": "",
  //   "actual_amount": purchasingInformation.currency_sent_amount,
  //   "send_amount": purchasingInformation.currency_sent_amount,
  //   "receive_amount": purchasingInformation.currency_received_amount,
  //   "sender_currency_symbol": purchasingInformation.currency_sent_symbol,
  //   "receiver_currency_symbol": purchasingInformation.currency_received_symbol,
  //   "remarks": purchasingInformation.remarks,
  //   "transaction_date": moment.utc(purchasingInformation.timestamp).local().format("DD MMM, YYYY h:mm A"),
  //   "narration": purchasingInformation.is_refund  ? `${purchasingInformation?.narration} (Refund)` : `${purchasingInformation.narration}`,
  //   "is_completed": purchasingInformation.is_completed,
  // };

  // const handleGenerateAndDownload = async () => {
  //   setLoading(true);

  //   // Create PDF document
  //   const doc = <PdfMaker title="Transaction Receipt"><TransactionBody transaction={transactionData} /></PdfMaker>;
    
  //   // Convert it to a blob
  //   const blob = await pdf(doc).toBlob();

  //   // Create a download link and trigger it
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "transaction-receipt.pdf";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);

  //   // Clean up
  //   URL.revokeObjectURL(url);
  //   setLoading(false);
  // };

  return (
    <div className="space-y-4 text-center">
      <PaymentSuccessPage>
        <>
          <h3 className="text-4xl font-bold">Success</h3>
          <p>You have {purchasingInformation.membership_name} <br/> package subscribed <br/> successfully</p>
          {/* <p> {moment(transactionData.transaction_date).format("DD MMM, YYYY h:mm A")}</p> */}

          {/* <Button
            className=""
            onClick={handleGenerateAndDownload}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5 " /> : <ReceiptText className="w-5 h-5 " />} Download Receipt
          </Button> */}
         
        </>
      </PaymentSuccessPage>

    </div>
  );
};

export default Step3Form;
