"use client"
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import CRMList from './CRMList';
import { useSearchParams } from 'next/navigation';
import { BusinessQRInfo } from '@/lib/redux/slice/moreclub/BusinessSlice';

const CRMTabContent =({categories}:{categories:BusinessQRInfo[]}) => {
    const searchParams = useSearchParams();
    const tab =searchParams.get("tab");
  

    const sidebarNavItems = categories.map((category: BusinessQRInfo) => ({
        title: category.business_type_name as string,
        component: <CRMList name={category.business_type_name as string} />
      }));
      
      // ✅ State to track the active section
      const [activeTab, setActiveTab] = useState(tab ?? sidebarNavItems[0].title);
      
      return (
          <div>
      
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
                    ? "bg-primary text-primary-foreground dark:bg-primary"
                    : "bg-slate-50 bg-card  hover:bg-primary hover:underline hover:text-primary-foreground",
                  "justify-start text-center  px-4 py-2 "
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        );
      }

export default CRMTabContent

