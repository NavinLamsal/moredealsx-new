// utils/auth.ts
import { jwtVerify } from "jose";
import { NextRequest } from "next/server"; // Import NextRequest for type annotations

// Replace with your actual secret key used for signing the JWT
const secretKey = process.env.AUTH_SECRET; // Ensure this is set in your environment variables

// Define the type for the payload returned by the JWT
interface SessionPayload {
  accessToken?: string;
  refreshToken?: string;
  // Add other fields as necessary based on your JWT structure
}

// Function to decrypt the session cookie and retrieve the access token
export async function decryptSessionCookie(cookieValue: string): Promise<SessionPayload | null> {
  try {
    const key = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(cookieValue, key, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload; // Cast payload to SessionPayload type
  } catch (error) {
    console.error("Failed to decrypt session cookie:", error);
    return null; // Handle error appropriately
  }
}

// Function to retrieve the access token from the session cookie
export async function getAccessToken(req: NextRequest): Promise<string | null> {
  const sessionCookie = req.cookies.get("authjs.session-token.0")?.value; // Adjust the cookie name if necessary
  const sessionCookie2 = req.cookies.get("authjs.session-token.1")?.value; // Adjust the cookie name if necessary
  if (sessionCookie) {
    const sessionData = await decryptSessionCookie(sessionCookie);
    return sessionData?.accessToken || null; // Return the access token or null if not found
  }
  return null; // No session cookie found
}