"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Step1PopForm from "./step1pop";
import Step2Form from "./Step2";
import Step3Form from "./Step3";
import { validateRequired } from "@/lib/validation/common";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { showToast } from "@/lib/utilities/toastService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPackages } from "@/lib/action/moreClub/pricing";
import PricingCard from "@/components/cards/moreclub/PricingCard";
import moment from "moment";

import { Package } from "@/lib/redux/slice/moreclub/Pricing";
import { useAuth } from "@/providers/auth-provider";

const DEFAULT_PACKAGE = {
  id: "6de16bd7-2fbe-44d8-b057-2c3139744cc6",
  name: "Free",
  price: 0.0,
  currency_symbol: "Rs",
  icon: "https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/membership_plan/WhatsApp_Image_2025-03-13_at_21.05.02-removebg-preview_dy1gm8",
  morefood_business_discount: 10.0,
  referal_percentage: 10.0,
  salon_business_discount: 10.0,
  hotel_business_discount: 10.0,
  marketplace_business_discount: 10.0,
  max_networks_list: 1,
  max_networks_bulk_mail_month: 0,
  max_networks_bulk_sms_month: 0,
};

export interface UpgradeFormDataType {
  package: string;
  amount: string;
  pin: string;
  plan_time: "monthly" | "yearly";
  plan_type: "BUSINESS" | "NORMAL";
  transaction_date: string;
  currency_symbol: string;
  currency_code: string;
  user_id: string;
  email: string;
  phone_number: string;
}

