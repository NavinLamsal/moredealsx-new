import { getSession } from "next-auth/react";

export async function redirectToUrl({
  domain,
  slug,
  path = "",
  target = "_blank",
}: {
  domain: string;
  slug: string;
  path?: string;
  target?: "_blank" | "_self";
}) {
  const baseUrl = `https://${domain}.merkoll.com/${slug}`;
  const fullUrl = new URL(baseUrl);

  try {
    const session = await getSession();

    console.warn("Session data:", session);

    if (session) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}auth/generate/auth-code/`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          const token = data.data.auth_code;
        
          if (token) {
            fullUrl.searchParams.set("auth_token", token);
          }
        } else {
          console.warn("Failed to get token: non-ok response");
        }
      } catch (tokenError) {
        console.warn("Error fetching token:", tokenError);
      }
    }
  } catch (sessionError) {
    console.warn("Error getting session:", sessionError);
  }

  // Always add redirect param if path is provided, no matter what
  if (path) {
    const redirectPath = path.startsWith("/") ? path : "/" + path;
    fullUrl.searchParams.set("redirect", redirectPath);
  }

  window.open(fullUrl.toString(), target);
}
