import { Header } from "@/components/Home/Hero";
import { getMetadata } from "@/lib/action/PubilcCommon";
import Navheaders from "@/layout/legal/navheaders";



export default async function SupportLayout({ children }: { children: React.ReactNode }) {
  const MetaDatas = await getMetadata();

  return (
    <div className="min-h-screen ">
      <Header logo={MetaDatas.white_logo} />
      <main className=" mt-12 p-8  mb-6">{children}</main>

    </div>
  );
}



