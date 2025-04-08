// import { auth } from "@/auth"; // Ensure you import NextAuth config
// import { NextResponse } from "next/server";
// import { encode } from "next-auth/jwt";
// import { cookies } from "next/headers";


// export async function POST(req: Request) {
//   try {
//     const session = await auth(); // Get the current session
//     if (!session) {
//       return NextResponse.json({ error: "No session found" }, { status: 401 });
//     }

//     // Get payload from request body
//     const body = await req.json();


//     // Merge new session data
//     const updatedSession = {
//       ...session,
//       user: { ...session.user, userDetails:{ ...session.user.userDetails , first_name: "updated name"} }, // Updating user details
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Extend expiry
//     };

//     // console.log("updatedbody", updatedSession.user.userDetails);

    
//     const secret = process.env.AUTH_SECRET!; 
//     const salt = process.env.NEXT_PRODUCTION ? "__secure-authjs.session-token" : "authjs.session-token"; 

//     const encodedSession = await encode({ 
//       token: updatedSession, 
//       secret, 
//       salt 
//     });

//     console.log("encodedSession", encodedSession);
   
  
//     // Store updated session in the cookie
//     const cookieStore = await cookies(); // Access cookies in the API route
//     cookieStore.set({
//       name: process.env.NEXT_PRODUCTION ? "__secure-authjs.session-token" : "authjs.session-token",
//       value: encodedSession, // Store the encoded session token
//       httpOnly: true,
//       path: "/",
//       expires: new Date(Date.now() + 30 * 60 * 1000), // Set expiration time for cookie
//     });
    

//     return NextResponse.json({ message: "Session updated", session: updatedSession });
//   } catch (error) {
//     console.error("Session update failed:", error);
//     return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    // Merge new session data
    const updatedSession = {
      ...session,
      user: { ...session.user, userDetails: { ...session.user.userDetails, first_name: "updated name" } }, // Update user details
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Extend session expiration
    };


    // Encode the updated session
    const secret = process.env.AUTH_SECRET!;
    const salt = process.env.NEXT_PRODUCTION ? "__secure-authjs.session-token" : "authjs.session-token"; 

    const encodedSession = await encode({
      token: updatedSession,
      secret,
      salt,
    });

    // Store updated session in the cookie
    const cookieStore = await cookies(); // Access cookies in the API route
    cookieStore.set({
      name: process.env.NEXT_PRODUCTION ? "__secure-authjs.session-token" : "authjs.session-token",
      value: encodedSession, // Store the encoded session token
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 30 * 60 * 1000), // Set expiration time for cookie
    });

    return NextResponse.json({ message: "Session updated", session: updatedSession });
  } catch (error) {
    console.error("Session update failed:", error);
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
  }
}
