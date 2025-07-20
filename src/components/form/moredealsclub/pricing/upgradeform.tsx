// "use client";
// import React, { useCallback, useEffect, useState } from "react";
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
// import Step2PopForm from "./Step2pop";
// import Step1PopForm from "./step1pop";

// const DEFAULT_PACKAGE = {
//     id: "6de16bd7-2fbe-44d8-b057-2c3139744cc6",
//     name: "Free",
//     price: 0.0,
//     currency_symbol: "Rs",
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
// }

// export interface MembershipType {
//     currency: string;
//     expiration_date: string
//     membership_code: string
//     membership_name: string
//     membership_type: string
//     package_time: string
//     price: number
// }

// const UpgradeForm = ({ userType, membershiptype }: { userType: "BUSINESS" | "NORMAL", membershiptype: any }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { data: session } = useSession();
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
//     });

//     const packages = useSelector(
//         (state: RootState) => state.pricing.packages
//     );

//     const selectedPackage = packages[formData.plan_type][formData.plan_time].find((pkg) => pkg.code === membershiptype?.code) || packages[formData.plan_type][formData.plan_time].find((pkg) => pkg.id === formData.package) || packages[formData.plan_type][formData.plan_time][0] || DEFAULT_PACKAGE;

//     useEffect(() => {
//         if (session?.user?.userDetails?.country.code) {
//             dispatch(fetchPackages({ type: formData.plan_type, cycle: formData.plan_time, country_code: session?.user?.userDetails?.country.code }));
//         }

//     }, [formData.plan_time, formData.plan_type, dispatch, session]);

//     useEffect(() => {
//         if (packages && packages[formData.plan_type][formData.plan_time].length > 0) {
//             setFormData((prev) => ({
//                 ...prev,
//                 package: packages[formData.plan_type][formData.plan_time][0].id,
//                 amount: packages[formData.plan_type][formData.plan_time][0].price.toString(), // Set the price as well
//             }));
//         }
//     }, [packages]);

//     const setData = (key: string, value: any) => {
//         if (key === "package") {
//             const selectedPackage = packages[formData.plan_type][formData.plan_time].find((pkg) => pkg.id === value) || DEFAULT_PACKAGE;
//             setFormData((prev) => ({
//                 ...prev,
//                 package: value,
//                 amount: selectedPackage.price.toString(), // Update amount when package changes
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

//   const validate = useCallback(async (fields = formData) => {
//     const temp: Record<string, string> = {};
//     temp.package = validateRequired(fields.package, "Package");
//     temp.plan_time = validateRequired(fields.plan_time, "Plan Time");
//     temp.currency_code = validateRequired(fields.plan_time, "Package");
//     setErrors(temp);
//     return Object.values(temp).every((err) => !err);
//   }, [formData]);

//   const handleServerError = useCallback((err: any) => {
//     const resErrors = err.response?.data?.errors ?? {};
//     setErrors((prev) => ({
//       ...prev,
//       recipient: resErrors.username || "",
//       transferAmount: resErrors.balance || "",
//     }));
//     const message = resErrors.non_field_errors?.[0] || err.response?.data?.message || "Something went wrong, please try again.";
//     setServerError(message);
//     showToast(message, "error");
//   }, []);

//     const handleNext = useCallback(
//         async (nextStep: number) => {
//           if (step === 0) {
//             if (!(await validate())) return;
//             setServerError("");
//             try {
//               const { data } = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_API_URL}subscriptions/check/`, {
//                 membership_type: formData.package,
//                 plan_time: formData.plan_time,
//               });
//               setPurchasingInfo(data.data);
//               setStep(nextStep);
//             } catch (err: any) {
//               handleServerError(err);
//             }
//           } else if (step === 1) {
//             setServerError("");
//             showToast("Subscribed successfully!", "success");
//             setStep(nextStep);
//             // setStep(nextStep);
//             // onFinish();
//             // try {
//             //   const { data } = await MoreClubApiClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}subscriptions/upgrade/`, {
//             //     membership_type: formData.package,
//             //     plan_time: formData.plan_time,
//             //     pin: formData.pin,
//             //   });
//             //   showToast("Transfer successful!", "success");
//             //   setPurchasingInfo((prev) => ({ ...prev, ...data.data }));
//             //   setStep(nextStep);
//             // } catch (err: any) {
//             //   handleServerError(err);
//             // }
//           }
//         },
//         [formData, step, validate,  handleServerError]
//       );

