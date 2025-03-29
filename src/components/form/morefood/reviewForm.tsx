// "use client";
// import RatingInput from "@/components/ui/customInputs/RatingInput";
// import { showToast } from "@/lib/utilities/toastService";
// import { validateNumber, validateRequired } from "@/lib/validation/common";
// import React, { useState, useEffect } from "react";

// export const ReviewForm = ({
//   onSubmit,
//   initialReview,
//   isEditing,
// }: {
//   onSubmit: Function;
//   initialReview?: any;
//   isEditing: boolean;
// }) => {
//   // Local state for form fields
//   const [rating, setRating] = useState<number>(initialReview?.rating || 1);
//   const [comment, setComment] = useState<string>(initialReview?.comment || "");
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   // Handle input changes
//   const handleChange = (field: string, value: string | number) => {
//     if (field === "rating") {
//       setRating(Number(value));
//     } else if (field === "comment") {
//       setComment(value as string);
//     }
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   // Validation function
//   const validate = () => {
//     const tempErrors: { [key: string]: string } = {};

//     // Validate rating
//     if (!rating) {
//       tempErrors.rating = validateNumber(rating, 5, "Rating") || "";
//     }

//     // Validate comment
//     if (!comment.trim()) {
//       tempErrors.comment = validateRequired(comment, "Comment") || "";
//     }

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).every((key) => !tempErrors[key]);
//   };

//   // Handle form submission
//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form before submitting
//     if (!await validate()) {
//       showToast("Please fix the errors in the form.", "error");
//       return;
//     }

//     // If no errors, submit form data
//     console.log("rating", rating);
//     console.log("comment", comment);
//     console.log("initialReview", initialReview);
//     onSubmit({ rating, comment });
//   };

//   // Reset form when editing a review
//   useEffect(() => {
//     if (initialReview) {
//       setRating(initialReview.rating);
//       setComment(initialReview.comment);
//     }
//   }, [initialReview]);

//   return (
//     <form onSubmit={handleFormSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="rating" className="block text-sm font-semibold">
//           Rating (1-5)
//         </label>
//         <RatingInput
//           rating={rating}
//           onRatingChange={(newRating) => handleChange("rating", newRating)}
//         />
//         {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
//       </div>

//       <div>
//         <label htmlFor="comment" className="block text-sm font-semibold">
//           Comment
//         </label>
//         <textarea
//           id="comment"
//           value={comment}
//           onChange={(e) => handleChange("comment", e.target.value)}
//           rows={4}
//           className="w-full p-2 border rounded-md mt-1"
//         />
//         {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           {isEditing ? "Update Review" : "Submit Review"}
//         </button>
//       </div>
//     </form>
//   );
// };


import React, { useState, useEffect } from "react";
import RatingInput from "@/components/ui/customInputs/RatingInput";
import { showToast } from "@/lib/utilities/toastService";
import { validateNumber, validateRequired } from "@/lib/validation/common";
import ImageUploadDropBox from "@/components/ui/customInputs/MultipleImageUpload";

export const ReviewForm = ({ onSubmit, initialReview, isEditing , onCancel }: { onSubmit: Function, initialReview?: any, isEditing: boolean , onCancel: Function}) => {
  const [rating, setRating] = useState<number>(initialReview?.rating || 1);
  const [comment, setComment] = useState<string>(initialReview?.comment || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [images, setImages] = useState<File[]>([]); // Local images state
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]); // Images marked for deletion


  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setErrors((prev) => ({ ...prev, rating: "" }));
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
    setErrors((prev) => ({ ...prev, comment: "" }));
  };

  const handleImagesChange = (newFiles: File[]) => {
    setImages(newFiles);
  };

  const handleDeleteImage = (imageId: string) => {
    // Mark image for deletion instead of deleting immediately
    setImagesToDelete((prev) => [...prev, imageId]);
  };

//   const validate = async () => {
//     const tempErrors: { [key: string]: string } = {};
//     if (rating) {
//       tempErrors.rating = validateNumber(rating, 5, "Rating") || "";
//     } else {
//       tempErrors.comment = validateRequired(comment, "Comment") || "";
//     }

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).every((key) => !tempErrors[key]);
//   };

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};

    // Validate rating
      tempErrors.rating = validateNumber(rating, 5, "Rating") || "";
    // Validate comment
      tempErrors.comment = validateRequired(comment, "Comment") || "";

    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => !tempErrors[key]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!(await validate())) {
      showToast("Please fix the errors in the form.", "error");
      return;
    }

    // Construct the form data including images and images to delete
    const formData = {
      rating,
      comment,
      images, // New images (local)
      imagesToDelete, // Server images to delete
    };

    console.log(formData); // Submit logic (e.g., send to API)
    
    // Example: Handle image deletion and form submission on your server
    try {
      // Delete server images
      for (let imageId of imagesToDelete) {
        await fetch(`/api/delete-image/${imageId}`, { method: "DELETE" });
      }

      // Send new images and other form data
      const response = await fetch("/api/submit-review", {
        method: "POST",
        body: JSON.stringify(formData), // Assuming server expects a JSON body
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      // Handle success (e.g., show a toast or navigate away)
      showToast(isEditing ? "Review updated successfully" : "Review submitted successfully", "success");
      onSubmit(formData);
    } catch (error) {
      showToast("Error submitting review", "error");
    }
  };

  useEffect(() => {
    if (initialReview) {
      setRating(initialReview.rating);
      setComment(initialReview.comment);
      // If there are existing server images, you can set them here
      // For example, initialReview.images could be a list of image URLs
    }
  }, [initialReview]);

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <label htmlFor="rating" className="block text-sm font-semibold">
          Rating (1-5)
        </label>
        <RatingInput
          rating={rating}
          onRatingChange={(number) => handleRatingChange(Number(number))}
        />
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-semibold">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => handleCommentChange(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded-md mt-1"
        />
        {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-semibold">
          Upload Images
        </label>
        <ImageUploadDropBox
          onChange={handleImagesChange} // Handle the new images added
          initialImages={initialReview?.images || []} // Display initial images if editing
          onDeleteImage={handleDeleteImage} // Mark images for deletion instead of deleting immediately
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEditing ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </form>
  );
};
