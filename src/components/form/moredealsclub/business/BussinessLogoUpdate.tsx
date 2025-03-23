"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUploadDropBox from "@/components/ui/customInputs/ImageUploads";
import useMoredealsClient from "@/lib/axios/moredealsClient";
import { showToast } from "@/lib/utilities/toastService";
import { Loader2 } from "lucide-react";

const BusinessLogoUpload = ({ initialLogoUrl }: { initialLogoUrl?: string }) => {
  const axios = useMoredealsClient();
  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(initialLogoUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setLogo(file);
    setLogoUrl(undefined); // Hide previous image when a new file is selected
    setError(file ? null : "Business logo is required.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logo) {
      setError("Business logo is required.");
      return;
    }

    const formData = new FormData();
    formData.append("business_logo", logo);

    try {
      setLoading(true);
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}business/profile/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLogoUrl(response.data.logo_url); // Update with new uploaded image URL
      setLogo(null);
      showToast("Business logo uploaded successfully", "success");
    } catch (err: any) {
      showToast("Error uploading business logo", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-lg font-semibold mb-2">Business Logo</h2>
      <ImageUploadDropBox
        onChange={handleFileChange}
        initialImage={logo ? URL.createObjectURL(logo) : logoUrl} // Show existing or new image
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {logo && 
      <Button type="submit" className="mt-4 w-full">{loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} Upload</Button>
      }
    </form>
  );
};

export default BusinessLogoUpload;
