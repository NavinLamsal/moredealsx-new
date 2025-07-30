import NextAuth, { User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

import { AdapterUser } from "@auth/core/adapters";

async function refreshAccessToken(token: any) {
  console.log("refreshtoken check", !token.user.refreshToken);

  if (!token.user.refreshToken) {
    return {
      ...token,
      error: "NoRefreshTokenError",
    };
  }

  if (token.user.refreshToken) {
    const decodedToken = jwtDecode(token.user.refreshToken.toString());
    const refreshTokenExpires = decodedToken?.exp
      ? decodedToken.exp * 1000
      : undefined;

    console.log("refreshTokenExpires check", Date.now() >= (refreshTokenExpires as number));
    if (Date.now() >= (refreshTokenExpires as number)) {
      return {
        ...token,
        error: "RefreshTokenExpired",
      };
    }
  }


  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}auth/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.user.refreshToken}`,
        },
        body: JSON.stringify({
          refresh: token.user.refreshToken,
        }),
      }
    );
    const tokens = await response.json();

    if (!response.ok) {
      throw new Error(
        `Token refresh failed: ${response.status} ${response.statusText}`
      );
    }

    const decodedAccessToken = jwtDecode(tokens.access);
    const newAccessTokenExpires = decodedAccessToken.exp
      ? decodedAccessToken.exp * 1000 // Convert to milliseconds
      : Date.now() + 30 * 60 * 1000; // Fallback to 30 minutes from now

    return {
      ...token,
      user: {
        ...token.user,
        accessToken: tokens.access,
        refreshToken: tokens.refresh ?? token.user.refreshToken, // Fall back to old refresh token
        accessTokenExpires: newAccessTokenExpires,
      },
      accessToken: tokens.access,
      refreshToken: tokens.refresh ?? token.user.refreshToken, // Fall back to old refresh token
      accessTokenExpires: newAccessTokenExpires,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 1 month
  },
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/logout",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        phone_number: {},
        phone_prefix: {},
        password: {},
        via: {},
        token: {},
        refresh: {},
        success: {},
        redirectToken: {},
        updateDetail: {},
      },
      async authorize(credentials) {
        try {
          // ✅ If user already has a token, fetch details
          if (credentials.token) {
            const user = await fetchUserDetails(credentials.token as string);
            return {
              accessToken: credentials.token,
              refreshToken: credentials.refresh,
              user,
              email: "",
            };
          }

          // ✅ Sanitize credentials (remove null and "null" values)
          const sanitizedCredentials: Record<string, any> = Object.fromEntries(
            Object.entries(credentials).filter(
              ([_, value]) =>
                value !== "null" && value !== null && value !== undefined
            )
          );

          // ✅ Perform login request
          const loginResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}auth/login/`,

            {
              method: "POST",
              body: JSON.stringify({
                email: sanitizedCredentials.email,
                password: sanitizedCredentials.password,
                phone_number: sanitizedCredentials.phone_number,
                phone_prefix: sanitizedCredentials.phone_prefix,
                via: sanitizedCredentials.via,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const loginData = await loginResponse.json();

          // ✅ Check if login was unsuccessful
          if (loginData.success === "False" || loginData.success === false) {
            throw new Error(
              loginData?.errors?.non_field_errors?.[0] ||
                "Invalid login credentials"
            );
          }

          // ✅ Fetch user details after login
          const user = await fetchUserDetails(loginData.data.access_token);

          // ✅ Return login details
          return {
            accessToken: loginData.data.access_token,
            refreshToken: loginData.data.refresh_token,
            user,
            email: "",
          };
        } catch (error: any) {
          console.log("error", error);
          // console.error("❌ Authorization Error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }: { url: string; baseUrl: string }) => {
      return url;
    },

    jwt: async ({
      token,
      account,
      user,
      trigger,
      session,
    }: {
      token: any;
      account: any;
      user: any;
      trigger?: any;
      session?: any;
    }) => {
      
      if (account && user) {
        const decodedToken = jwtDecode(user?.accessToken.toString());
        const expiresAt = decodedToken?.exp as number * 1000;
        return {
          ...token,
          accessToken: token?.accessToken,
          refreshToken: token?.refreshToken,
          accessTokenExpires: expiresAt ? expiresAt : undefined,
          user: user,
        };
      }


      // if (token.user.accessToken) {
      //   const decodedToken = jwtDecode(token.user.accessToken.toString());
      //   console.log("decodedToken", decodedToken.exp);
      //   // const expiresAt = Date.now() / 1000 - 30;
      //   // console.log("expiresAt",expiresAt)

      //   const expiresAt = decodedToken?.exp;
      //   if (expiresAt) {
      //     // const thirtySecondsLater = expiresAt * 1000 ;
      //     // token.accessTokenExpires = thirtySecondsLater;
      //     console.log("expiresAt", expiresAt);
      //     const fiveMinutesBeforeExpiration = expiresAt * 1000 - 5 * 60 * 1000;
      //     token.accessTokenExpires = fiveMinutesBeforeExpiration;
      //   } else {
      //     token.accessTokenExpires = undefined;
      //   }
      //   console.log("token.accessTokenExpires", token.accessTokenExpires);
      // }

      if (trigger === "update" && session) {
        // console.log("updated" , trigger , session)
        // console.log({
        //   ...token,
        //   user: {
        //     ...token.user,
        //     user: {
        //       userDetails:{ ...session.userDetails}
        //     },
        //   },
        // })

        return {
          ...token,
          user: {
            ...token.user,
            user: {
              userDetails: { ...session.userDetails },
            },
          },
        };
      }

      if (Date.now() > (token.accessTokenExpires as number)) {
        const refresh = await refreshAccessToken(token);
        return refresh;
      } else {
        return token;
      }
    },

    session: async ({ session, trigger, token, newSession }) => {
      if (token) {
        const tokenAsToken = token as any;
        session.accessToken = tokenAsToken.user.accessToken as string;
        session.refreshToken = tokenAsToken.user.refreshToken as string;
        session.user = tokenAsToken.user.user as User as AdapterUser & User;
        session.accessTokenExpires = tokenAsToken.user.accessTokenExpires as number;
        session.error = tokenAsToken.error as string;
      }
      return session;
    },
  },
});

