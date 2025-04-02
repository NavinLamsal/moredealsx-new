import React from "react";
import Heading from '@/components/ui/heading';
import UserReviewList from "@/components/morefood/restaurant/review/UserReviewsList";

const ReviewPage = async() => { 

  return (
    <><div>
    <Heading title="Your Reviews"/>

    <p className="text-muted-foreground">
      Here&apos;s a list of your reviews!
    </p>
  </div>
     
      <UserReviewList />
     
    </>
  );
};

export default ReviewPage;
