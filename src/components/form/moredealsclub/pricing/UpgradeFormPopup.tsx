
// "use client";
// import React, { useEffect, useState } from "react";
// import Step1Form from "./Step1";
// import Step2Form from "./Step2";
// import Step3Form from "./Step3";
// import { validateRequired } from "@/lib/validation/common";
// import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
// import { showToast } from "@/lib/utilities/toastService";
// import { setLoading } from "@/lib/redux/slice/CurrencySlice";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/lib/redux/store";
// import { fetchPackages } from "@/lib/action/moreClub/pricing";
// import PricingCard from "@/components/cards/moreclub/PricingCard";
// import moment from "moment";
// import { useSession } from "next-auth/react";
// import Step1PopForm from "./step1pop";
// import Step2PopForm from "./Step2pop";
// import { Package } from "@/lib/redux/slice/moreclub/Pricing";

// const DEFAULT_PACKAGE = {
//     id: "6de16bd7-2fbe-44d8-b057-2c3139744cc6",
//     name: "Free",
//     price: 0.0,
//     currency_symbol: "Rs",
//     currency_code: "NPR",
//     icon: "https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/membership_plan/WhatsApp_Image_2025-03-13_at_21.05.02-removebg-preview_dy1gm8",
//     morefood_business_discount: 10.0,
//     referal_percentage: 10.0,
//     salon_business_discount: 10.0,
//     hotel_business_discount: 10.0,
//     marketplace_business_discount: 10.0,
//     max_networks_list: 1,
//     max_networks_bulk_mail_month: 0,
//     max_networks_bulk_sms_month: 0,
// };

// export interface UpgradeFormDataType {
//     package: string;
//     amount: string;
//     pin: string;
//     plan_time: "monthly" | "yearly";
//     plan_type: "BUSINESS" | "NORMAL";
//     transaction_date: string;
//     currency_symbol: string;
//     currency_code: string;
//     user_id: string;
//     email: string;
//     phone_number: string;
// }

// const UpgradeFormPopup = ({userType}:{userType: "BUSINESS" | "NORMAL"}) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const {data: session}= useSession();
//     const [step, setStep] = useState(0);
//     const [errors, setErrors] = useState<{ [key: string]: string }>({});
//     const [serverError, setServerError] = useState<string>("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [purchasingInfo, setPurchasingInfo] = useState<Record<string, string | Record<string, string>>>({});


//     const [formData, setFormData] = useState<UpgradeFormDataType>({
//         package: "",
//         amount: "",
//         pin: "",
//         plan_time: "monthly",
//         plan_type: userType,
//         transaction_date: new Date().toISOString(),
//         currency_symbol: "",
//         currency_code: "",
//         user_id: session?.user?.userDetails?.id,
//         email: session?.user?.userDetails?.email ?? "",
//         phone_number: `${session?.user?.userDetails?.phone_prefix?? ""}${session?.user?.userDetails?.phone_number?? ""}`

//     });

//     const packages = useSelector(
//         (state: RootState) => state.pricing.packages
//     );

//     const selectedPackage = packages[formData.plan_type][formData.plan_time].find((pkg) => pkg.id === formData.package) || packages[formData.plan_type][formData.plan_time][0] || DEFAULT_PACKAGE;

//     useEffect(() => {
//         dispatch(fetchPackages({ type: formData.plan_type, cycle: formData.plan_time }));
//     }, [formData.plan_time, formData.plan_type, dispatch]);

//     useEffect(() => {
//         if (packages && packages[formData.plan_type][formData.plan_time].length > 0) {
//             setFormData((prev) => ({
//                 ...prev,
//                 package: packages[formData.plan_type][formData.plan_time][0].id,
//                 amount: packages[formData.plan_type][formData.plan_time][0].price.toString(), // 
//                 // Set the price as well
//                 currency_symbol: packages[formData.plan_type][formData.plan_time][0].currency_symbol,
//                 currency_code: packages[formData.plan_type][formData.plan_time][0].currency_code
//             }));
//         }
//     }, [packages]);

//     const setData = (key: string, value: any) => {
//         if (key === "package") {
//             const selectedPackage = packages[formData.plan_type][formData.plan_time].find((pkg:Package) => pkg.id === value) || DEFAULT_PACKAGE;
//             setFormData((prev) => ({
//                 ...prev,
//                 package: value,
//                 amount: selectedPackage.price.toString(),
//                 currency_symbol: selectedPackage.currency_symbol,
//                 currency_code: selectedPackage.currency_code,

//             }));
//         } else if (key === "plan_time") {
//             const price = packages[formData.plan_type][value as "monthly" | "yearly"].find((pkg) => pkg.id === formData.package)?.price;
//             setFormData((prev) => ({
//                 ...prev,
//                 plan_time: value,
//                 amount: price?.toString() || "",
//             }));
//         } else {
//             setFormData((prev) => ({ ...prev, [key]: value }));
//         }
//         setErrors((prev) => ({ ...prev, [key]: "" }));
//     };


//     const validate = async (fieldValues = formData) => {
//         const tempErrors: Record<string, string> = { ...errors };

//         if ("package" in fieldValues) {
//             tempErrors.package = validateRequired(fieldValues.package || "", "Package");
//         }

