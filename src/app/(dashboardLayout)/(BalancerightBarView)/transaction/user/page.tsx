"use client";
import FilterComponent from "@/components/moreclub/Transaction/TransactionFilter";
import TransactionList from "@/components/moreclub/Transaction/TransactionList";
import BackButton from "@/components/ui/back_button";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilterIcon } from "lucide-react";
import React, { Suspense } from "react";

const Page = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const handleClose = async () => {
    setIsOpen(false);
  };
  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <BackButton />
          <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
        </div>

        <div className="block 2xl:hidden">
          <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <SheetTrigger>
              <Button size={"icon"}>
                <FilterIcon fill="currentColor" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isMobile ? "bottom" : "right"}>
              <SheetHeader>
                <SheetTitle>Filter Transactions</SheetTitle>
                <SheetDescription>
                  <FilterComponent onClose={handleClose} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 ">
        <Card className="max-w-lg">
          <CardContent className="p-0">
            <Suspense fallback={<div>Loading...</div>}>
              <TransactionList />
            </Suspense>
          </CardContent>
        </Card>
        <div className="hidden 2xl:block">
          <Suspense>
            <Card>
              <FilterComponent />
            </Card>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
