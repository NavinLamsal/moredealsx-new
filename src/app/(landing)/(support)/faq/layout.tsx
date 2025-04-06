


export default async function SupportLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen ">
      {/* <Header logo={MetaDatas.white_logo} /> */}
      <main className=" mt-12 p-8  mb-6">{children}</main>

    </div>
  );
}



