import React from "react";
import {  CheckCircle2Icon, Circle, CircleDot } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  { title: "Personal information", description: "Vitae sed mi luctus laoreet." },
  { title: "User Credential", description: "Cursus semper viverra facilisis et et some more." },
  { title: "Security", description: "Penatibus eu quis ante." },
];

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex flex-col gap-4 relative p-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start relative">
          {/* Vertical Connector Line */}
          {index !== steps.length - 1 && (
            <div
              className={`absolute left-3 top-6 h-full w-0.5 ${
                index < currentStep - 1 ? "bg-indigo-500" : "bg-gray-300"
              }`}
            />
          )}

          {/* Step Icon */}
          <div className="relative z-10 flex items-center justify-center">
            {index < currentStep ? (
              <CheckCircle2Icon className="w-6 h-6 text-indigo-600 bg-white rounded-full" />
            ) : index === currentStep ? (
              <CircleDot className="w-6 h-6 text-indigo-500 bg-white rounded-full" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400 bg-white rounded-full" />
            )}
          </div>

          {/* Step Content */}
          <div className="ml-6">
            <h3
              className={`text-sm font-semibold ${
                index < currentStep ? "text-gray-900" : index === currentStep ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              {step.title}
            </h3>
            <p className="text-xs text-gray-500">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
