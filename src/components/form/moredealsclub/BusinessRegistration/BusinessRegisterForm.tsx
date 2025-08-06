"use client";

import React, { useState, useEffect } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

import BusinessForm from "./BusinessForm";

import UpgradeFormPopup from "../pricing/UpgradeFormPopup";
import LogoutTrigger from "@/components/auth/logouts/logouttrigger";
import ExtraInfoForm from "@/components/auth/ExtraForm";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "@/lib/action/moreClub/User";
import { SkeletonBox } from "@/components/Skeletons/packageSkelton";

const BusinessSetupModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showForm, setShowForm] = useState(false);
  const [setupPin, setSetupPin] = useState(false);
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  const { data: session, status } = useSession();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const isNewUser = sessionStorage.getItem("newuser") === "true";
    // const pinset = localStorage.getItem("membership") === "false";
    const pinset = true
    const businessSetup = localStorage.getItem("business_setup") === "false";

    if (isNewUser) {
      setShowExtraInfo(true);
      setShowForm(true);
    } else if (pinset) {
      dispatch(fetchUserProfile({ fetchForce: false }));
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

  const handleExtraInfoComplete = () => {
    sessionStorage.setItem("newuser", "false");
    setShowExtraInfo(false);
    const pinset = localStorage.getItem("membership") === "false";
    const businessSetup = localStorage.getItem("business_setup") === "false";

    if (pinset) {
      setSetupPin(true);
    } else if (businessSetup) {
      setSetupPin(false);
    } else {
      setShowForm(false);
    }
  };

  const handlePinSetupComplete = () => {
    if (setupPin) {
      setSetupPin(false);
      dispatch(fetchUserProfile({ fetchForce: true }));
      localStorage.removeItem("membership");
    }

    const businessSetup = localStorage.getItem("business_setup") === "false";
    if (businessSetup) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const handleBusinessSetupComplete = () => {
    localStorage.removeItem("business_setup");
    setShowForm(false);
  };

  return (
    showForm && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
        <>
          <div className="absolute top-4 right-4 z-[60]">
            <LogoutTrigger />
          </div>

          {showExtraInfo ? (
            <ExtraInfoForm onFinish={handleExtraInfoComplete} />
          ) : !setupPin ? (
            <BusinessForm onFinish={handleBusinessSetupComplete} />
          ) : (
            <Card className="relative p-6 max-w-4xl max-h-[80vh] w-[90%] md:w-[70%] lg:w-[50%] overflow-y-auto">
              <CardTitle className="my-2 text-lg">Choose your plan</CardTitle>
              <CardDescription className="text-xs">
                Choose the plan that best suits your needs.
              </CardDescription>

              {status === "loading" && <div className="grid md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <SkeletonBox key={i} className="h-40 rounded-md" />
                ))}
              </div>}
              {status === "unauthenticated" && <div>Unauthorized</div>}
              {status === "authenticated" && (
                <>
                  {!user.lastFetchedProfileAt && user.isLoading && <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <SkeletonBox key={i} className="h-40 rounded-md" />
                    ))}
                  </div>}

                  {user.lastFetchedProfileAt && !user.isLoading && user.profile && <UpgradeFormPopup
                    userType={user.profile.user_type as 'BUSINESS' | 'NORMAL'}
                    onFinish={handlePinSetupComplete}
                  />}
                </>

              )}
            </Card>
          )}
        </>
      </div>
    )
  );
};

export default BusinessSetupModal;
