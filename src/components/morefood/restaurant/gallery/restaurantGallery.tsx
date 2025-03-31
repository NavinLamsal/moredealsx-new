"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useFetchRestaurant } from "@/lib/action/morefood/restaurantlist";

const RestaurantGallery = ({ slug }: { slug: string }) => {
  const { fetchRestaurantGallery } = useFetchRestaurant();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    data: uploads,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["restaurant gallery", slug],
    queryFn: ({ pageParam = 1 }) => fetchRestaurantGallery(slug, pageParam, 20), 
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page_number + 1;
      return nextPage <= lastPage.meta.total_pages ? nextPage : null;
    },
    initialPageParam: 1,
  });

  const images = uploads?.pages.flatMap((page) => page.data) || [];

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.length === 0       &&   <div className="relative border-2 border-dashed p-4 min-h-48 flex items-center justify-center rounded cursor-pointer text-center border-gray-300 w-full col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5">
            <p>No images Uploaded yet</p>
          </div>
        }
        {images.map((image, index) => (
          <div key={image.id} className="relative">
            <Image
              src={image.image}
              alt={`Gallery Image ${index + 1}`}
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center mt-3">

          <Button
            variant={"morefoodPrimary"}
            size={"sm"}
            onClick={() => fetchNextPage()}
            className=""
          >
            Load More
          </Button>
        </div>
      )}

      {isFetchingNextPage && <p className="text-center">Loading more images...</p>}

      {/* Swiper Lightbox */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <Swiper
            initialSlide={currentImageIndex}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
            className="w-full max-w-3xl"
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id}>
                <img
                  src={image.image}
                  alt={`Lightbox Image ${index + 1}`}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default RestaurantGallery;

