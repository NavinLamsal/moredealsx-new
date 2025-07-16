import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchBusinessTypes } from "@/lib/action/moreClub/Business";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";
import { businessQrinfoUpdate } from "@/lib/redux/slice/moreclub/BusinessSlice";
import { Loader2 } from "lucide-react";
import { showToast } from "@/lib/utilities/toastService";

const BusinessTypes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const businessTypes = useSelector(
    (state: RootState) => state.business.businessTypeList
  );

  const businessQRInfo = useSelector(
    (state: RootState) => state.business.businessQRInfo
  );
  const [isAdding, setIsAdding] = useState(false);

  const [businessData, setBusinessData] = useState(
    businessQRInfo.length > 0
      ? businessQRInfo.map(
          ({ business_type_id, discount, affilated_discount }) => ({
            business_type_id,
            discount,
            affilated_discount: affilated_discount || "",
          })
        )
      : [{ business_type_id: "", discount: "", affilated_discount: "" }]
  );

  // Fetch Business Types on Mount
  useEffect(() => {
    dispatch(fetchBusinessTypes());
  }, [dispatch]);

  const handleBusinessTypeChange = (index: number, value: string) => {
    const selected = businessTypes.find((b) => b.id === value);
    if (selected) {
      const updatedBusinessData = [...businessData];
      updatedBusinessData[index] = {
        business_type_id: selected.id,
        discount: "",
        affilated_discount: "",
      };
      setBusinessData(updatedBusinessData);
    }
  };

  const handleDiscountChange = (index: number, value: string) => {
    const updatedBusinessData = [...businessData];
    updatedBusinessData[index] = {
      ...updatedBusinessData[index],
      discount: value,
    };
    setBusinessData(updatedBusinessData);
  };

  const handleAffiliatedDiscountChange = (index: number, value: string) => {
    const updatedBusinessData = [...businessData];
    updatedBusinessData[index] = {
      ...updatedBusinessData[index],
      affilated_discount: value,
    };
    setBusinessData(updatedBusinessData);
  };

  const addMoreBusiness = () => {
    setBusinessData([
      ...businessData,
      { business_type_id: "", discount: "", affilated_discount: "" },
    ]);
  };

  const handleSubmit = async (index: number) => {
    const businessEntry = businessData[index];
    const isExisting = businessQRInfo.some(
      (qr) => qr.business_type_id === businessEntry.business_type_id
    );

    try {
      let response;
      setIsAdding(true);
      if (isExisting) {
        // ✅ PATCH request to update existing business type
        response = await MoreClubApiClient.patch(
          `business/types/discount/update/`,
          businessEntry
        );
        showToast("Business discount updated successfully", "success");
      } else {
        // ✅ POST request to create a new business type
        response = await MoreClubApiClient.post(
          "business/types/discount/",
          businessEntry
        );
        showToast("Business discount added successfully", "success");
      }
      dispatch(businessQrinfoUpdate(response.data.data));
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.errors?.non_field_errors[0] ||
        err.response?.data?.message ||
        "Something Went Wrong";
      showToast(errorMessage, "error");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="grid grid-cols-1 w-full max-w-lg lg:max-w-2xl xl:max-w-3xl">
      <div>
        <Heading title={"Manage Business Types"} />
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Let's wrap up the registration process. Fill in your Business details
          and make your business profile.
        </p>
      </div>

      <form className="flex flex-col gap-4 p-2">
        {businessData.map((business, index) => {
          const isExisting = businessQRInfo.some(
            (qr) => qr.business_type_id === business.business_type_id
          );

          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center"
            >
              {/* Business Type Selection */}
              <div>
                <label className="block font-medium mb-1">Business Types</label>
                <Select
                  value={business.business_type_id}
                  onValueChange={(value) =>
                    handleBusinessTypeChange(index, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes
                      .filter(
                        (type) =>
                          !businessData.some(
                            (data, idx) =>
                              data.business_type_id === type.id && idx !== index
                          )
                      )
                      .map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Business Discount Input */}
              <div>
                <label className="block font-medium mb-1">
                  Business Discount (%)
                </label>
                <Input
                  type="text"
                  value={business.discount}
                  className="p-2 border rounded w-full"
                  onChange={(e) => handleDiscountChange(index, e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Affiliated Discount (%)
                </label>
                <Input
                  type="text"
                  value={business.affilated_discount}
                  className="p-2 border rounded w-full"
                  onChange={(e) =>
                    handleAffiliatedDiscountChange(index, e.target.value)
                  }
                />
              </div>

              {/* Individual Submit Button */}
              <div className="flex w-full gap-2 col-span-1 sm:col-span-2 justify-end">
                {!isExisting && (
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(index);
                    }}
                  >
                    Remove
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(index);
                  }}
                >
                  {isExisting ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          );
        })}

        {!(businessTypes.length === businessData.length) && (
          <Button
            type="button"
            variant={"destructive"}
            onClick={(e) => {
              e.preventDefault();
              addMoreBusiness();
            }}
          >
            {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Add
            New
          </Button>
        )}
      </form>
    </div>
  );
};

export default BusinessTypes;
