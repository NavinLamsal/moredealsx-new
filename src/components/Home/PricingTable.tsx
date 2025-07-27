import { Package } from "@/lib/redux/slice/moreclub/Pricing";
import React from "react";

const PlanComparisonTable = ({ plans }: { plans: Package[] }) => {
  const features = [
    {
      label: "Price",
      key: "price",
      format: (v: number, p: Package) => `${p.currency_symbol}${v}`,
    },
    { label: "Restaurant Discount (%)", key: "morefood_business_discount" },

    { label: "Salon Discount (%)", key: "salon_business_discount" },
    { label: "Hotel Discount (%)", key: "hotel_business_discount" },
    { label: "Marketplace Discount (%)", key: "marketplace_business_discount" },

    {
      label: "Bulk Mail / Month",
      key: "max_networks_bulk_mail_month",
      format: (v: number | null) => v ?? "Unlimited",
    },
    {
      label: "Bulk SMS / Month",
      key: "max_networks_bulk_sms_month",
      format: (v: number | null) => v ?? "Unlimited",
    },
  ];

  return (
    <section className="my-20 px-4">
      <h2 className="text-center text-3xl font-bold mb-10">Plan Comparison</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[800px] table-fixed border-collapse w-full">
          <thead>
            <tr>
              <th className="p-4 w-60 bg-black text-white text-left font-semibold dark:bg-white dark:text-black">
                Feature
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className={`p-4 w-60 text-left font-semibold bg-black text-white
                   dark:bg-white dark:text-black `}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr
                key={feature.label}
                className="odd:bg-white dark:odd:bg-gray-800  even:bg-gray-50 dark:even:bg-gray-900"
              >
                <td className="p-4 w-60 font-medium">{feature.label}</td>
                {plans.map((plan) => {
                  const value = (plan as any)[feature.key];
                  const display = feature.format
                    ? feature.format(value, plan)
                    : value;
                  return (
                    <td
                      key={plan.id + feature.label}
                      className={`p-4 w-60 align-top ${
                        plan.name.includes("Power Saver")
                          ? "bg-yellow-100 dark:bg-slate-950 font-semibold"
                          : ""
                      }`}
                    >
                      {display}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PlanComparisonTable;