//         if ("plan_time" in fieldValues) {
//             tempErrors.package = validateRequired(fieldValues.package || "", "Plan Time");
//         }

//         if ("plan_time" in fieldValues) {
//             tempErrors.package = validateRequired(fieldValues.package || "", "Plan Time");
//         }
        
//         setErrors(tempErrors);
//         return Object.values(tempErrors).every((error) => !error);
//     };


//     const validatePin = async () => {
//         const tempErrors = { pin: validateRequired(formData.pin, "Pin") };
//         setErrors((prev) => ({ ...prev, ...tempErrors }));
//         return !tempErrors.pin;
//     };

//     const handleNext = async (nextStep: number) => {
//         if (step === 0) {
//             if (!(await validate())) return;
//             setServerError("");

//             try {
//                 const { data } = await MoreClubApiClient.post(
//                     `${process.env.NEXT_PUBLIC_API_URL}subscriptions/check/`,
//                     { membership_type: formData.package, plan_time: formData.plan_time }
//                 );

//                 setPurchasingInfo(data.data);
//                 setPurchasingInfo((prev) => ({ ...prev, ...data.data }));
//                 setStep(nextStep);
//             } catch (err: any) {
//                 handleServerError(err);
//             }
//         } else if (step === 1) {
//             if (!(await validatePin())) return;
//             setServerError("");

//             try {
//                 const { data } = await MoreClubApiClient.post(
//                     `${process.env.NEXT_PUBLIC_BASE_URL}subscriptions/upgrade/`,
//                     {
//                         membership_type: formData.package,
//                         plan_time: formData.plan_time,
//                         pin: formData.pin
//                     }
//                 );
//                 showToast("Transfer successful!", "success");
//                 setPurchasingInfo((prev) => ({ ...prev, ...data.data }));
//                 setStep(nextStep);
//             } catch (err: any) {
//                 handleServerError(err);
//             }
//         }
//     };

//     const handleServerError = (err: any) => {
//         if (err.response?.data?.errors) {
//             const errors = err.response.data.errors;
//             setErrors((prev) => ({
//                 ...prev,
//                 recipient: errors.username || "",
//                 transferAmount: errors.balance || "",
//                 pin: errors.pin || "",
//             }));
//         }
//         const errorMessage = err.response?.data?.errors?.non_field_errors?.[0] || err.response?.data?.message || "Something went wrong, please try again";
//         setServerError(errorMessage);
//         showToast(errorMessage, "error");
//     };

//     const steps = [
//         {
//             component: Step1PopForm,
//             props: { data: formData, errors, serverError, setData, onNext: () => handleNext(1), setLoading, isLoading },
//         },
//         {
//             component: Step2PopForm,
//             props: { purchasingInformation: purchasingInfo, data: formData, errors, serverError, setData, onNext: () => handleNext(2), onBack: () => setStep(0), isLoading },
//         },
//         {
//             component: Step3Form,
//             props: { purchasingInformation: purchasingInfo, data: formData, onPrint: () => window.print(), onReset: () => setStep(0) },
//         },
//     ];

//     const CurrentStepComponent = steps[step].component;

//     return (
//         <div className={`grid grid-cols-1`}>
//             <div className="space-y-4">
//                 <div className="grid grid-cols-1 gap-4">
//                     <CurrentStepComponent {...(steps[step].props as any)} />
//                 </div>
//             </div>
            
//         </div>
//     );
// };




// export default UpgradeFormPopup;


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
import { Package } from "@/lib/redux/slice/moreclub/Pricing";

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
  const { data: session } = useSession();

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
    user_id: session?.user?.userDetails?.id ?? "",
    email: session?.user?.userDetails?.email ?? "",
    phone_number: `${session?.user?.userDetails?.phone_prefix ?? ""}${session?.user?.userDetails?.phone_number ?? ""}`,
  });

  useEffect(() => {
    if(session?.user?.userDetails?.country.code){
      dispatch(fetchPackages({ type: formData.plan_type, cycle: formData.plan_time ,country_code:session?.user?.userDetails?.country.code }));
    }
  }, [formData.plan_type, formData.plan_time, dispatch ,session?.user?.userDetails?.country_code]);

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
        try {
          const { data } = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_API_URL}subscriptions/check/`, {
            membership_type: formData.package,
            plan_time: formData.plan_time,
          });
          setPurchasingInfo(data.data);
          setStep(nextStep);
        } catch (err: any) {
          handleServerError(err);
        }
      } else if (step === 1) {
        setServerError("");
        showToast("Subscribed successfully!", "success");
        // setStep(nextStep);
        onFinish();
        // try {
        //   const { data } = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}subscriptions/upgrade/`, {
        //     membership_type: formData.package,
        //     plan_time: formData.plan_time,
        //     pin: formData.pin,
        //   });
        //   showToast("Transfer successful!", "success");
        //   setPurchasingInfo((prev) => ({ ...prev, ...data.data }));
        //   setStep(nextStep);
        // } catch (err: any) {
        //   handleServerError(err);
        // }
      }
    },
    [formData, step, validate,  handleServerError]
  );

  const steps = [
    {
      component: Step1PopForm,
      props: { data: formData, errors, serverError, setData, onNext: () => handleNext(1), setLoading, isLoading },
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


