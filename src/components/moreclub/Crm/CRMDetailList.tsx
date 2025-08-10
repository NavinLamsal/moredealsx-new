"use client";
import { fetchBusinessQRInfo } from "@/lib/action/moreClub/Business";
import { useAppSelector } from "@/lib/redux/hooks";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import CRMTabContent from "./CRMTabContent";
import BusinessTypes from "@/components/form/moredealsclub/business/BusinessTypes";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import CrmSkeleton from "@/components/Skeletons/CrmSkeleton";
import PageHeadings from "@/components/ui/customTitles/PageHeadings";



const CRMDetailList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const business = useAppSelector((state: RootState) => state.business);

  useEffect(() => {
    dispatch(fetchBusinessQRInfo({ fetchForce: false }));
  }, [dispatch]);

  if (business.isLoading || !business.lastFetchedQRInfoAt) {
    return <CrmSkeleton />;
  }


  return (
    <div className="px-4">
      <PageHeadings
        title="Manage your CRM"
        description="This is how others will see you on the site."
      />
      {business.businessQRInfo && business.businessQRInfo.length > 0 && (        
          <CRMTabContent categories={business.businessQRInfo} />
      )}
      
      {business.lastFetchedQRInfoAt &&
        business.businessQRInfo &&
        business.businessQRInfo.length === 0 && (
          <Card className="lg:max-w-2xl xl:max-w-4xl">
            <div className="mt-4 bg-yellow-50 p-4 rounded-md text-sm">
              <ol className="list-decimal list-outside pl-4 text-gray-600">
                <p>It seems you have not added any business discounts</p>
                <p>
                  Inorder to add CRM, please add some business discounts to your
                  profile
                </p>
              </ol>
            </div>

            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <BusinessTypes />
              </Suspense>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default CRMDetailList;
