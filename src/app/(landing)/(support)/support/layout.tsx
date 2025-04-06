
import NavSearch from "@/layout/Support/NavSearch";
import { Suspense } from "react";



export default async function LegalLayout({ children }: { children: React.ReactNode }) {
 

  return (
    <div className="min-h-screen ">
      {/* <Header logo={MetaDatas.white_logo} /> */}
      <Suspense fallback={<div>Loading...</div>}>

      <NavSearch/>
      </Suspense>
      <main className="max-w-7xl mx-auto mt-12 p-8  mb-6">{children}</main>
    </div>
  );
}



