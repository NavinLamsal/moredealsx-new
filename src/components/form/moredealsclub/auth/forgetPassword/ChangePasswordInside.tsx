"use client";
import { Button } from "@/components/ui/button";
import PasswordField from "@/components/ui/customInputs/PasswordInput";
import { Input } from "@/components/ui/input";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { showToast } from "@/lib/utilities/toastService";
import { removePrefix } from "@/lib/utils";
import {
  validateConfrimPassword,
  validatePassword,
  validateRequired,
} from "@/lib/validation/common";
import { AlertOctagonIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ChangePasswordInsideForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    oldPassword?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [serverErrors, setServerErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const validate = async (fieldValues = formData) => {
    // Explicitly define tempErrors as a dynamic object
    const tempErrors: Record<string, string> = { ...errors };

    if ("oldPassword" in fieldValues) {
      tempErrors.oldPassword = validateRequired(
        fieldValues.oldPassword || "",
        "Old Password"
      );
    }

    if ("password" in fieldValues) {
      tempErrors.password = validatePassword(fieldValues.password || "");
    }

    if ("confirmPassword" in fieldValues) {
      if (formData.password !== "") {
        tempErrors.confirmPassword = validateConfrimPassword(
          formData.password,
          fieldValues.confirmPassword || ""
        );
      }
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => !error);
  };

  const validateField = (name: string, value: string | boolean) => {
    switch (name) {
      case "oldPassword":
        return validateRequired(value as string, "Old Password");
      case "password":
        return validatePassword(value as string);
      case "confirmPassword":
        return validateConfrimPassword(formData.password, value as string);
      default:
        return "";
    }
  };

  // const handleBack = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     localStorage.removeItem("forget_username");
  //     localStorage.getItem("forget_code");
  //     window.location.href = "/auth/forgot-password/";
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await validate())) {
      return;
    }

    try {
      const payload = {
        old_password: formData.oldPassword,
        new_password: formData.password,
        confirm_password: formData.confirmPassword,
      };

      const response = await MoreClubApiClient.post(
        `users/change/password/`,
        payload
        // {
        //   method: "POST",
        //   body: JSON.stringify(payload),
        //   headers: { "Content-Type": "application/json" },
        // }
      );
      const data = response.data;
      showToast("Password Changed Successfully!", "success");
    } catch (error: any) {
      const errorMessage =
        error?.response?.errors?.non_field_errors?.[0] ||
        error?.response?.data?.message ||
        "Something went wrong, please try again";
      setServerErrors(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }

    // dispatch(nextStep());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
      {serverErrors && (
        <p className="flex items-center justify-center w-full text-center text-sm text-red-600 p-2 mb-2 bg-red-200 md:col-span-2 lg:col-span-3">
          <AlertOctagonIcon className="mr-2 h-4 w-4" />
          &nbsp;{serverErrors}&nbsp;
          <AlertOctagonIcon className="ml-2 h-4 w-4 " />
        </p>
      )}
      <div>
        <label>Old Password</label>
        <PasswordField
          name="oldPassword"
          value={formData.oldPassword}
          onChange={(val) => handleChange("oldPassword", val)}
          placeholder="Enter your password"
          error={errors.oldPassword}
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-sm">{errors.oldPassword}</p>
        )}
      </div>
      <div>
        <label>Password</label>
        <PasswordField
          name="password"
          value={formData.password}
          onChange={(val) => handleChange("password", val)}
          placeholder="Enter your password"
          error={errors.password}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>
      <div>
        <label>Confirm Password</label>
        <PasswordField
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(val) => handleChange("confirmPassword", val)}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* <Button variant={"outline"} onClick={handleBack} className='w-full'>Back</Button> */}
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordInsideForm;
