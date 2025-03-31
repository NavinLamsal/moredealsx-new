import { Button } from '@/components/ui/button'
import React from 'react'
import { Crown } from "lucide-react";
import Heading from '@/components/ui/heading';
import Link from 'next/link';
import moment from 'moment';

const Reviews = ({ slug }: { slug: string }) => {

  const dummyreview: any[] = [
    {
      id: 1,
      name: "John Doe",
      review: "Hot, fresh, tasty chicken.",
      date: "08/01/24",
      rating: 4.6
    },
  ]


  return (
    <div className="px-2 sm:px-6  border-t">
      <Heading title="Reviews and Ratings" />
      <div className='grid grid-cols-12 gap-4 mt-3'>
      <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-center  gap-2 ">
        <span className="text-yellow-500 flex items-center gap-1">
          <Crown fill={"currentcolor"} className="w-6 h-6" />
          <span className="text-lg lg:text-3xl font-bold">4.6</span>
        </span>
        <p className="text-sm lg:text-base text-muted-foreground">110+ Ratings</p>
      </div>
      <div className='col-span-12 md:col-span-8 flex flex-col  gap-4'>
      {dummyreview.map((review) => <ReviewCard comment={review.review} rating={review.rating} author={review.name} date={review.date} key={review.id} />)}

      <div className="text-center mt-4">
        <Link href={`/morefood/restaurant/${slug}/reviews`}>
        <Button variant="outline">Show more</Button>
        </Link>
      </div>

      </div>

      </div>
    </div>
  )
}

export default Reviews


export const ReviewCard = ({ comment, rating, author, date }: { comment: string; rating: number; author: string; date: string }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white dark:bg-slate-900 flex flex-col gap-4">
      <p className="text-muted-foreground line-clamp-2 h-12 italic">"{comment}"</p>
      <p className="text-sm text-muted-foreground flex items-center gap-1">
        {Array.from({ length: rating }, (_, i) => (
          <Crown key={i} fill={"currentcolor"} className="w-4 h-4 text-yellow-500" />
        ))}
        - {author} • {moment.utc(date).local().format("DD MMM,YY")}
      </p>
    </div>
  );
};



