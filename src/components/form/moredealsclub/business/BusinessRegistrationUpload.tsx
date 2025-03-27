"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUploadDropBox from "@/components/ui/customInputs/ImageUploads";
import useMoredealsClient from "@/lib/axios/moredealsClient";
import { showToast } from "@/lib/utilities/toastService";
import { Loader2 } from "lucide-react";
import { fetchBusinessData } from "@/lib/action/moreClub/Business";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";

const BusinessDocumentUpload = ({ initialDocumentUrl }: { initialDocumentUrl?: string }) => {
  const axios = useMoredealsClient();
  const dispatch = useDispatch<AppDispatch>();
  const [document, setDocument] = useState<File | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | undefined>(initialDocumentUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setDocument(file);
    setDocumentUrl(undefined);
    setError(file ? null : "Business document is required.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!document) {
      setError("Business document is required.");
      return;
    }

    const formData = new FormData();
    formData.append("business_document", document);

    try {
      setLoading(true);
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}business/profile/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDocumentUrl(response.data.document_url);
      setDocument(null);
       dispatch(fetchBusinessData({ fetchForce: true }));
      showToast("Business document uploaded successfully", "success");
    } catch (err: any) {
      showToast("Error uploading business document", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-lg font-semibold mb-2">Business Document</h2>
      <ImageUploadDropBox
        onChange={handleFileChange}
        initialImage={document ? URL.createObjectURL(document) : documentUrl}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {document && 
      
      <Button type="submit" className="mt-4 w-full">{loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} Upload</Button>
      }
    </form>
  );
};

export default BusinessDocumentUpload;
