"use client";

import React, { useState, useEffect } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import TransactionPinForm from "../wallet/transactionPinSetup";
import BusinessForm from "./BusinessForm";

import { useSession } from "next-auth/react";
import UpgradeFormPopup from "../pricing/UpgradeFormPopup";

const BusinessSetupModal = () => {
  const [showForm, setShowForm] = useState(false);
  const [setupPin, setSetupPin] = useState(false);
  const { data: session, status} = useSession();

  // useEffect(() => {
  //   const pinset = localStorage.getItem("membership") === "false";
  //   const businessSetup = localStorage.getItem("business_setup") === "false";

  //   if (pinset) {
  //     setSetupPin(true);
  //   }

  //   if (businessSetup) {
  //     setShowForm(true);
  //   }
  // }, []);


  useEffect(() => {
    const pinset = localStorage.getItem("membership") === "false";
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
    if (setupPin) {
      setSetupPin(false);
    }

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
            <Card className="relative p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
              <CardTitle className="my-2 text-lg">Choose your plan</CardTitle>
              <CardDescription className="text-xs">
                Choose the plan that best suits your needs.
              </CardDescription>
              {/* <TransactionPinForm onCancel={() => console.log("Cancel")} onFinish={handlePinSetupComplete} /> */}
              {status === "loading" && <div>Loading...</div>}
              {status === "unauthenticated" && <div>Unauthorized</div>}
              {status === "authenticated" &&  <UpgradeFormPopup 
              userType={session?.user.userDetails?.user_type} onFinish={handlePinSetupComplete}
              // userType={"BUSINESS"}
              />}
             
            </Card>
          )}         </>
      </div>
    )
  );
};

export default BusinessSetupModal;
