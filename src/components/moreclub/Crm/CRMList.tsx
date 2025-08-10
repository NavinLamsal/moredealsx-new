import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

export const crmDataMap = {
  Restaurant: {
    name: "RESTAURANT CRM",
    banner: "/images/svg/morefood.svg",
    urlkey: "restro_link",
  },
  Saloon: {
    name: "MORESALONS CRM",
    banner: "/images/svg/morefood.svg",
    urlkey: "salon_link",
  },
  Hotel: {
    name: "MORELIVING CRM",
    banner: "/images/svg/morefood.svg",
    urlkey: "hotel_link",
  },
} as const;

type CrmType = keyof typeof crmDataMap;

const CRMList = ({ name }: { name: string }) => {
  const {user: session} = useAuth();

  const crmData = crmDataMap[name as CrmType] || {
    name: "Unknown CRM",
    banner: "/images/svg/default.svg",
    urlkey: "crm_link",
  };

  if (!session) {
    return <div>Getting your  {name} CRM ...</div>;
  }


  if (!session?.crm_link) {
    return (
      <Link href={`/business/crm/create/`}>
        <div className="max-w-sm mx-auto bg-blue-100 border border-blue-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-xl">
              +
            </div>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Add a CRM for your {name}
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your own business. List your business on our platform and
            start earning!
          </p>
        </div>
      </Link>
    );
  }

  if (session?.crm_link) {
    return (
      <>
        <div className="w-full min-w-xs max-w-xs  bg-background rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:shadow-xl hover:bg-background active:bg-background">
          <div className="relative w-full h-40">
            <Image
              // src={crmData.banner}
              src={"/images/png/moredealsxnew.png"}
              alt={name}
              // layout="fill"
              // objectFit="contain"
              className="rounded-lg bg-white object-contain w-full h-40 p-4"
              width={500}
              height={500}
            />
          </div>
          <div className="p-4">
            <h3 className="text-base font-semibold  text-center">
              {crmData.name}
            </h3>
            <div
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `https://merkoll.com/auth/login`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="cursor-pointer "
            >
              <Button className="flex mx-auto">Visit</Button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CRMList;
