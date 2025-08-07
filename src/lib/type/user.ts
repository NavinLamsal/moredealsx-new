export interface ReferralCode {
    referral_code: string;
    refferal_link: string;
   
  }
  
  export interface Membership {
    membership_name: string;
    membership_type: string;
    membership_code: string;
    expiration_date: string | null;
    package_time: string | null;
    currency: string | null;
    price: number | null;
  }
  
  export interface UserSubProfile {
    id: string;
    secondary_phone_number: string;
    secondary_email: string;
    date_of_birth: string;
    address: string | null;
    city: string | null;
    street: string | null;
    zip_code: string | null;
    house_no: string | null;
  
  }
  
  export interface Country {
    id: number;
    name: string;
    code: string;
    icon: string;
    prefix_number: string;
   
  }
  
  export interface Currency {
    id: number;
    name: string;
    symbol: string;
    code: string;
    icon: string;
  }
  
  export interface UserProfile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_prefix: string | null;
    phone_number: string | null;
    status: "ACTIVE" | "INACTIVE" | string;
    user_type: "USER" | "BUSINESS" | string;
    gender: "MALE" | "FEMALE" | "OTHER" | string;
    remarks: string;
    display_picture: string | null;
    date_joined: string;
  
    reffer_code: ReferralCode;
    membership: Membership;
    is_verified_user: boolean;
    is_otp_email_verified: boolean;
    is_otp_phone_verified: boolean;
    exists_business_profile: boolean;
    is_pin_set: boolean;
  
    user_profile: UserSubProfile;
    country: Country;
    currency: Currency;
    qr_code: string;
    crm_link: {
      restro_link: string;
      salon_link: string;
      hotel_link: string;
    };
    username: string;
  

    
      
      
     
      

     
  
  }
  