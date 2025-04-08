"use client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import menuData from "@/data.json";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname, useRouter } from "next/navigation";

interface SettingItem {
  url: string;
  title: string;
  description: string;
  icon?: string; // Optional: If you want to display an icon
}



const SettingsLayout: React.FC = () => {

   const pathname = usePathname();
  const isMobile = useIsMobile(); // Check if it's a mobile device
  const router = useRouter();

  // useEffect(() => {
  //   if (isMobile) {
  //     if (pathname === "/settings") {
  //     router.back(); // Redirect to the previous page
  //     }
  //   }
  // }, [isMobile, router]);

  // if (!isMobile) return null; // Hide content before redirection

  return (
       <div className="p-4">


       <Card className="max-w-6xl p-4 space-y-8 ">
      {menuData.menuData.map((section, index) => {
        const isSingleItem = section.items.length === 1;

        return (
          <div key={index}>
            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
           
            {isSingleItem ? (
              /* Single item -> full width */
              <div className="b p-4 rounded">

                <div className="text-lg font-semibold">
                  {section.items[0].title}
                </div>
                <p className="text-gray-400 mt-2">
                  {section.items[0].description}
                </p>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${section.horizontal ? "md:grid-cols-3" : ""} gap-4`}>
                {section.items.map((item, idx) => (
                  <React.Fragment key={idx}>
                  {section.horizontal ? verticalCard({item}): horizontalCard({item})}
                  </React.Fragment>
                ))}
              </div>
            )}


          </div>
        );
      })}
      </Card>
       </div>
  );
};

export default SettingsLayout;



const horizontalCard = ({ item }: { item: SettingItem }) => {
  return (
    <Link href={item.url} className="bg-background p-4 rounded shadow-md cursor-pointer">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={item.icon} className="h-12 w-12" />
          </Avatar>
          <div>
            <div className="text-lg font-semibold">{item.title}</div>
            <p className="text-muted-foreground mt-2">{item.description}</p>
          </div>

        </div>
        <ArrowRightIcon className="h-6 w-12 text-muted-foreground" />
      </div>
    </Link>)
}

const verticalCard = ({ item }: { item: SettingItem }) => {
  return (
    <Link href={item.url} className="bg-background p-4 rounded shadow-md cursor-pointer">
      <div className="flex flex-col items-center p-4">
        
          <Avatar>
            <AvatarImage src={item.icon} className="h-12 w-12" />
          </Avatar>
          <div>
            <div className="text-lg font-semibold text-center">{item.title}</div>
            <p className="text-muted-foreground mt-2 text-center">{item.description}</p>
          </div>

        </div>
    </Link>
    )
}
