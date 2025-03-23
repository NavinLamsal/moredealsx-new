"use client";
import React from "react";
import moment from "moment";
import PaymentSuccessPage from "@/components/moreclub/success";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfMaker from "@/components/pdf/PdfMaker";
import TransactionBody from "@/components/pdf/Transaction";

interface Step3Props {
    data: any;
  onPrint: () => void;
  onReset: () => void;
}

const Step3Form: React.FC<Step3Props> = ({ data, onPrint, onReset }) => {

    const transactionData = {
        amount: "300.00",
        recipient: "Success Chhantyal",
        date: "28 FEB, 2025 08:16 AM",
      };
      
    return (
        <div className="space-y-4 text-center">
            <PaymentSuccessPage>
            <>
            <h3 className="text-4xl font-bold"><span className="text-xl">Rs</span>{data.transferAmount}</h3>
            <p>Fund Transfered to {data.recipient}</p>
            <p> 28 Feb, 2025 01:26 PM</p>
            <PDFDownloadLink
        document={
          <PdfMaker title="Transaction Receipt">
            <TransactionBody transaction={transactionData} />
          </PdfMaker>
        }
        fileName="transaction-receipt.pdf"
      >
        {({ loading }) => (
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            {loading ? "Generating PDF..." : "Download PDF"}
          </button>
        )}
      </PDFDownloadLink>
            </>
            </PaymentSuccessPage>
            
        </div>
    );
};

export default Step3Form;
