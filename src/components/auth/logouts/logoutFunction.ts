// lib/logout.ts

import { deleteCookie } from "cookies-next";

// Clears localStorage and sessionStorage keys
export const clearStorage = () => {
  const localKeys = [
    "token",
    "business_setup",
    "membership",
    "forget_username",
    "forget_code",
    "otp_username",
  ];
  localKeys.forEach((key) => localStorage.removeItem(key));

  const sessionKeys = [
    "bpms",
    "registrationData",
    "BusinessRegistrationData",
    "pin_via",
    "orderStep",
    "deliverytype",
    "receiverName",
    "mobileNumber",
    "receiverEmail",
    "note",
    "arrivalTime",
    "no_of_people",
    "location",
    "lat",
    "lon",
  ];
  sessionKeys.forEach((key) => sessionStorage.removeItem(key));

  // Delete relevant cookies as well
  deleteCookie("xaccess_token");
  deleteCookie("xrefresh_token");
  
};
