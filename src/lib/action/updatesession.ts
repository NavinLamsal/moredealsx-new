// // refreshUserSession.ts
// import { fetchUserDetails } from "@/auth";
// import { getSession } from "next-auth/react";

// // Your existing fetchUserDetails function
// // export async function fetchUserDetails(token: string) {
// //   console.log("token", token);
// //   try {
// //     // Fetch user details
// //     const userResponse = await fetch(
// //       `${process.env.NEXT_PUBLIC_BASE_URL}users/details/me/`,
// //       {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     if (!userResponse.ok) throw new Error("Failed to fetch user details");
// //     const userData = await userResponse.json();
// //     const userDetails = userData?.data;
// //     console.log("userDetails", userDetails);
// //     let businessDetails = null;

// //     // If the user is a business, fetch business details
// //     if (
// //       userDetails.exists_business_profile === true &&
// //       userDetails?.user_type === "BUSINESS"
// //     ) {
// //       try {
// //         const businessResponse = await fetch(
// //           `${process.env.NEXT_PUBLIC_BASE_URL}business/details/`,
// //           {
// //             method: "GET",
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         if (!businessResponse.ok)
// //           throw new Error("Failed to fetch business details");
// //         const businessData = await businessResponse.json();
// //         businessDetails = businessData.data;
// //       } catch (error) {
// //         console.error("❌ Error fetching business details:", error);
// //       }
// //     }

// //     // Optionally, you could fetch permissions here

// //     // Return the combined data
// //     return {
// //       userDetails,
// //       businessDetails,
// //       // permissions can be added here if needed
// //     };
// //   } catch (error) {
// //     console.error("❌ Error fetching user data:", error);
// //     throw new Error("Failed to fetch user data");
// //   }
// // }

// /**
//  * Call this function (passing in NextAuth's update function) after updating user-related data
//  * to refresh the session.
//  */
// export async function refreshUserSession(
//   update: (data: any) => Promise<void>
// ) {
//   const session = await getSession();
//   if (!session?.accessToken) {
//     throw new Error("No access token available in session.");
//   }

//   const updatedData = await fetchUserDetails(session.accessToken);

//   await update({
//     user: updatedData
//   });
// }




"use client";


const updatedsession ={ "user": {
  "id": "6fa99462-2d28-46fe-8316-850b3c8c3f8a",
  "email": "navinlamsal11@gmail.com",
  "first_name": "Sujit",
  "last_name": "Khanal",
  "username": "MSTJ6O26",
  "phone_number": "+9779820604963",
  "user_type": "BUSINESS",
  "referral_code": "R4IXM",
  "qr_code": "https://res.cloudinary.com/dcsd8ukzn/image/upload/v1/media/user_profile/qr_code/qr_code_6fa99462-2d28-46fe-8316-850b3c8c3f8a_f24s44",
  "user_refer_qr": "https://res.cloudinary.com/dcsd8ukzn/image/upload/v1/media/referral/qr_code/qr_code_R4IXM_mrnx62",
  "link": "https://moredealsclub.com/register-membership?referral=R4IXM",
  "user_profile": {
    "phone_prefix": "+977",
    "date_of_birth": "2000-11-10",
    "secondary_phone_number": "+9779820604963",
    "secondary_email": "navinlamsal378@gmail.com",
    "country_code": "NP",
    "country": "Nepal",
    "address": "Gandaki Province",
    "city": "Pokhara",
    "street": "Gandaki Province",
    "zip_code": "37000",
    "house_no": "249",
    "gender": "MALE",
    "display_picture": "https://res.cloudinary.com/dcsd8ukzn/image/upload/v1/media/user_profile/avatars/francesco-ungaro-1fzbUyzsHV8-unsplash_vyxxjo",
    "expertise": null,
    "interest": null
  },
  "is_verified_user": false,
  "date_joined": "2024-08-28T10:19:44",
  "referred_by": "Sujit Khanal"
},
}

export const handleUpdateSession = async () => {

    const updatedData = {
      user: updatedsession,
      lastUpdated: new Date().toISOString(),
    };

    const res = await fetch("/api/update-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();
    // window.location.reload();
  };

 
