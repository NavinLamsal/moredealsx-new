import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SettingItem {
  url: string;
  title: string;
  description: string;
  icon?: string; // Optional: If you want to display an icon
}

interface SettingsSection {
  title: string;
  horizontal: boolean;
  items: SettingItem[];
}

const sampleData: SettingsSection[] = [
  {
    title: "Most visited settings",
    horizontal: true,
    items: [
      {
        url: "/dashboard/profile",
        icon: "/images/svg/leads.svg",
        title: "Profile",
        description: "Manage your profile and update your profile information.",
      },
      {
        url: "/dashboard/user-log",
        icon: "/images/svg/leads.svg",
        title: "Activity log",
        description: "Manage and manage your activity on Facebook.",
      },
      {
        url: "/settings/kyc",
        icon: "/images/svg/leads.svg",
        title: "KYC",
        description: "Update your KYC information to help us verify your identity.",
      },
    ],
  },
  {
    title: "Business Settings",
    horizontal: true,
    items: [
      {
        url: "/business/profile",
        icon: "/images/svg/leads.svg",
        title: "Business Profile",
        description: "Manage your Business profile and update your profile information.",
      },
      {
        url: "/business/business-log",
        icon: "/images/svg/leads.svg",
        title: "Activity log",
        description: "Manage and manage your activity on Facebook.",
      },
      { 
        url: "/business/card-info",
        icon: "/images/svg/leads.svg",
        title: "Card Information",
        description: "Update your KYC information to help us verify your identity.",
      },
    ],
  },
  {
    title: "Subscription and Referals",
    horizontal: false,
    items: [
      {
        url: "/dashboard/subscription",
        icon: "/images/svg/leads.svg",
        title: "Subscription",
        description: "manage and upgrade your subscription plan.",
      },
      {
        url: "/dashboard/referals",
        icon: "/images/svg/leads.svg",
        title: "Refreals and invites",
        description: "Invite our friends and earn rewards.",
      },
    ],
  },
  {
    title: "Security",
    horizontal: false,
    items: [
      {
        url:"/dashboard/change-password",
        icon: "/images/svg/leads.svg",
        title: "Change password",
        description: "Learn how to manage and control your privacy across Meta products.",
      },
      {
        url:"/dashboard/change-pin",
        icon: "/images/svg/leads.svg",
        title: "Change PIN",
        description: "Learn more about our updated settings experience on Facebook.",
      },
    ],
  },

  {
    title: "privacy and safety",
    horizontal: false,
    items: [
      {
        url:"/faq",
        icon: "/images/svg/leads.svg",
        title: "FAQ",
        description: "Learn more about our updated settings experience on Facebook.",
      },
      {
        url:"/support",
        icon: "/images/svg/leads.svg",
        title: "Support",
        description: "Learn more about our updated settings experience on Facebook.",
      },
      {
        url:"/privacy-policy",
        icon: "/images/svg/leads.svg",
        title: "Privacy policy",
        description: "Learn how to manage and control your privacy across Meta products.",
      },
      {
        url:"/terms-and-conditions",
        icon: "/images/svg/leads.svg",
        title: "Terms and conditions",
        description: "Learn more about our updated settings experience on Facebook.",
      },
    ],
  },
];

const SettingsLayout: React.FC = () => {
  return (
       <div className="p-4">


       <Card className="max-w-6xl p-4 space-y-8 ">
      {sampleData.map((section, index) => {
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
                  <>
                  {section.horizontal ? verticalCard({item}): horizontalCard({item})}
                  </>
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
