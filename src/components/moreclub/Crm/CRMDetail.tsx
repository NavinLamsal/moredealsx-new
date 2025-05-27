"use client";
import React, { useEffect } from "react";
import Heading from "@/components/ui/heading";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchBusinessData } from "@/lib/action/moreClub/Business";
import { useAppSelector } from "@/lib/redux/hooks";
import CRMCreateForm from "../../form/moredealsclub/crm/crmCreateForm";
import CrmCreateSkeleton from "@/components/Skeletons/CrmCreateSkeleton";

export default function CRMDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const business = useAppSelector((state: RootState) => state.business);

  useEffect(() => {
    dispatch(fetchBusinessData({ fetchForce: false }));
  }, []);

  if (business.isLoading) return <CrmCreateSkeleton />;

  return (
    <div>
      <Heading title="Create Your CRM" />
      <p className="text-muted-foreground">
        Set up your CRM by providing essential information to personalize your
        experience and make communication seamless. Your domain, login email,
        and phone number help us create a secure and customized space for your
        team and clients.
      </p>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-4 lg:space-y-0">
        <div className="flex-1 pb-10 px-6 lg:px-0 lg:max-w-2xl xl:max-w-3xl">
          <CRMCreateForm businessData={business.businessProfile} />
        </div>
      </div>
    </div>
  );
}