const UpgradeForm = ({
  userType,
  membershiptype,
}: {
  userType: "BUSINESS" | "NORMAL";
  membershiptype: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user:session } = useAuth();
  const packages = useSelector((state: RootState) => state.pricing.packages);

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [purchasingInfo, setPurchasingInfo] = useState<Record<string, any>>({});

  const [formData, setFormData] = useState<UpgradeFormDataType>({
    package: "",
    amount: "",
    pin: "",
    plan_time: "monthly",
    plan_type: userType,
    transaction_date: new Date().toISOString(),
    currency_symbol: "",
    currency_code: "",
    user_id: session?.id ?? "",
    email: session?.email ?? "",
    phone_number: `${session?.phone_prefix ?? ""}${
      session?.phone_number ?? ""
    }`,
  });

  const availablePackages =
    packages?.[formData.plan_type]?.[formData.plan_time] || [];

  const selectedPackage = useMemo(() => {
    if (!availablePackages || availablePackages.length === 0) {
      return null;
    }
    if (formData.package) {
      return availablePackages.find((p) => p.id === formData.package);
    }
    if (membershiptype?.code) {
      return availablePackages.find(
        (p) => p.name === membershiptype?.membership_name
      );
    }
    return availablePackages[0] || null;
  }, [availablePackages, formData.package, membershiptype, formData.plan_time]);

  // Fetch packages on session or type change
  useEffect(() => {
    if (session?.country?.code) {
      dispatch(
        fetchPackages({
          type: formData.plan_type,
          cycle: formData.plan_time,
          country_code: session.country.code,
        })
      );
    }
  }, [formData.plan_type, formData.plan_time, session, dispatch]);

  // Auto set default package if not already set
  useEffect(() => {
    if (!formData.package && membershiptype && availablePackages.length > 0) {
      const pkg = availablePackages.find(
        (p) => p.name === membershiptype?.membership_name
      );
      if (pkg) {
        setFormData((prev) => ({
          ...prev,
          package: pkg.id,
          amount: pkg.price.toString(),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          package: availablePackages[0].id,
          amount: availablePackages[0].price.toString(),
        }));
      }
    }
  }, [availablePackages, formData.package]);

  const setData = useCallback(
    (key: keyof UpgradeFormDataType, value: any) => {
      setErrors((prev) => ({ ...prev, [key]: "" }));
      if (key === "package") {
        const pkg = availablePackages.find((p) => p.id === value);

        const price =
          formData.plan_time === "monthly" ? pkg?.price : pkg?.yearly_price;

        setFormData((prev) => ({
          ...prev,
          package: value,
          amount: price ? price.toString() : "",
        }));
      } else if (key === "plan_time") {
        const pkg = packages[formData.plan_type][
          value as "monthly" | "yearly"
        ]?.find((p) => p.id === formData.package);

        const price = value === "monthly" ? pkg?.price : pkg?.yearly_price;
        setFormData((prev) => ({
          ...prev,
          plan_time: value,
          amount: price?.toString() || "",
        }));
      } else {
        setFormData((prev) => ({ ...prev, [key]: value }));
      }
    },
    [formData.plan_type, formData.package, packages, availablePackages]
  );

  const validate = useCallback(
    async (fields = formData) => {
      const temp: Record<string, string> = {
        package: validateRequired(fields.package, "Package"),
        plan_time: validateRequired(fields.plan_time, "Plan Time"),
        currency_code: validateRequired(fields.plan_time, "Package"),
      };
      setErrors(temp);
      return Object.values(temp).every((err) => !err);
    },
    [formData]
  );

  const handleServerError = useCallback((err: any) => {
    const resErrors = err.response?.data?.errors ?? {};
    setErrors((prev) => ({
      ...prev,
      recipient: resErrors.username || "",
      transferAmount: resErrors.balance || "",
    }));
    const message =
      resErrors.non_field_errors?.[0] ||
      err.response?.data?.message ||
      "Something went wrong, please try again.";
    setServerError(message);
    showToast(message, "error");
  }, []);

  const handleNext = useCallback(
    async (nextStep: number) => {
      setServerError("");
      if (step === 0) {
        if (!(await validate())) return;
        try {
          const { data } = await MoreClubApiClient.post(
            `${process.env.NEXT_PUBLIC_API_URL}subscriptions/check/`,
            {
              membership_type: formData.package,
              plan_time: formData.plan_time,
            }
          );
          setPurchasingInfo(data.data);
          setStep(nextStep);
        } catch (err: any) {
          handleServerError(err);
        }
      } else if (step === 1) {
        showToast("Subscribed successfully!", "success");
        setStep(nextStep);
      }
    },
    [step, formData, validate, handleServerError]
  );

  const steps = [
    {
      component: Step1PopForm,
      props: {
        data: formData,
        errors,
        serverError,
        setData,
        onNext: () => handleNext(1),
        isLoading,
        subscribed : membershiptype,
        
      },
    },
    {
      component: Step2Form,
      props: {
        purchasingInformation: purchasingInfo,
        data: formData,
        errors,
        serverError,
        setData,
        onNext: () => handleNext(2),
        onBack: () => setStep(0),
        isLoading,
      },
    },
    {
      component: Step3Form,
      props: {
        purchasingInformation: purchasingInfo,
        data: formData,
        onPrint: () => window.print(),
        onReset: () => setStep(0),
      },
    },
  ];

  const CurrentStepComponent = steps[step].component;

  return (
    <div
      className={`grid grid-cols-1 ${
        step === 2 ? "xl:grid-cols-1" : "xl:grid-cols-2"
      }`}
    >
      <div className="space-y-4">
        <CurrentStepComponent {...(steps[step].props as any)} />
        <TermsAndAlerts plan_time={formData.plan_time} />
      </div>
      {step !== 2 && (
        <div className="xl:ml-2 p-5">
          {!selectedPackage ? (
            <p>Loading...</p>
          ) : (
            <PricingCard
              tier={selectedPackage as Package}
              idx={0}
              billingCycle={formData.plan_time}
              noOfPackage={1}
              subscribe={
                membershiptype?.membership_name === selectedPackage.name
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

const TermsAndAlerts = ({ plan_time }: { plan_time: "monthly" | "yearly" }) => {
  const endDate = useMemo(() => {
    const date = new Date();
    plan_time === "monthly"
      ? date.setMonth(date.getMonth() + 1)
      : date.setFullYear(date.getFullYear() + 1);
    return moment(date).format("MMM DD, YYYY");
  }, [plan_time]);

  return (
    <div className="mt-6 p-4 xl:pt-0 rounded-md text-sm">
      <p className="font-semibold">Terms of Use (For Subscription Packages)</p>
      <ol className="list-decimal list-outside text-muted-foreground pl-4">
        <li>
          Subscription fees are <strong>non-refundable</strong> once the payment
          is processed.
        </li>
        <li>
          MoreDeals Club reserves the right to{" "}
          <strong>modify or discontinue plans</strong> without prior notice.
        </li>
        <li>
          Users must comply with all <strong>terms and conditions</strong>{" "}
          associated with their selected plan.
        </li>
      </ol>
      <p className="mt-2 text-muted-foreground text-sm">
        Your plan will be valid until <strong>{endDate}</strong>.
      </p>
    </div>
  );
};

export default UpgradeForm;
