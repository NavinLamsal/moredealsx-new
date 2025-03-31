'use client';
import { useState } from "react";
import { Review } from "@/lib/type/morefood/restaurant";
import { Crown, Edit2 } from "lucide-react";
import moment from "moment";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ReviewForm } from "@/components/form/morefood/reviewForm";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

export const UserReviewCard = ({ review, slug }: { review: Review , slug: string}) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const [isEditMode, setIsEditMode] = useState(false); // State to toggle edit mode
  const [editedComment, setEditedComment] = useState(review.comment); // Store the edited comment

  // Check for small screen
  const isSmallScreen = useIsMobile();

  const handleEdit = () => {
    // Toggle edit mode and pre-fill the comment text
    setIsEditMode(true);
  };

  const handleSave = () => {
    // Handle save logic here (e.g., make API call to save the updated review)
    setIsEditMode(false);
    setIsOpen(false); // Close the modal or bottom sheet
  };

  const handleCancel = () => {
    setIsEditMode(false); // Cancel edit mode
    setEditedComment(review.comment); // Reset to original comment
    setIsOpen(false); // Close the modal or bottom sheet
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white dark:bg-slate-900 flex flex-col gap-2 mb-2 ">
      <h6 className="text-base font-bold ">Your Review</h6>  
      <p className="text-muted-foreground h-12 italic">"{review.comment}"
        <Button variant="ghost" size={"icon"}  onClick={() => setIsOpen(true)}> <Edit2 className="w-4 h-4" /></Button>
      </p>
      <p className="text-sm text-muted-foreground flex items-center gap-1">
        {Array.from({ length: review.rating }, (_, i) => (
          <Crown key={i} fill={"currentcolor"} className="w-4 h-4 text-yellow-500" />
        ))}
        - {`${review.user.first_name} ${review.user.last_name}`} • {moment.utc(review.created_at).local().format("YYYY-MM-DD")}
      </p>
    
      {/* Modal (Dialog for large screens) */}
      {isOpen && !isSmallScreen && (
        <Dialog open={isOpen} onOpenChange={()=>setIsOpen(false)} >
            <DialogContent className="sm:max-w-[425px] md:max-w-md lg:max-w-lg xl:max-w-xl md:max-h-[60%] lg:max-h-[75%] overflow-y-scroll hide-scroll-bar ">
                <Heading title="Edit Review" />
                <ReviewForm initialReview={review} isEditing={true} onSubmit={() => {handleSave()}} onCancel={()=>{handleCancel()}} slug={slug} />
            </DialogContent>
        </Dialog>
      )}

      {/* Bottom Sheet for Small Screens */}
      {isOpen && isSmallScreen && (
        <Sheet open={isOpen} onOpenChange={()=>setIsOpen(false)}>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-scroll p-2">
            <SheetHeader>
                <SheetTitle>Edit Review</SheetTitle>
              </SheetHeader>
                <SheetDescription>
                <ReviewForm  initialReview={review} isEditing={true} onSubmit={() => {handleSave()}} onCancel={()=>{handleCancel()}} slug={slug} />
            </SheetDescription>
        </SheetContent>
        </Sheet>
      )}
    </div>
  );
};
