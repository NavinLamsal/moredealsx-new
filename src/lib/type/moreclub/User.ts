

export interface KYCDetails{
  marital_status : string,
  occupation: string,
  spouse_name: string | null,
  father_name: string | null
  mother_name: string | null
  document_type: string,
  document_id: string,
  date_format: string,
  issue_date: string,
  document_front: string,
  document_back: string | null,
  agreed_to_terms: boolean,
  is_verified: boolean
  note:string;
  is_not_verified: boolean;
 
  kyc_profile: {
      id: string
      secondary_phone_number: string | null
      secondary_email: string | null
      address: string
      city: string
      street: string
      zip_code: string
      house_no: string | null
      date_of_birth: string 
  },

}


{
  
}

export interface KYCProps{

  first_name: string // session?.user.userDetails?.first_name,
  last_name: string // session?.user.userDetails?.last_name,
  email: string // session?.user.userDetails?.email,
  phone_number: string // session?.user.userDetails?.phone_number,
  phone_prefix: string // session?.user.userDetails?.phone_prefix,
  display_picture: string
  user_type: string
  date_joined: string
  secondary_email: string | null
  secondary_phone_number: string | null
  father_name: string | null
  mother_name: string | null
  gender: string // session?.user.userDetails?.gender,
  date_of_birth: string // session?.user.userDetails?.date_of_birth,
  address: string // session?.user.userDetails?.user_profile?.address,
  city: string // session?.user.userDetails?.user_profile?.city,
 
  street: string // session?.user.userDetails?.user_profile?.street,
  house_number: string // session?.user.userDetails?.user_profile?.house_number,
  zip_code: string // session?.user.userDetails?.user_profile?.zip_code,
  marital_status : string // data?.data?.marital_status ??"",
  occupation: string // data?.data.occupation,
  spouse_name: string | null // data?.data.spouse_name,
  document_type: string // data?.data.document_type,
  document_id: string // data?.data.document_id,
  date_format: string // data?.data.date_format,
  issue_date: string // data?.data.issue_date,
  document_front: string // data?.data.document_front,
  document_back: string | null,
  agreed_to_terms: boolean // data?.data.agreed_to_terms,
  is_verified: boolean // data?.data.is_verified
  is_not_verified: boolean
  note: string

}