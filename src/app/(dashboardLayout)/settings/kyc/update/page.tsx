"use client";
import React, { Suspense, useEffect } from "react";
import { useFetchUserDetails } from "@/lib/action/moreClub/Users";
import { useQuery } from "@tanstack/react-query";
import { KYCProps } from "@/lib/type/moreclub/User";
import KycPageContent from "@/components/moreclub/profile/KycPageContent";
import { useAppSelector } from "@/lib/redux/hooks";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchUserProfile } from "@/lib/action/moreClub/User";
import { useDispatch } from "react-redux";

export default function UpdatePage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state: RootState) => state.user);

  const {fetchKYCDetail} = useFetchUserDetails();
  
  useEffect(() => {
      dispatch(fetchUserProfile({ fetchForce: false }));
    }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["kyc Detail"],
    queryFn: async() => await fetchKYCDetail(),
    staleTime: 360000,
});


if(isLoading || user.isLoading){
  return <div>Loading...</div>

}

if(isError){
  
  return <div>Error</div>
}


const KycProps :KYCProps = {

  first_name:  user.profile?.first_name ?? "",
  last_name:  user.profile?.last_name ?? "",
  email:  user.profile?.email?? "",
  phone_number:  user.profile?.phone_number ?? "",
  phone_prefix:  user.profile?.phone_prefix ?? "",
  gender:  user.profile?.gender?? "",
  display_picture:  user.profile?.display_picture?? "",
  date_joined:  user.profile?.date_joined?? "",
  date_of_birth: data?.data?.kyc_profile?.date_of_birth?? "",
  user_type:  user.profile?.user_type?? "",
  
  secondary_email: data?.data?.kyc_profile.secondary_email?? "",
  secondary_phone_number: data?.data?.kyc_profile.secondary_phone_number?? "",
  address: data?.data?.kyc_profile?.address?? "",
  city: data?.data?.kyc_profile?.city?? "",
  street: data?.data?.kyc_profile?.street?? "",
  zip_code: data?.data?.kyc_profile?.zip_code?? "",
  house_number: data?.data?.kyc_profile.house_no ?? "",
  
  marital_status : data?.data?.marital_status ??"",
  occupation: data?.data.occupation?? "",
  spouse_name: data?.data.spouse_name?? "",
  father_name:data?.data.father_name?? "",
  mother_name: data?.data.mother_name?? "",

  document_type: data?.data.document_type?? "",
  document_id: data?.data.document_id?? "",
  date_format: data?.data.date_format?? "",
  issue_date: data?.data.issue_date?? "",
  document_front: data?.data.document_front ?? "",
  document_back: data?.data.document_back?? "",
  
  agreed_to_terms: data?.data.agreed_to_terms ?? false,
  is_verified: data?.data.is_verified ?? false,
  note: data?.data.note ?? "",
  is_not_verified: data?.data.is_not_verified ?? false

}




  return (
    <Suspense fallback={<div>Loading...</div>}>

      <KycPageContent kycProps={KycProps} />
    </Suspense>
  );
}
