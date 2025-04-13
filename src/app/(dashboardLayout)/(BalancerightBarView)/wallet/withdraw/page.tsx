import WithDrawForm from "@/components/form/moredealsclub/wallet/withdraw/withdrawForm";
import BackButton from "@/components/ui/back_button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-start  min-h-screen ">
      <Card className="w-full ">
        <CardHeader className="">
          <CardTitle className="flex items-center border-b border-primary dark:border-gray-200">
            <BackButton className="mr-4" />
            <Image
              src={"/images/svg/withdraw_amount.svg"}
              alt={"send"}
              className=" h-8 w-auto mb-3 rounded-full object-cover"
              width={100}
              height={100}
            />
            Withdraw Money
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="space-y-4">
              <WithDrawForm />
            </div>
            <div className="xl:ml-2">
              <div className=" xl:mt-0 mt-6 p-4 xl:pt-0 rounded-md text-sm">
                <p className="font-semibold">Terms of Use</p>
                <ol className="list-decimal list-outside text-muted-foreground pl-4">
                  <li>
                    Users are prohibited from using Send Money for illegal
                    transactions.
                  </li>
                  <li>
                    MoreDeals Club is not liable if the receiver defaults on
                    their promise to repay or deliver goods/services.
                  </li>
                </ol>
              </div>
              <div className="mt-4 bg-yellow-50 p-4 rounded-md text-sm">
                <p className="font-semibold text-black">Stay Alert!</p>
                <ol className="list-decimal list-outside pl-4 text-gray-600">
                  <li>Send money to trusted contacts only.</li>
                  <li>
                    Verify requests received on social media before sending
                    money.
                  </li>
                  <li>Always double-check the receiver’s MoreDeals Club ID.</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
