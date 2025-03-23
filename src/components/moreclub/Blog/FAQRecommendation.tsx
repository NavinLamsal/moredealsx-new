import BlogCard from '@/components/cards/BlogCard';
import SupportCard from '@/components/cards/SupportCard';
import { fetchBlogs } from '@/lib/action/PubilcCommon';
import { Blog } from '@/lib/type/CommonType';
import React from 'react';

interface FAQRecommendationProps {
  includeSupport?: boolean;
}

export default async function FAQRecommendation({ includeSupport = false }: FAQRecommendationProps) {
  try {
    const bloglist = await fetchBlogs(1);

    // ✅ Ensure bloglist.data is an array before mapping
    if (!bloglist?.data || !Array.isArray(bloglist.data)) {
      return <p className="text-center text-gray-500">No blog recommendations available.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4">
        {/* ✅ Conditional Support Card */}
        {includeSupport && (
          <SupportCard
            title="Need Help?"
            description="Our support team is here to help you 24/7. Reach out to us anytime and we'll be happy to assist."
            buttonText="Get Support"
            buttonLink="/support"
          />
        )}

        {/* ✅ Blog List (Fixed Slice Issue) */}
        {bloglist.data.slice(0, includeSupport ? 5 : 6).map((blog: Blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return <p className="text-center text-gray-500">Failed to load blog recommendations.</p>;
  }
}
