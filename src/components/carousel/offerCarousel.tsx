"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';

interface Offer {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface OfferCarouselProps {
  offers: Offer[];
}

const OfferCarousel: React.FC<OfferCarouselProps> = ({ offers }) => {
  const swiperRef = useRef<any>(null);

  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();

  return (
    <div className="max-w-4xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl relative">
      <button onClick={prevSlide} className="absolute top-1/2 left-4 z-10 bg-transparent text-white px-2 py-2 rounded-full shadow-md">❮</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 z-10 bg-transparent text-white px-2 py-2 rounded-full shadow-md">❯</button>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="rounded-2xl shadow-lg"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        speed={800}
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <OfferCard {...offer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const OfferCard: React.FC<Offer> = ({ title, description, image, link }) => (
  <div className="flex flex-row items-center p-6 rounded-2xl min-h-48 md:min-h-80 bg-cover bg-center max-w-4xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 3xl:min-h-[24rem] 4xl:min-h-[28rem]" style={{ backgroundImage: `url(${image})` }}>
    <div className='hidden lg:inline-block w-2/3 '>
      <img src={image} alt={title} className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto rounded-lg shadow-md bg-white" />
    </div>
    <div className="ml-4 text-white flex flex-col">
      <span className="text-base lg:text-xl font-bold line-clamp-2  ">{title}</span>
      <p className="mt-2 text-sm line-clamp-2">{description}</p>
      <div className="mt-4 flex gap-3">
        <Button variant="secondary" size={"sm"}>Explore</Button>
        <Button variant="default" size={"sm"}>Create Now</Button>
      </div>
    </div>
  </div>
);

export default OfferCarousel;
