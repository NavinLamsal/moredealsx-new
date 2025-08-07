import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Montserrat } from "next/font/google";
import CookieConsentBanner from "@/layout/legal/CookiesConsent";
import Provider from "@/providers/Provider";


const montserrat = Montserrat({ subsets: ["latin"],  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-montserrat"});

export const metadata: Metadata = {
  title: "MOREDEALSX | MOREDEALS CLUB",
  description: "Luxury redefined. Exclusive club. Personalized service, bespoke experiences, unmatched amenities. Elevate your lifestyle. Join today",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
      <meta name="apple-mobile-web-app-title" content="Moredeals Club" />
      </head>
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <Provider>
          <Suspense>
          {/* <Locationretrive/> */}
          </Suspense>
            {children}
            <Suspense>
            <CookieConsentBanner/>
            </Suspense>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
          </Provider>
      </body>
    </html>
  );
}
