
"use client";
import React, { useEffect, useState } from "react";
import Step1Form from "./Step1";
import Step2Form from "./Step2";
import Step3Form from "./Step3";
import { validateRequired } from "@/lib/validation/common";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { showToast } from "@/lib/utilities/toastService";
import { setLoading } from "@/lib/redux/slice/CurrencySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPackages } from "@/lib/action/moreClub/pricing";
import PricingCard from "@/components/cards/moreclub/PricingCard";
import moment from "moment";
import { useSession } from "next-auth/react";

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
}

const UpgradeForm = ({userType}:{userType: "BUSINESS" | "NORMAL"}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {data: session}= useSession();
    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [serverError, setServerError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [purchasingInfo, setPurchasingInfo] = useState<Record<string, string | Record<string, string>>>({});

    const [formData, setFormData] = useState<UpgradeFormDataType>({
        package: "",
        amount: "",
        pin: "",
        plan_time: "monthly",
        plan_type: userType,
        transaction_date: new Date().toISOString(),
    });

    const packages = useSelector(
        (state: RootState) => state.pricing.packages
    );

    const selectedPackage = packages[formData.plan_type][formData.plan_time].find((pkg) => pkg.id === formData.package) || packages[formData.plan_type][formData.plan_time][0] || DEFAULT_PACKAGE;

    useEffect(() => {
        dispatch(fetchPackages({ type: formData.plan_type, cycle: formData.plan_time }));
    }, [formData.plan_time, formData.plan_type, dispatch]);

    useEffect(() => {
        if (packages && packages[formData.plan_type][formData.plan_time].length > 0) {
            console.log("packages id", packages[formData.plan_type][formData.plan_time][0].id)
            setFormData((prev) => ({
                ...prev,
                package: packages[formData.plan_type][formData.plan_time][0].id,
                amount: packages[formData.plan_type][formData.plan_time][0].price.toString(), // Set the price as well
            }));
        }
    }, [packages]);

    const setData = (key: string, value: any) => {
        if (key === "package") {
            const selectedPackage = packages[formData.plan_type][formData.plan_time].find((pkg) => pkg.id === value) || DEFAULT_PACKAGE;
            setFormData((prev) => ({
                ...prev,
                package: value,
                amount: selectedPackage.price.toString(), // Update amount when package changes
            }));
        } else if (key === "plan_time") {
            const price = packages[formData.plan_type][value as "monthly" | "yearly"].find((pkg) => pkg.id === formData.package)?.price;
            setFormData((prev) => ({
                ...prev,
                plan_time: value,
                amount: price?.toString() || "",
            }));
        } else {
            setFormData((prev) => ({ ...prev, [key]: value }));
        }
        setErrors((prev) => ({ ...prev, [key]: "" }));
    };


    const validate = async (fieldValues = formData) => {
        const tempErrors: Record<string, string> = { ...errors };

        if ("package" in fieldValues) {
            tempErrors.package = validateRequired(fieldValues.package || "", "Package");
        }

        if ("plan_time" in fieldValues) {
            tempErrors.package = validateRequired(fieldValues.package || "", "Plan Time");
        }
        
        setErrors(tempErrors);
        return Object.values(tempErrors).every((error) => !error);
    };


    const validatePin = async () => {
        const tempErrors = { pin: validateRequired(formData.pin, "Pin") };
        setErrors((prev) => ({ ...prev, ...tempErrors }));
        return !tempErrors.pin;
    };

    const handleNext = async (nextStep: number) => {
        if (step === 0) {
            if (!(await validate())) return;
            setServerError("");

            try {
                const { data } = await MoreClubApiClient.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}subscriptions/validate/`,
                    { membership_type: formData.package, plan_time: formData.plan_time }
                );

                setPurchasingInfo(data.data);
                setPurchasingInfo((prev) => ({ ...prev, ...data.data }));
                setStep(nextStep);
            } catch (err: any) {
                handleServerError(err);
            }
        } else if (step === 1) {
            if (!(await validatePin())) return;
            setServerError("");

            try {
                const { data } = await MoreClubApiClient.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}subscriptions/upgrade/`,
                    {
                        membership_type: formData.package,
                        plan_time: formData.plan_time,
                        pin: formData.pin
                    }
                );
                showToast("Transfer successful!", "success");
                setPurchasingInfo((prev) => ({ ...prev, ...data.data }));
                setStep(nextStep);
            } catch (err: any) {
                handleServerError(err);
            }
        }
    };

    const handleServerError = (err: any) => {
        if (err.response?.data?.errors) {
            const errors = err.response.data.errors;
            setErrors((prev) => ({
                ...prev,
                recipient: errors.username || "",
                transferAmount: errors.balance || "",
                pin: errors.pin || "",
            }));
        }
        const errorMessage = err.response?.data?.errors?.non_field_errors?.[0] || err.response?.data?.message || "Something went wrong, please try again";
        setServerError(errorMessage);
        showToast(errorMessage, "error");
    };

    const steps = [
        {
            component: Step1Form,
            props: { data: formData, errors, serverError, setData, onNext: () => handleNext(1), setLoading, isLoading },
        },
        {
            component: Step2Form,
            props: { purchasingInformation: purchasingInfo, data: formData, errors, serverError, setData, onNext: () => handleNext(2), onBack: () => setStep(0), isLoading },
        },
        {
            component: Step3Form,
            props: { purchasingInformation: purchasingInfo, data: formData, onPrint: () => window.print(), onReset: () => setStep(0) },
        },
    ];

    const CurrentStepComponent = steps[step].component;

    return (
        <div className={`grid grid-cols-1 ${step === 2 ? "xl:grid-cols-1" : "xl:grid-cols-2"}`}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <CurrentStepComponent {...(steps[step].props as any)} />
                    {/* <CurrentStepComponent {...steps[step].props} /> */}
                    <TermsAndAlerts plan_time={formData.plan_time} />
                </div>
            </div>
            {step !== 2 && (
                <div className="xl:ml-2 p-5">
                    <PricingCard tier={selectedPackage} idx={0} billingCycle={formData.plan_time} noOfPackage={1} />
                </div>
            )}
        </div>
    );
};

