"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Step1PopForm from "./step1pop";
import Step2PopForm from "./Step2pop";
import Step3Form from "./Step3";
import { validateRequired } from "@/lib/validation/common";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { showToast } from "@/lib/utilities/toastService";
import { setLoading } from "@/lib/redux/slice/CurrencySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPackages } from "@/lib/action/moreClub/pricing";
import { useSession } from "next-auth/react";

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

const UpgradeFormPopup = ({ userType , onFinish }: { userType: "BUSINESS" | "NORMAL", onFinish: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const { data: session } = useSession();
  const user = useSelector((state: RootState) => state.user);

  const packages = useSelector((state: RootState) => state.pricing.packages);

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    user_id: user?.profile?.id ?? "",
    email: user?.profile?.email ?? "",
    phone_number: `${user?.profile?.phone_prefix ?? ""}${user?.profile?.phone_number ?? ""}`,
  });

  useEffect(() => {
    if(user?.profile?.country.code){
      dispatch(fetchPackages({ type: formData.plan_type, cycle: formData.plan_time ,country_code:user?.profile?.country.code }));
    }
  }, [formData.plan_type, formData.plan_time, dispatch ,user?.profile?.country?.code ]);

  useEffect(() => {
    const current = packages[formData.plan_type]?.[formData.plan_time];
    if (current?.length) {
      const firstPkg = current[0];
      setFormData((prev) => ({
        ...prev,
        package: firstPkg.id,
        amount: firstPkg.price.toString(),
        currency_symbol: firstPkg.currency_symbol,
        currency_code: firstPkg.currency_code,
      }));
    }
  }, [packages, formData.plan_type, formData.plan_time]);


  const setData = useCallback((key: string, value: any) => {
    setFormData((prev) => {
      let updated = { ...prev, [key]: value };

      if (key === "package") {
        const pkg = packages[formData.plan_type]?.[formData.plan_time]?.find((p) => p.id === value) ?? null;
        if(pkg){
            updated = {
              ...updated,
              amount: pkg.price.toString(),
              currency_symbol: pkg.currency_symbol,
              currency_code: pkg.currency_code,
            };
        }
      } else if (key === "plan_time") {
        const pkg = packages[formData.plan_type as "BUSINESS" | "NORMAL"][formData.plan_time as "monthly" | "yearly"]?.find((p) => p.id === formData.package);
        updated.amount = pkg?.price?.toString() ?? "";
      }

      return updated;
    });

    setErrors((prev) => ({ ...prev, [key]: "" }));
  }, [formData.package, formData.plan_type, packages]);

  const validate = useCallback(async (fields = formData) => {
    const temp: Record<string, string> = {};
    temp.package = validateRequired(fields.package, "Package");
    temp.plan_time = validateRequired(fields.plan_time, "Plan Time");
    temp.currency_code = validateRequired(fields.plan_time, "Package");
    setErrors(temp);
    return Object.values(temp).every((err) => !err);
  }, [formData]);



  const handleServerError = useCallback((err: any) => {
    const resErrors = err.response?.data?.errors ?? {};
    setErrors((prev) => ({
      ...prev,
      recipient: resErrors.username || "",
      transferAmount: resErrors.balance || "",
    }));
    const message = resErrors.non_field_errors?.[0] || err.response?.data?.message || "Something went wrong, please try again.";
    setServerError(message);
    showToast(message, "error");
  }, []);

  const handleNext = useCallback(
    async (nextStep: number) => {
      if (step === 0) {
        if (!(await validate())) return;
        setServerError("");
        setIsLoading(true);
        try {
          const { data } = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_API_URL}subscriptions/check/`, {
            membership_type: formData.package,
            plan_time: formData.plan_time,
          });
          setPurchasingInfo(data.data);
          setStep(nextStep);
        } catch (err: any) {
          handleServerError(err);
        }finally{
          setIsLoading(false);
        }
      } else if (step === 1) {
        setServerError("");
        showToast("Subscribed successfully!", "success");
        onFinish();
      }
    },
    [formData, step, validate,  handleServerError]
  );

  const handleSkip = useCallback(async () => {
    try {
      if(!(await validate())) return;
      setServerError("");
      showToast("Subscribed successfully!", "success");
      onFinish();
    } catch (error) {
      setServerError("Something went wrong while skipping.");
    }
  }, [onFinish]);

  const steps = [
    {
      component: Step1PopForm,
      props: { data: formData, errors, serverError, setData,  onNext: () => handleNext(1), onSkip: () => handleSkip(), setLoading, isLoading },
    },
    {
      component: Step2PopForm,
      props: { purchasingInformation: purchasingInfo, data: formData, errors, serverError, setData, onNext: () => handleNext(2), onBack: () => setStep(0), isLoading },
    },
    {
      component: Step3Form,
      props: { purchasingInformation: purchasingInfo, data: formData, onPrint: () => window.print(), onReset: () => setStep(0) },
    },
  ];

  const CurrentStepComponent = steps[step].component;

  return (
    <div className="grid grid-cols-1 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <CurrentStepComponent {...(steps[step].props as any)} />
      </div>
    </div>
  );
};

export default UpgradeFormPopup;


