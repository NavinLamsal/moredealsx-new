"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const PhotoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',
      'https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/restaurants/banner/hero1_mbhjl2',

      // Add more images here
  ];

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  return (
    <Card className="mt-4">
        <CardHeader>

            <CardTitle>Gallery</CardTitle>
        </CardHeader>
        <CardContent>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              alt={`Gallery Image ${index + 1}`}
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>

       {/* Swiper Lightbox */}
       {isOpen && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-75 flex justify-center items-center z-50">
          <Swiper
            initialSlide={currentImageIndex}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
            className="w-full max-w-3xl"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
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
        </CardContent>
    </Card>

  );
};

export default PhotoGallery;
