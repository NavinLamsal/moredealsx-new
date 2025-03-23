import { Header } from "@/components/Home/Hero";
import { getMetadata } from "@/lib/action/PubilcCommon";
import Navheaders from "@/layout/legal/navheaders";



export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  const MetaDatas = await getMetadata();

  return (
    <div className="min-h-screen ">
      <Header logo={MetaDatas.white_logo} />
      <Navheaders/>
      <main className="max-w-4xl mx-auto mt-12 p-8 bg-card text-card-foreground shadow-md rounded-lg mb-6">{children}</main>

    </div>
  );
}



