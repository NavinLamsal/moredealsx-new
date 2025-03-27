"use client";

import React, { useState, useEffect } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import TransactionPinForm from "../wallet/transactionPinSetup";
import BusinessForm from "./BusinessForm";

const BusinessSetupModal = () => {
  const [showForm, setShowForm] = useState(false);
  const [setupPin, setSetupPin] = useState(false);

  useEffect(() => {
    const pinset = localStorage.getItem("pinset") === "false";
    const businessSetup = localStorage.getItem("business_setup") === "false";

    if (pinset) {
      setSetupPin(true);
      setShowForm(true);
    } else if (businessSetup) {
      setSetupPin(false);
      setShowForm(true);
    }
  }, []);

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showForm]);

  const handlePinSetupComplete = () => {
    localStorage.setItem("pinset", "true");
    setSetupPin(false);

    if (localStorage.getItem("business_setup") === "false") {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const handleBusinessSetupComplete = () => {
    localStorage.setItem("business_setup", "true");
    setShowForm(false);
  };

  return (
    showForm && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
        <
        >
          {!setupPin ? (
            <BusinessForm onFinish={handleBusinessSetupComplete}/>
          ) : (
            <Card className="relative p-6 max-w-xs">
              <CardTitle className="my-2 text-lg">Transaction PIN</CardTitle>
              <CardDescription className="text-xs">
                This transaction PIN is required for secure transactions. Please
                keep it safe and confidential. Do not share your PIN with anyone.
              </CardDescription>
              <TransactionPinForm onCancel={() => console.log("Cancel")} onFinish={handlePinSetupComplete} />

            </Card>
          )}
        </>
      </div>
    )
  );
};

export default BusinessSetupModal;
