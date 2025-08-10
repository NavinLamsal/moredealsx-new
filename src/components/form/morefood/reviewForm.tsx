import React, { useState, useEffect } from "react";
import RatingInput from "@/components/ui/customInputs/RatingInput";
import { showToast } from "@/lib/utilities/toastService";
import { validateNumber, validateRequired } from "@/lib/validation/common";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import MoreClubApiClient from "@/lib/axios/moreclub/MoreClubApiClient";

export const ReviewForm = ({ onSubmit, initialReview, isEditing , onCancel , slug }: { onSubmit: Function, initialReview?: any, isEditing: boolean , onCancel: Function , slug: string}) => {
  const [rating, setRating] = useState<number>(initialReview?.rating || 1);
  const [comment, setComment] = useState<string>(initialReview?.comment || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
 
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setErrors((prev) => ({ ...prev, rating: "" }));
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
    setErrors((prev) => ({ ...prev, comment: "" }));
  };



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
  
    setLoading(true);
    const reviewData = { rating, comment };
  
    try {
      if (isEditing) {
  
        const reviewUpdated = initialReview.rating !== rating || initialReview.comment !== comment;

        if (reviewUpdated) {
          await MoreClubApiClient.patch(`reviews/restaurant/${slug}/review/${initialReview.id}/`, reviewData);
        }      
        showToast("Review updated successfully", "success");

      } else {
        await MoreClubApiClient.post(`reviews/restaurant/${slug}/reviews/`, reviewData);
        showToast("Review submitted successfully", "success");
      }
      queryClient.invalidateQueries({ queryKey: ["user-review", slug] }),
      queryClient.invalidateQueries({ queryKey: ["User Review list"] }),      
      onSubmit();
    } catch (err) {
      showToast("Error uploading your changes", "error");
    }finally{
      setLoading(false);
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

      <div className="flex justify-end gap-2">
        <Button type="button" variant={"morefoodOutline"} 
        onClick={(e)=>{e.preventDefault(); onCancel()}}
        className="">
            Cancel
        </Button>
        <Button
          type="submit"
          variant={"morefoodPrimary"}
          className=""
        >
          {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}{isEditing ? "Update Review" : "Submit Review"}
        </Button>
      </div>
    </form>
  );
};
