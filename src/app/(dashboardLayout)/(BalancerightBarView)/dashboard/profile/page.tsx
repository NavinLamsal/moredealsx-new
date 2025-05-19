import ProfileCard from "@/components/settings/ProfileCard";
import UserContent from "@/components/settings/UserContent";
import BackButton from "@/components/ui/back_button";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="p-4 ">
      <div className="flex flex-row justify-between">
        <div className="flex items-center space-x-2">
          <BackButton className="mr-4" />
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
        <Link href={"/dashboard/profile/update"}>
          <Button size={"icon"}>
            <Edit2 className="" />
          </Button>
        </Link>
      </div>
      <UserContent />
    </div>
  );
};

export default Page;
