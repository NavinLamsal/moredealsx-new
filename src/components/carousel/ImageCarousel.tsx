"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import React, { useRef } from "react";

interface ImageItem {
  id: number;
  image: string;
}

interface ImageCarouselProps {
  images: ImageItem[];
  title?: string;
  description?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title, description }) => {
  const swiperRef = useRef<any>(null);


  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();

  return (
    <div className="max-w-4xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl relative">
      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
      <button onClick={prevSlide} className="absolute top-1/2 left-4 z-10 bg-transparent text-white px-2 py-2 rounded-full shadow-md">
        ❮
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 z-10 bg-transparent text-white px-2 py-2 rounded-full shadow-md">
        ❯
      </button>
      </>
      )}

      {/* Swiper Carousel */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        className="rounded-2xl shadow-lg"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        speed={800}
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <ImageContainer image={img.image} title={title} description={description} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

interface ImageContainerProps {
  image: string;
  title?: string;
  description?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ image, title, description }) => (
  <div
    className="relative flex flex-row items-center  rounded-2xl min-h-48 md:min-h-80 bg-cover bg-center max-w-4xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 3xl:min-h-[24rem] 4xl:min-h-[28rem]"
    // style={{ backgroundImage: `url(${image})` }}
  >
    <div
    className="absolute inset-0 bg-cover bg-center blur-md scale-125 backdrop-blur-md backdrop-brightness-80"
    style={{ backgroundImage: `url(${image})` }}
  />

    <img src={image} alt={title || "Event"} className=" object-contain mx-auto h-48 md:h-80 3xl:h-[24rem] 4xl:h-[28rem] z-10" />

    <div className="absolute left-0 bottom-0 ml-4 text-white flex-col z-20 bg-black/50 p-4 rounded-lg hidden lg:flex">
      {title && <span className="text-base lg:text-xl font-bold line-clamp-2">{title}</span>}
      {description && <p className="mt-2 text-sm line-clamp-2">{description}</p>}
    </div>
  </div>
);




export default ImageCarousel;

