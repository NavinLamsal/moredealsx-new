import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";
import { SessionProvider } from "next-auth/react";
import Provider from "@/components/HOC/provider";
import Locationretrive from "@/components/HOC/locationRetrive";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOREDEALSX | MOREDEALS CLUB",
  description: "Luxury redefined. Exclusive club. Personalized service, bespoke experiences, unmatched amenities. Elevate your lifestyle. Join today",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const MetaDatas : CompanyMeta = await getMetadata();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
        <Provider>
          <Suspense>
          <Locationretrive/>
          </Suspense>
            {children}
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
        </SessionProvider>
      </body>
    </html>
  );
}
