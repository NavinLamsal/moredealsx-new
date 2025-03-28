import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import React from 'react'
import { Crown } from "lucide-react";

const Reviews = ({slug}:{slug:string}) => {

  const dummyreview:any[]=[
    {
      id:1,
      name:"John Doe",
      review:"Hot, fresh, tasty chicken.",
      date:"08/01/24",
      rating:4.6
    },
    // {
    //   id:2,
    //   name:"John Doe",
    //   review:"Hot, fresh, tasty chicken.",
    //   date:"08/01/24",
    //   rating:4.6
    // },
    // {
    //   id:3,
    //   name:"John Doe",
    //   review:"Hot, fresh, tasty chicken.",
    //   date:"08/01/24",
    //   rating:4.6
    // }
  ]




  return (
    <div className="p-6 border-t">
    <h2 className="text-2xl font-semibold">Rating and Reviews</h2>
    <div className="flex items-center gap-2 mt-2">
      <span className="text-yellow-500 flex items-center gap-1">
        <Star className="w-6 h-6" />
        <span className="text-3xl font-bold">4.6</span>
      </span>
      <p className="text-gray-500">110+ Ratings</p>
    </div>
{dummyreview.map((review)=><ReviewCard comment={review.review} rating={review.rating} author={review.name} date={review.date} key={review.id} />)}
   
    {/* <div className="mt-4 border p-4 rounded-lg shadow-sm">
      <p className="text-gray-700">"Food is so good and ranch is awesome."</p>
      <p className="text-sm text-gray-500">★★★★★ - April B. • 02/21/24</p>
    </div>
    <div className="mt-4 border p-4 rounded-lg shadow-sm">
      <p className="text-gray-700">"Hot, fresh, tasty chicken."</p>
      <p className="text-sm text-gray-500">★★★★★ - Erin A. • 08/01/24</p>
    </div> */}
    
    <div className="text-center mt-4">
      <Button variant="outline">Show more</Button>
    </div>
  </div>
  )
}

export default Reviews


export const ReviewCard = ({ comment, rating, author, date }: { comment: string; rating: number; author: string; date: string }) => {
  return (
    <div className="mt-4 border p-4 rounded-lg shadow-sm">
      <p className="text-gray-700">"{comment}"</p>
      <p className="text-sm text-gray-500 flex items-center gap-1">
        {Array.from({ length: rating }, (_, i) => (
          <Crown key={i} fill={"currentcolor"} className="w-4 h-4 text-yellow-500" />
        ))}
        - {author} • {date}
      </p>
    </div>
  );
};


