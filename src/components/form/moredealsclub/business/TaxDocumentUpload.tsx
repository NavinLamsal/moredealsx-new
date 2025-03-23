"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUploadDropBox from "@/components/ui/customInputs/ImageUploads";
import useMoredealsClient from "@/lib/axios/moredealsClient";
import { showToast } from "@/lib/utilities/toastService";
import { Loader2 } from "lucide-react";

const TaxDocumentUpload = ({ initialTaxUrl }: { initialTaxUrl?: string }) => {
  const axios = useMoredealsClient();
  const [taxDocument, setTaxDocument] = useState<File | null>(null);
  const [taxUrl, setTaxUrl] = useState<string | undefined>(initialTaxUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setTaxDocument(file);
    setTaxUrl(undefined);
    setError(file ? null : "Tax document is required.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taxDocument) {
      setError("Tax document is required.");
      return;
    }

    const formData = new FormData();
    formData.append("business_tax_document", taxDocument);

    try {
      setLoading(true);
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}business/profile/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTaxUrl(response.data.tax_url);
      setTaxDocument(null);
      showToast("Tax document uploaded successfully", "success");
    } catch (err: any) {
      showToast("Error uploading tax document", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-lg font-semibold mb-2">Tax Document</h2>
      <ImageUploadDropBox
        onChange={handleFileChange}
        initialImage={taxDocument ? URL.createObjectURL(taxDocument) : taxUrl}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {taxDocument && 
      <Button type="submit" className="mt-4 w-full">{loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} Upload</Button>
      }
    </form>
  );
};

export default TaxDocumentUpload;