//     const steps = [
//         {
//             component: Step1PopForm,
//             props: { data: formData, errors, serverError, setData, onNext: () => handleNext(1), setLoading, isLoading },
//         },
//         {
//             component: Step2Form,
//             props: { purchasingInformation: purchasingInfo, data: formData, errors, serverError, setData, onNext: () => handleNext(2), onBack: () => setStep(0), isLoading },
//         },
//         {
//             component: Step3Form,
//             props: { purchasingInformation: purchasingInfo, data: formData, onPrint: () => window.print(), onReset: () => setStep(0) },
//         },
//     ];

//     const CurrentStepComponent = steps[step].component;

//     return (
//         <div className={`grid grid-cols-1 ${step === 2 ? "xl:grid-cols-1" : "xl:grid-cols-2"}`}>
//             <div className="space-y-4">
//                 <div className="grid grid-cols-1 gap-4">
//                     <CurrentStepComponent {...(steps[step].props as any)} />
//                     {/* <CurrentStepComponent {...steps[step].props} /> */}
//                     <TermsAndAlerts plan_time={formData.plan_time} />
//                 </div>
//             </div>
//             {step !== 2 && (
//                 <div className="xl:ml-2 p-5">
//                     <PricingCard tier={selectedPackage} idx={0} billingCycle={formData.plan_time} noOfPackage={1} />
//                 </div>
//             )}
//         </div>
//     );
// };

// const TermsAndAlerts = ({ plan_time }: { plan_time: "monthly" | "yearly" }) => {
//     // Get the current date
//     const currentDate = new Date();

//     // Calculate the end date based on the plan time
//     const endDate = new Date(currentDate);
//     if (plan_time === "monthly") {
//         endDate.setMonth(currentDate.getMonth() + 1); // Add 1 month for monthly plan
//     } else if (plan_time === "yearly") {
//         endDate.setFullYear(currentDate.getFullYear() + 1); // Add 1 year for yearly plan
//     }

//     // Format the end date to a readable format (e.g., "MM/DD/YYYY")
//     const formattedEndDate = moment(endDate).format("MMM DD, YYYY ");

//     return (
//         <>
//             <div className="mt-6 p-4 xl:pt-0 rounded-md text-sm">
//                 <p className="font-semibold">Terms of Use (For Subscription Packages)</p>
//                 <ol className="list-decimal list-outside text-muted-foreground pl-4">
//                     <li>Subscription fees are <strong>non-refundable</strong> once the payment is processed.</li>
//                     <li>MoreDeals Club reserves the right to <strong>modify or discontinue plans</strong> without prior notice.</li>
//                     <li>Users must comply with all <strong>terms and conditions</strong> associated with their selected plan.</li>
//                     <li>Subscription benefits are <strong>exclusive to the subscribed user</strong> and cannot be transferred.</li>
//                     <li><strong>Package Activation & Validity:</strong></li>
//                     <ul className="list-disc list-inside pl-4">
//                         <li>Your package will be <strong>activated immediately</strong> after successful payment.</li>
//                         <li>The subscription will remain valid until <strong>{formattedEndDate}</strong>.</li>
//                         <li><strong>If the package expires, your account will be switched to the free plan,</strong> which might interrupt the benefits you're currently using with the paid plan.</li>
//                     </ul>
//                 </ol>
//             </div>
//             <div className="mt-4 bg-yellow-50 p-4 rounded-md text-sm">
//                 <p className="font-semibold text-black">Stay Alert!</p>
//                 <ol className="list-decimal list-outside pl-4 text-gray-600">
//                     <li><strong>Verify package details</strong> before making a payment. Ensure you're selecting the correct plan and billing cycle.</li>
//                     <li><strong>Beware of scams!</strong> MoreDeals Club will <strong>never ask for your PIN or payment details</strong> outside our official platform.</li>
//                     <li><strong>Do not share your account credentials</strong> with anyone to avoid unauthorized access to your subscription.</li>
//                     <li>In case of any <strong>discrepancy in billing or plan activation</strong>, contact MoreDeals Club support immediately.</li>
//                 </ol>
//             </div>
//         </>
//     );
// };

// export default UpgradeForm;

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
import { useSession } from "next-auth/react";
import { Package } from "@/lib/redux/slice/moreclub/Pricing";

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
  const { data: session } = useSession();
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
    user_id: session?.user?.userDetails?.id ?? "",
    email: session?.user?.userDetails?.email ?? "",
    phone_number: `${session?.user?.userDetails?.phone_prefix ?? ""}${
      session?.user?.userDetails?.phone_number ?? ""
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
    if (session?.user?.userDetails?.country?.code) {
      dispatch(
        fetchPackages({
          type: formData.plan_type,
          cycle: formData.plan_time,
          country_code: session.user.userDetails.country.code,
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
