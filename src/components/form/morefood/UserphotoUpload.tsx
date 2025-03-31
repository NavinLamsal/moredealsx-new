import React, { useState } from "react";
import { showToast } from "@/lib/utilities/toastService";
import ImageUploadDropBox from "@/components/ui/customInputs/MultipleImageUpload";
import MoreFoodApiClient from "@/lib/axios/morefood/MoreFoodApiClient";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export const UserPhotoUpload = ({ onSubmit , onCancel , slug }: { onSubmit: Function, onCancel: Function , slug: string}) => {
  const [imageError, setImageError] = useState<string>("");
  const [images, setImages] = useState<File[]>([]); 
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  
  const handleImagesChange = (newFiles: File[]) => {
    setImages(newFiles);
    setImageError("");
  };

  const handleDeleteImage = (imageId: string) => {
    // Mark image for deletion instead of deleting immediately
    setImagesToDelete((prev) => [...prev, imageId]);
  };


 

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!images || images.length === 0) {
      setImageError("Please upload at least one image.");
      showToast("Please fix the errors in the form.", "error");
      return;
    }
    
    setLoading(true);
    const imageData = { images };
  
    try {
        if (images.length > 0) {
          await MoreFoodApiClient.post(`restaurants/${slug}/user-upload-gallery/`, imageData,{
            headers: {
              "Content-Type": "multipart/form-data",
            }
          });
        }
        showToast("Image uploaded successfully", "success");
        onSubmit();
      }
    catch (err) {
      showToast("Error uploading your images", "error");
    }finally{
      setLoading(false);
    }
  };
  
  
  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label htmlFor="images" className="block text-sm font-semibold">
          Upload Images
        </label>
        <ImageUploadDropBox
          onChange={handleImagesChange} // Handle the new images added
          onDeleteImage={handleDeleteImage} // Mark images for deletion instead of deleting immediately
        />
        {imageError && <p className="text-red-500">{imageError}</p>}
      </div>

      <div className="flex justify-end gap-2">
      <Button
          type="button"
          onClick={(e)=>{e.preventDefault(); onCancel()}}
          variant="morefoodOutline"
          className="px-4 py-2 "
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="morefoodPrimary"
          className="px-4 py-2 "
        >
          {loading && <Loader className="mr-2 w-4 h-4 animate-spin" />} Upload
        </Button>
      </div>
    </form>
  );
};
