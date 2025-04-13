"use client";

import GeneralInformation from "@/components/form/moredealsclub/kyc/GeneralInfoForm";
import KycDetail from "@/components/moreclub/profile/kycDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { useFetchUserDetails } from "@/lib/action/moreClub/Users";
import { KYCProps } from "@/lib/type/moreclub/User";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const KycPage = () => {
  const { data: session } = useSession();

  const { fetchKYCDetail } = useFetchUserDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["kyc Detail"],
    queryFn: async () => await fetchKYCDetail(),
    staleTime: 360000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const KycProps: KYCProps = {
    first_name: session?.user.userDetails?.first_name ?? "",
    last_name: session?.user.userDetails?.last_name ?? "",
    email: session?.user.userDetails?.email ?? "",
    phone_number: session?.user.userDetails?.phone_number ?? "",
    phone_prefix: session?.user.userDetails?.phone_prefix ?? "",
    gender: session?.user.userDetails?.gender ?? "",
    display_picture: session?.user.userDetails?.display_picture ?? "",
    date_joined: session?.user.userDetails?.date_joined ?? "",
    date_of_birth: data?.data?.kyc_profile?.date_of_birth ?? "",
    user_type: session?.user.userDetails?.user_type ?? "",

    secondary_email: data?.data?.kyc_profile?.secondary_email ?? "",
    secondary_phone_number:
      data?.data?.kyc_profile?.secondary_phone_number ?? "",
    address: data?.data?.kyc_profile?.address ?? "",
    city: data?.data?.kyc_profile?.city ?? "",
    street: data?.data?.kyc_profile?.street ?? "",
    zip_code: data?.data?.kyc_profile?.zip_code ?? "",
    house_number: data?.data?.kyc_profile?.house_no ?? "",

    marital_status: data?.data?.marital_status ?? "",
    occupation: data?.data.occupation ?? "",
    spouse_name: data?.data.spouse_name ?? "",
    father_name: data?.data.father_name ?? "",
    mother_name: data?.data.mother_name ?? "",

    document_type: data?.data?.document_type ?? "",
    document_id: data?.data?.document_id ?? "",
    date_format: data?.data?.date_format ?? "",
    issue_date: data?.data?.issue_date ?? "",
    document_front: data?.data?.document_front ?? "",
    document_back: data?.data.document_back ?? "",

    agreed_to_terms: data?.data.agreed_to_terms ?? false,
    is_verified: data?.data.is_verified ?? false,
    is_not_verified: data?.data.is_not_verified ?? false,
    note: data?.data.note ?? "",
  };

  return (
    <div>
      <div className="space-y-0.5 mb-4">
        <Heading title="KYC Details" />
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      {data && JSON.stringify(data?.data) === "{}" ? (
        <Card className="max-w-xl lg:max-w-3xl xl:max-w-4xl">
          <CardHeader>
            <CardTitle className="hidden">General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-10">
            <GeneralInformation />
          </CardContent>
        </Card>
      ) : (
        <KycDetail kycDetail={KycProps} />
      )}
    </div>
  );
};

export default KycPage;
