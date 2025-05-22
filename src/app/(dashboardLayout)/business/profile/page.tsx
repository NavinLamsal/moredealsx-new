import BusinessContent from "@/components/settings/BusinessContent";

import BackButton from "@/components/ui/back_button";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

import { Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="p-4 ">
      <div className="flex flex-row justify-between">
        <BackButton />
        <Heading title="Business Profile" />
        {/* <h1 className='text-3xl font-bold'>Business Profile</h1> */}
        <Link href={"/business/profile/update"}>
          <Button size={"icon"}>
            <Edit2 className="" />
          </Button>
        </Link>
      </div>
      <BusinessContent />
    </div>
  );
};

export default Page;
