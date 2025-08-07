"use client";
import { Button } from "@/components/ui/button";
import MapboxComponent from "@/components/ui/customInputs/AddressInput";
import PhoneNumberInput from "@/components/ui/customInputs/PhoneNumberInput";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import { fetchBusinessData } from "@/lib/action/moreClub/Business";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import useMoredealsClient from "@/lib/axios/moredealsClient";
import { AppDispatch } from "@/lib/redux/store";
import { showToast } from "@/lib/utilities/toastService";
import {
  validateEmail,
  validatePhoneNumber,
  validateRequired,
} from "@/lib/validation/common";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const BasicInfoForm = ({ businessData }: { businessData: any }) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialFormData = {
    BusinessName: businessData?.business_name ?? "",
    BusinessRegistration: businessData?.business_registration_number ?? "",
    BusinessEmail: businessData?.business_email ?? "",
    BusinessPhone: businessData?.business_phone ?? "",
    BusinessLocation: businessData?.business_address ?? "",
    lat: businessData?.lat ?? "",
    lng: businessData?.lng ?? "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [hasChanged, setHasChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  // const { BusinessName, BusinessRegistration, BusinessEmail, BusinessPhone } = useSelector((state: RootState) => state.businessRegistration);
  const [errors, setErrors] = useState<{
    BusinessName?: string;
    BusinessRegistration?: string;
    BusinessEmail?: string;
    BusinessPhone?: string;
    BusinessLocation?: string;
  }>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [field]: value };
      setHasChanged(
        JSON.stringify(updatedData) !== JSON.stringify(initialFormData)
      );
      return updatedData;
    });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const handlePhoneNumberChange = (data: any) => {
    handleChange("BusinessPhone", data.fullNumber);
  };

  const handlePlaceSelected = async (
    coordinates: {
      lat: number;
      lon: number;
    },
    placeName: string
  ) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        BusinessLocation: placeName, // Corrected typo
        lat: coordinates.lat.toString(),
        lng: coordinates.lon.toString(),
      };
      setHasChanged(
        JSON.stringify(updatedData) !== JSON.stringify(initialFormData)
      );
      return updatedData;
    });

    setErrors({
      ...errors,
      BusinessLocation: validateField("BusinessLocation", placeName),
    });
  };

  const validate = async (fieldValues = formData) => {
    // Explicitly define tempErrors as a dynamic object
    const tempErrors: Record<string, string> = { ...errors };

    if ("BusinessName" in fieldValues) {
      tempErrors.BusinessName = validateRequired(
        fieldValues.BusinessName || "",
        "Business Name"
      );
    }

    if ("BusinessRegistration" in fieldValues) {
      tempErrors.BusinessRegistration = validateRequired(
        fieldValues.BusinessRegistration || "",
        "Business Registration"
      );
    }

    if ("BusinessPhone" in fieldValues) {
      if (fieldValues.BusinessPhone !== "") {
        tempErrors.BusinessPhone = validatePhoneNumber(
          fieldValues.BusinessPhone || ""
        );
      }
    }

    if ("BusinessLocation" in fieldValues) {
      tempErrors.BusinessLocation = validateRequired(
        fieldValues.BusinessLocation || "",
        "Business Location"
      );
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => !error);
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "BusinessName":
        return validateRequired(value, "Business Name");
      case "BusinessRegistration":
        return validateRequired(value, "Registration No.");
      case "BusinessLocation":
        return validateRequired(value, "Business Location");
      case "BusinessPhone":
        if (value !== "") {
          return validatePhoneNumber(value);
        } else {
          return "";
        }
      case "BusinessPhone":
        if (value !== "") {
          return validateEmail(value);
        } else {
          return "";
        }
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanged) {
      return;
    }

    if (!(await validate())) {
      //   showToast("Please fix the errors in the form.", "error");
      return;
    }

    try {
      const data = {
        business_name: formData.BusinessName,
        business_registration_number: formData.BusinessRegistration,
        business_email: formData.BusinessEmail,
        business_phone: formData.BusinessPhone,
        business_address: formData.BusinessLocation,
        lat: formData.lat,
        lng: formData.lng,
      };

      setLoading(true);
      const response = await MoreClubApiClient.patch(`business/profile/`, data);
      dispatch(fetchBusinessData({ fetchForce: true }));

      showToast("Business profile updated successfully", "success");
    } catch (err: any) {
      showToast(
        `${
          err.response?.data?.errors?.non_field_errors[0] ||
          err.response?.data?.message ||
          "Error creating business profile"
        }`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 w-full max-w-lg lg:max-w-2xl xl:max-w-3xl">
      <div>
        <Heading title={"Business Profile"} />
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Let's wrap up the registration process. Fill in your Business details
          and make your business profile. You will be a part of MoreDealsClub
          like never before!.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
        <div>
          <label className="block font-medium mb-1">Business Name</label>
          <Input
            type="text"
            name="BusinessName"
            value={formData.BusinessName}
            onChange={(e) => handleChange("BusinessName", e.target.value)}
            placeholder="Business Name"
            className={`p-2 border rounded w-full 
    `}
          />
          {errors.BusinessName && (
            <p className="text-red-500 text-sm">{errors.BusinessName}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Registration Number</label>
          <Input
            type="text"
            name="BusinessRegistration"
            value={formData.BusinessRegistration}
            onChange={(e) =>
              handleChange("BusinessRegistration", e.target.value)
            }
            placeholder="Registration Number"
            className={`p-2 border rounded w-full 
    `}
          />
          {errors.BusinessRegistration && (
            <p className="text-red-500 text-sm">
              {errors.BusinessRegistration}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Business Email</label>
          <Input
            type="email"
            name="BusinessEmail"
            value={formData.BusinessEmail}
            onChange={(e) => handleChange("BusinessEmail", e.target.value)}
            placeholder="m@example.com"
            className={`p-2 border rounded w-full ${
              errors.BusinessEmail ? "border-red-500" : ""
            }`}
          />
          {errors.BusinessEmail && (
            <p className="text-red-500 text-sm">{errors.BusinessEmail}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            Business Contact Number
          </label>

          <PhoneNumberInput
            onChange={handlePhoneNumberChange}
            initialValue={formData.BusinessPhone}
          />
          {errors.BusinessPhone && (
            <p className="text-red-500 text-sm">{errors.BusinessPhone}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          {errors.BusinessLocation && (
            <p className="text-red-500 text-sm">{errors.BusinessLocation}</p>
          )}
          <MapboxComponent
            onPlaceSelected={handlePlaceSelected}
            initialLat={parseFloat(formData.lat)}
            initialLng={parseFloat(formData.lng)}
            initialAddress={formData.BusinessLocation}
            height="200px"
          />
        </div>

        {hasChanged && (
          <Button type="submit" className="w-full">
            {loading ? <Loader loaderColor="#000000" /> : "Save Changes"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default BasicInfoForm;
