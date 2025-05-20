"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RootState } from "@/lib/redux/store";
import { AlertOctagonIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { UpgradeFormDataType } from "./upgradeform";
import { Package } from "@/lib/redux/slice/moreclub/Pricing";

interface Step1Props {
  data: UpgradeFormDataType;
  errors: any;
  serverError: string;
  setData: (key: string, value: any) => void;
  onNext: () => void;
  isLoading: boolean;
}

const Step1PopForm: React.FC<Step1Props> = ({ data, errors, setData, onNext, serverError, isLoading }) => {
  const lastpackage = useSelector((state: RootState) => state.pricing.lastFetched[data.plan_type][data.plan_time]);
  const packages = useSelector((state: RootState) => state.pricing.packages[data.plan_type][data.plan_time]);

  const handlePackageChange = (value: string) => {
    const selectedPack = packages.find((p: Package) => p.id === value);
    if (selectedPack) {
      setData("package", selectedPack.id);
      setData("amount", selectedPack.price);
      setData("currency_symbol", selectedPack.currency_symbol);
      setData("currency_code", selectedPack.currency_code);
    }
  };

  return (
    <div className="space-y-4">
      {serverError && (
        <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200">
          <AlertOctagonIcon className="mr-2 h-4 w-4" />
          {serverError}
          <AlertOctagonIcon className="ml-2 h-4 w-4" />
        </p>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Plan Time</label>
        <RadioGroup value={data.plan_time} onValueChange={(value) => setData("plan_time", value)} className="grid grid-cols-2 gap-4">
          {["monthly", "yearly"].map((type) => (
            <div key={type}>
              <RadioGroupItem value={type} id={type} className="peer sr-only" />
              <label
                htmlFor={type}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:text-primary-foreground"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            </div>
          ))}
        </RadioGroup>
        {errors.plan_time && <p className="text-red-500 text-sm">{errors.plan_time}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Choose a Package</label>
          {!lastpackage && <p className="text-sm text-muted-foreground">loading...</p>}

        <RadioGroup value={data.package} onValueChange={handlePackageChange} className="grid md:grid-cols-3 gap-4 ">

          {lastpackage && packages.map((pack: Package) => (
            <div key={pack.id}>
              <RadioGroupItem value={pack.id} id={pack.id} className="peer sr-only" />
              <label
                htmlFor={pack.id}
                className="
                flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:text-primary-foreground"
              >
                <span className="text-md font-semibold">{pack?.name}</span>
                <span className="text-sm text-muted-foreground">
                  {pack.currency_symbol} {data.plan_time === "yearly" ? pack.yearly_price : pack.price}
                </span>
                {pack?.name.includes("Power Saver") &&
                  <div>

                    <span className='inline-flex px-3 py-1 text-xs font-semibold text-white  rounded-full bg-destructive'>RECOMMENDED</span>
                  </div>}
              </label>
            </div>
          ))}
        </RadioGroup>
        {errors.package && <p className="text-red-500">{errors.package}</p>}
      </div>


      <Button type="button" onClick={onNext} className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Next"}
      </Button>
    </div>
  );
};

export default Step1PopForm;