const TermsAndAlerts = ({ plan_time }: { plan_time: "monthly" | "yearly" }) => {
    // Get the current date
    const currentDate = new Date();

    // Calculate the end date based on the plan time
    const endDate = new Date(currentDate);
    if (plan_time === "monthly") {
        endDate.setMonth(currentDate.getMonth() + 1); // Add 1 month for monthly plan
    } else if (plan_time === "yearly") {
        endDate.setFullYear(currentDate.getFullYear() + 1); // Add 1 year for yearly plan
    }

    // Format the end date to a readable format (e.g., "MM/DD/YYYY")
    const formattedEndDate = moment(endDate).format("MMM DD, YYYY ");

    return (
        <>
            <div className="mt-6 p-4 xl:pt-0 rounded-md text-sm">
                <p className="font-semibold">Terms of Use (For Subscription Packages)</p>
                <ol className="list-decimal list-outside text-muted-foreground pl-4">
                    <li>Subscription fees are <strong>non-refundable</strong> once the payment is processed.</li>
                    <li>MoreDeals Club reserves the right to <strong>modify or discontinue plans</strong> without prior notice.</li>
                    <li>Users must comply with all <strong>terms and conditions</strong> associated with their selected plan.</li>
                    <li>Subscription benefits are <strong>exclusive to the subscribed user</strong> and cannot be transferred.</li>
                    <li><strong>Package Activation & Validity:</strong></li>
                    <ul className="list-disc list-inside pl-4">
                        <li>Your package will be <strong>activated immediately</strong> after successful payment.</li>
                        <li>The subscription will remain valid until <strong>{formattedEndDate}</strong>.</li>
                        <li><strong>If the package expires, your account will be switched to the free plan,</strong> which might interrupt the benefits you're currently using with the paid plan.</li>
                    </ul>
                </ol>
            </div>
            <div className="mt-4 bg-yellow-50 p-4 rounded-md text-sm">
                <p className="font-semibold text-black">Stay Alert!</p>
                <ol className="list-decimal list-outside pl-4 text-gray-600">
                    <li><strong>Verify package details</strong> before making a payment. Ensure you're selecting the correct plan and billing cycle.</li>
                    <li><strong>Beware of scams!</strong> MoreDeals Club will <strong>never ask for your PIN or payment details</strong> outside our official platform.</li>
                    <li><strong>Do not share your account credentials</strong> with anyone to avoid unauthorized access to your subscription.</li>
                    <li>In case of any <strong>discrepancy in billing or plan activation</strong>, contact MoreDeals Club support immediately.</li>
                </ol>
            </div>
        </>
    );
};


export default UpgradeForm;