export async function fetchUserDetails(token: string) {
  try {
    // Fetch user details
    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}users/details/me/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!userResponse.ok) throw new Error("Failed to fetch user details");
    const userData = await userResponse.json();

    const userDetails = {
      username: userData?.data?.username,
      id: userData?.data.id,
      email: userData?.data?.email ?? null,
      first_name: userData?.data?.first_name, // Dynamic or default fallback
      last_name: userData?.data?.last_name, // Dynamic or default fallback
      phone_prefix: userData?.data?.phone_prefix ?? null,
      phone_number: userData?.data?.phone_number ?? null,
      status: userData?.data?.status, // Dynamic or default fallback
      user_type: userData?.data?.user_type, // Dynamic or default fallback
      display_picture: userData?.data?.display_picture ?? null,
      is_verified_user: userData?.data?.is_verified_user, // Dynamic or default fallback
      is_otp_email_verified: userData?.data?.is_otp_email_verified, // Dynamic or default fallback
      is_otp_phone_verified: userData?.data?.is_otp_phone_verified, // Dynamic or default fallback
      exists_business_profile: userData?.data?.exists_business_profile, // Dynamic or default fallback
      country: userData?.data?.country, // Dynamic or default fallback
      currency: userData?.data?.currency,
      crm_link: userData?.data?.crm_link,
      membership: userData?.data?.membership === null ? false : true,
    };

    // Return all combined data
    return {
      userDetails,
      // businessDetails,
      // permissions,
    };
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}
