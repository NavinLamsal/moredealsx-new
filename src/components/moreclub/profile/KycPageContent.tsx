import Addressupdate from '@/components/form/moredealsclub/kyc/AddressUpdate';
import DocumentForm from '@/components/form/moredealsclub/kyc/DocumnetUpdate';
import Generalupdate from '@/components/form/moredealsclub/kyc/GeneralUpdate';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Heading from '@/components/ui/heading';
import { KYCProps } from '@/lib/type/moreclub/User';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const KycPageContent = ({kycProps}:{kycProps:KYCProps}) => {
      const searchParams = useSearchParams();
    const tab =searchParams.get("tab");

    const sidebarNavItems = [
        { title: "General", component: <Generalupdate userdata={kycProps} /> },
        { title: "Address", component: <Addressupdate userdata={kycProps} /> },
        { title: "Documents", component: <DocumentForm userdata={kycProps} /> },
      ];
      
      // ✅ State to track the active section
      const [activeTab, setActiveTab] = useState(tab ?? sidebarNavItems[0].title);
      
      
      
       
      
        return (
          <div>
            <div className="space-y-0.5 mb-4">
              <Heading title="KYC Details" />
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
      
            <div className="flex flex-col space-y-8 ">
              {/* Sidebar Navigation */}
              <aside className="pb-4 border-b-2 border-primary lg:max-w-2xl xl:max-w-4xl">
                <SidebarNav items={sidebarNavItems} activeTab={activeTab} setActiveTab={setActiveTab} />
              </aside>
      
              {/* Dynamic Content Based on Active Tab */}
              <Card className="flex-1 py-10 px-6 lg:max-w-2xl xl:max-w-4xl">
                {sidebarNavItems.find((item) => item.title === activeTab)?.component}
              </Card>
            </div>
          </div>
        );
      }
      
      // Sidebar Navigation Component
      interface SidebarNavProps {
        items: { title: string; component: React.ReactNode }[];
        activeTab: string;
        setActiveTab: (tab: string) => void;
      }
      
      export function SidebarNav({ items, activeTab, setActiveTab }: SidebarNavProps) {
        
        return (
          <nav className="flex space-x-2 ">
            {items.map((item) => (
              <button
                key={item.title}
                onClick={() => setActiveTab(item.title)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  activeTab === item.title
                    ? "bg-primary text-primary-foreground dark:bg-purple-800"
                    : "bg-slate-50 bg-card  hover:bg-primary hover:underline hover:text-primary-foreground",
                  "justify-start w-full text-center  px-4 py-2 "
                )}
              >
                {item.title} Information
              </button>
            ))}
          </nav>
        );
      }

export default KycPageContent

