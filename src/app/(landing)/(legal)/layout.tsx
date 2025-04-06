import Navheaders from "@/layout/legal/navheaders";




export default async function LegalLayout({ children }: { children: React.ReactNode }) {
 

  return (
    <div className="min-h-screen ">
      <Navheaders/>
      <main className="max-w-4xl mx-auto mt-12 p-8 bg-card text-card-foreground shadow-md rounded-lg mb-6">{children}</main>

    </div>
  );
}



