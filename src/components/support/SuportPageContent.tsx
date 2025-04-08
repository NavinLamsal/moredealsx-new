"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import BlogCard from '../cards/BlogCard';
import { Blog } from '@/lib/type/CommonType';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBlogs } from '@/lib/action/PubilcCommon';
import { useSearchParams } from 'next/navigation';

const SuportPageContent = () => {
    const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  // Ref for Intersection Observer
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Creating a script element to add the Tawk.to script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://embed.tawk.to/66e6f46750c10f7a00aa6185/1i7r2le2k';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Append the script to the body or any other suitable element
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["blog list", searchQuery,],
    queryFn: ({ pageParam = 1 }) => fetchBlogs(pageParam, searchQuery),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.links.next ? lastPage.meta.page_number + 1 : null;
    },
    initialPageParam: 1, // ✅ Required for Infinite Query
    staleTime: 100,
    enabled: true,
  });

  // Infinite Scroll Observer
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage || !hasNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsFetchingNextPage(true);
          fetchNextPage().finally(() => setIsFetchingNextPage(false));
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // Refetch on search query change
  useEffect(() => {
    refetch();
  }, [searchQuery, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading articles...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p>Oop`s something went wrong</p>
      // <UniversalErrorbox
      //   message="Something went wrong while fetching the data"
      //   retry={["blog list", searchQuery]}
      // />
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
  
      {/* Blog Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {data?.pages.map((page: any) =>
          page?.data.map((blog: Blog, index:number) => (
            <div
              key={blog.id}
              ref={index === page.data.length - 1 ? lastPostRef : null}
              className="animate-fadeIn"
            >
              <BlogCard
                blog={blog}
              />
            </div>
          ))
        )}
      </div>

      {/* Loading More */}
      {isFetchingNextPage && (
        <div className="text-center mt-4 text-gray-600">Loading more articles...</div>
      )}
    </div>
  );
};


export default SuportPageContent
