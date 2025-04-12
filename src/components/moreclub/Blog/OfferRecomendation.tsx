import BlogCard from '@/components/cards/BlogCard';
import OfferCard from '@/components/cards/OfferCard';
import SupportCard from '@/components/cards/SupportCard';
import { fetchBlogs, fetchRecommendationBlogs, fetchRecommendationOffers } from '@/lib/action/PubilcCommon';
import { Offer } from '@/lib/action/PublicCommonClient';
import { Blog } from '@/lib/type/CommonType';
import React from 'react';

interface OfferRecommendationProps {
  includeSupport?: boolean;
  title?: string
}

export default async function OfferRecommendation({ title}: OfferRecommendationProps ) {
  try {
    const bloglist = await fetchRecommendationOffers(1, title );

    // ✅ Ensure bloglist.data is an array before mapping
    if (!bloglist?.data || !Array.isArray(bloglist.data)) {
      return <p className="text-center text-gray-500">No blog recommendations available.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">
        {/* ✅ Blog List (Fixed Slice Issue) */}
        {bloglist.data.slice(0, 6).map((blog: Offer) => (
          <OfferCard offer={blog} key={blog.id} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return <p className="text-center text-gray-500">Failed to load Offer recommendations.</p>;
  }
}
