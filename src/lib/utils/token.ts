import MoreClubApiClient from "../axios/moreclub/MoreClubApiClient";

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



    // if (session) {
      try {
        const res = await MoreClubApiClient.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}auth/generate/auth-code/`,
        );

        if (res.data && res.status === 200) {
          const data = res.data;
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
    // }
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
