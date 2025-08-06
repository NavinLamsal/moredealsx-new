"use client";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RootState } from "@/lib/redux/store";
import { AlertOctagonIcon, CheckIcon, ShieldCloseIcon, X, XIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { UpgradeFormDataType } from "./upgradeform";
import { Package } from "@/lib/redux/slice/moreclub/Pricing";
import { SkeletonBox } from "@/components/Skeletons/packageSkelton";

interface Step1Props {
  data: UpgradeFormDataType;
  errors: any;
  serverError: string;
  setData: (key: string, value: any) => void;
  onNext: () => void;
  onSkip: () => void;
  isLoading: boolean;
  subscribed: any;
}

const Step1UpgradeForm: React.FC<Step1Props> = ({
  data,
  errors,
  setData,
  onNext,
  onSkip,
  serverError,
  isLoading,
  subscribed,
}) => {
  const lastpackage = useSelector(
    (state: RootState) =>
      state.pricing.lastFetched[data.plan_type][data.plan_time]
  );
  const packages = useSelector(
    (state: RootState) => state.pricing.packages[data.plan_type][data.plan_time]
  );

  const user = useSelector((state: RootState) => state.user);

  const handlePackageChange = (value: string) => {
    const selectedPack = packages.find((p: Package) => p.id === value);
    if (selectedPack) {
      setData("package", selectedPack.id);
      setData("amount", selectedPack.price);
      setData("currency_symbol", selectedPack.currency_symbol);
      setData("currency_code", selectedPack.currency_code);
    }
  };


  const subscribed_id = packages.find((p: Package) => p.name === subscribed?.membership_name);


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
        <RadioGroup
          value={data.plan_time}
          onValueChange={(value) => setData("plan_time", value)}
          className="grid grid-cols-2 gap-4"
        >
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
        {errors.plan_time && (
          <p className="text-red-500 text-sm">{errors.plan_time}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Choose a Package
        </label>
        {!lastpackage && (
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <SkeletonBox key={i} className="h-40 rounded-md" />
            ))}
          </div>
        )}

        <RadioGroup
          value={data.package}
          onValueChange={handlePackageChange}
          className="grid md:grid-cols-2 gap-4 "
        >
          {lastpackage &&
            packages.map((pack: Package) => (
              <div key={pack.id}>
                <RadioGroupItem
                  value={pack.id}
                  id={pack.id}
                  className="peer sr-only"
                />
                <div key={pack.id} className="max-w-xl h-full group">
                  <RadioGroupItem
                    value={pack.id}
                    id={pack.id}
                    className="peer sr-only "
                  // disabled={isSubscribed}
                  />
                  <label
                    htmlFor={pack.id}
                    className={`flex flex-col gap-4 items-center  h-full rounded-md justify-between border-2 border-muted bg-popover  shadow-lg  peer-data-[state=checked]:border-4 peer-data-[state=checked]:border-yellow-400 [&:has([data-state=checked])]:border-yellow-400  [&:has([data-state=checked])]:text-black text-white  ${" transition-all duration-300 group-hover:scale-105 hover:shadow-yellow-300"
                      }`}
                  >
                    <div className="w-full">
                      <div className="lg:p-10 p-6 text-center border-2 border-muted w-full bg-black">
                        <span className="text-xl font-bold uppercase ">
                          {pack?.name}
                        </span>
                        <div className="text-lg font-bold">
                          {pack.currency_symbol}
                          {data.plan_time === "yearly" ? pack.yearly_price : pack.price}
                          <span className="text-base font-normal opacity-80 ml-2">
                            /{data.plan_time}
                          </span>
                        </div>
                        {data.plan_time === "yearly" &&
                          <span className="text-xs text-white text-start">
                            {pack.currency_symbol} {pack.price} x 11 <br />
                            {pack.code === "free" ? "" : `No hidden fees`}

                          </span>

                        }

                        {pack.name.toLowerCase() === "silver" && pack.name !== subscribed?.membership_name && (
                          <div>
                            <span className="inline-flex px-3 py-1 text-xs font-semibold text-white  rounded-full bg-destructive">
                              RECOMMENDED
                            </span>
                          </div>
                        )}
                        {pack.name === subscribed?.membership_name && (
                          <div>
                            <span className="inline-flex px-3 py-1 text-xs font-semibold text-white  rounded-full bg-green-500">
                              CURRENTLY SUBSCRIBED
                            </span>
                          </div>
                        )}

                        {pack.free_trial?.is_free_trial && (
                          <div>
                            <span className="inline-flex px-3 pt-1 text-xs font-semibold text-center  rounded-full ">
                              30-day trial, no credit card required
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="px-6 ">

                        <div className="grow space-y-3 mb-3 text-black ">
                          {pack?.features && (
                            <ul className="mt-2 space-y-1 text-sm ">
                              <li className="font-semibold text-center">Plan Includes</li>
                              {pack.features.map((feature, index: number) => (
                                <li key={index} className={`flex items-start text-start gap-2 ${feature.icon.toLocaleLowerCase() === "check" ? "" : "text-muted-foreground"}`}>{feature.icon.toLocaleLowerCase() === "check" ? <CheckIcon className="h-4 w-4" /> : feature.icon.toLocaleLowerCase() === "x" ? <XIcon className="h-4 w-4" /> : ""} {feature.title}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {pack?.name.includes("Power Saver") && (
                          <div>
                            <span className="inline-flex px-3 py-1 text-xs font-semibold text-white  rounded-full bg-destructive">
                              RECOMMENDED
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* {isSubscribed && (
                      <div className="place-self-center mb-4 w-full px-2 ">
                        
                        <Button
                          type="button"
                          className={`cursor-not-allowed bg-green-500 hover:bg-green-500  text-black w-full  `}
                        >
                          CURRENTLY SUBSCRIBED
                        </Button>
                      </div>
                    )} */}
                  </label>
                </div>
              </div>
            ))}
        </RadioGroup>
        {errors.package && <p className="text-red-500">{errors.package}</p>}
      </div>

      {packages.length > 0 &&

        <>
          {user.profile?.user_type === "NORMAL" &&
            packages.find((p: Package) => p.id === data.package)?.code === "free" ? (
            <Button
              type="button"
              onClick={onSkip}
              className="w-full"
              disabled={isLoading}
            >
              Skip
            </Button>
          ) : (
            <>
              {user.profile?.user_type === "BUSINESS" &&
                packages.find((p: Package) => p.id === data.package)?.free_trial
                  ?.is_free_trial ? (
                <>
                  {subscribed_id?.id === data.package && subscribed_id.price > 0 ? (
                    <Button
                      type="button"
                      onClick={onNext}
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Next"}
                    </Button>
                  )
                    : (
                      <Button
                        type="button"
                        onClick={onSkip}
                        className="w-full"
                        disabled={isLoading}
                      >
                        Continue with Free trial
                      </Button>
                    )
                  }
                </>
              ) : (
                <Button
                  type="button"
                  onClick={onNext}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Next"}

                </Button>
              )}
            </>
          )}

        </>

      }
    </div>
  );
};

export default Step1UpgradeForm;
