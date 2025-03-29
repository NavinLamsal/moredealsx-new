"use client";
import { useState } from "react";
import { Review } from "@/lib/type/morefood/restaurant";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ReviewForm } from "@/components/form/morefood/reviewForm";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

export const ReviewUpload = ({slug}:{slug:string}) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const [isEditMode, setIsEditMode] = useState(false); // State to toggle edit mode
  const [editedComment, setEditedComment] = useState(""); // Store the edited comment

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
    setEditedComment(""); // Reset to original comment
    setIsOpen(false); // Close the modal or bottom sheet
  };

  return (
    <>
      <Button variant={"morefoodPrimary"} size={"sm"} className="" onClick={() => setIsOpen(true)}>Add Review</Button>
    
      {/* Modal (Dialog for large screens) */}
      {isOpen && !isSmallScreen && (
        <Dialog open={isOpen} onOpenChange={()=>setIsOpen(false)} >
            <DialogContent className="sm:max-w-[425px] md:max-w-md lg:max-w-lg xl:max-w-xl md:max-h-[60%] lg:max-h-[75%] overflow-y-scroll hide-scroll-bar ">
                <Heading title="Edit Review" />
                <ReviewForm isEditing={false} onSubmit={() => {handleSave()}} onCancel={() => {handleCancel()}}/>
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
                <ReviewForm  isEditing={false} onSubmit={() => {handleSave()}} onCancel={() => {handleCancel()}} />
            </SheetDescription>
        </SheetContent>
        </Sheet>
      )}
    </>
  );
};
