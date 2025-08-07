"use client";

import api from "@/utils/api";

// import { auth, signIn, signOut } from "@/auth";

import { removePrefix } from "../utils";




export async function doLogout() {
 
  // await signOut({ redirectTo: "/" })
}

export async function doCredentialLogin(formData: FormData) {
  try {
    console.log("login action ")
    const email = formData.get("email") ?? null;
    const phone_number = formData.get("phone_number") 
      ? removePrefix(formData.get("phone_number")?.toString() ?? "", formData.get("phone_prefix")?.toString() ?? "")
      : null;
    const phone_prefix = formData.get("phone_prefix") ?? null;
    const password = formData.get("password") ?? null;
    const via = formData.get("via") ?? null;

    
  
    // const response = await signIn("credentials", {
    //   email: email,
    //   phone_number: phone_number,
    //   phone_prefix,
    //   password: password,
    //   via,
    //   redirect: false,
    // });

    const response = await api.post(`auth/login/`, {
      email: email,
      phone_number: phone_number,
      phone_prefix,
      password: password,
      via
    })
    console.log("response of the ", response)


    if (!response) {
      throw new Error("Invalid credentials");
    }

    return { success: true, response: response };
  } catch (error: any) {
   
    const errorMessage = error?.cause?.err?.message;
    return { success: false, error: errorMessage }
  }
}



export async function fetchUserDetails() {
  try {
    // Fetch user details
    const userResponse = await api.get(
      `users/details/me/`,
    );
    return userResponse.data.data;
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}



// export async function doOTPVerifyLogin(formData: FormData) {
//   try {
//     const response = await signIn("credentials", {
//       token: formData.get("token"),
//       refresh: formData.get("refresh"),
//       redirect: false,
//     });

//     if (!response) {
//       throw new Error("Invalid OTP");
//     }
    
//     return { success: true, response: response };
//   } catch (error: any) {
   
//     const errorMessage = error?.cause?.err?.message;
//     return { success: false, error: errorMessage }
//   }
// }


// export async function doTokenLogin(token: string , success?:boolean) {

//   try {
//    const response = await signIn("credentials", {
//      redirect: false,
//      email: "",
//      password: "",
//      token: token, // Pass the token for login
//      success:success?? true
//    });

//     if (!response) {
    
//       throw new Error("Invalid credentials");
//     }
    

//     return { success: true, response: response };
//   } catch (error: any) {
    
//     const errorMessage = error.cause?.err?.message;
//     return { success: false, error: errorMessage };
//   }
// }

// export async function doredirectionLogin(token: string) {
//   try {
//     const response = await signIn("credentials", {
//       redirect: false,
//       email: "",
//       password: "",
//       redirectToken: token,
//     });

   
//     if (!response) {

//       throw new Error("Invalid credentials");
//     }

//     return { success: true, response: response };
//   } catch (error: any) {
//     const errorMessage = error.cause?.err?.message;
//     return { success: false, error: errorMessage };
//   }
// }




