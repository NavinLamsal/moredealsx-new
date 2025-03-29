import { Crown } from "lucide-react";
import React from "react";

interface RatingInputProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ rating, onRatingChange }) => {
  const handleClick = (newRating: number) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

    return (
      <div className="flex space-x-1 justify-center ">
        {[1, 2, 3, 4, 5].map((star) => (
          <Crown
            key={star}
            onClick={() => handleClick(star)}
            className={`w-10 h-10 cursor-pointer ${
              star <= rating ? "text-[#FB8C00]" : "text-[#64748b]"
            }`}
            fill={star <= rating ? "#FB8C00" : "#64748b"}
          />
        ))}
      </div>
    );
};

export default RatingInput;
