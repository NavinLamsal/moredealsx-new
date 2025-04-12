"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import React, { useRef } from 'react';
import { Offer } from '@/lib/action/PublicCommonClient';
import { Button } from '../ui/button';
import { getOfferStatus } from '@/lib/utils';

interface OfferC {
  id: number;
  title: string;
  description: string;
  banner: string;
  link?: string;
}

interface VerticalOfferCarouselProps {
  offers: Offer[]
}

const VerticalOfferCarousel: React.FC<VerticalOfferCarouselProps> = ({ offers }) => {
  const swiperRef = useRef<any>(null);

  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();

  return (
    <div className="max-w-lg relative">
      <button onClick={prevSlide} className="absolute top-1/2 left-4 z-20 bg-transparent text-white px-2 py-2 rounded-full shadow-md">❮</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 z-20 bg-transparent text-white px-2 py-2 rounded-full shadow-md">❯</button>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        className="rounded-2xl shadow-lg"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        speed={1000}
      >
        {offers.filter(offer => !offer.is_banner_only).slice()
  .reverse().map((offer, index) => (
          <SwiperSlide key={offer.id}>
              <OfferBannerWithTitle {...offer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const OfferBanner: React.FC<Offer> = ({ title, banner, short_description, to_date, from_date, is_active , is_all_time }) => (
  <div
    className="flex flex-row items-center p-6 rounded-2xl h-48 sm:h-64 md:h-80 xl:h-96 2xl:h-[28rem] bg-cover bg-center max-w-lg 3xl:h-[30rem] 4xl:h-[32rem]"
    style={{ backgroundImage: `url(${banner})` }}
  >
    {!is_all_time &&
    <div className='absolute  bg-primary flex justify-between bottom-0 left-0 right-0 z-30 h-8 text-primary-foreground'>

      {is_active ?
        <div className='flex gap-2 font-bold ml-2'>
          <span>Active Now</span>
          <span>valid till:{to_date}</span>
        </div>
        :
        <div>
          <span>starts from:{from_date}</span>
          <span>valid till:{to_date}</span>
        </div>
      }

    </div>
    
    }
  </div>
);

const OfferBannerWithTitle: React.FC<Offer> = ({ title, discount_percentage, discount_amount, currency_symbol, banner, short_description, to_date, from_date, is_active, price , is_all_time}) => {
  const { statusText, badgeColor } = getOfferStatus(from_date, to_date)
  return(
  <div
    className="relative flex flex-row  p-6 rounded-2xl h-48 sm:h-64 md:h-80 xl:h-96 2xl:h-[28rem]  bg-cover bg-center max-w-lg 3xl:h-[30rem] 4xl:h-[32rem]"
    style={{ backgroundImage: `url(${banner})` }}
  >





    

{(price !== null && price !== 0) &&
  <div className="absolute bottom-14 right-6 bg-gradient-to-l from-red-600 to-red-500 text-white px-2 py-1 md:px-3 md:py-2 font-bold w-14 h-14  flex flex-col justify-center items-center shadow-md custom-clip z-30 rounded-tr-2xl md:rounded-tr-3xl rounded-bl-2xl md:rounded-bl-3xl">
    <span className="text-[10px] ">At</span>
    <span className="text-[10px]  leading-tight">{currency_symbol}{price}</span>
  </div>
}


{(discount_percentage !== null && Number(discount_percentage) > 0) &&
  <div className="absolute top-0 right-6 custom-ribbon flex flex-col items-center justify-center text-white font-bold w-12 h-16  text-center z-30">
    <div className="text-xs  leading-none">-{discount_percentage}%</div>
    <div className="text-[10px]">off</div>
  </div>
}

{(discount_amount !== null && Number(discount_amount) > 0) &&
  <div className="absolute bottom-14 right-6 bg-gradient-to-l from-red-600 to-red-500 text-white px-2 py-1 md:px-3 md:py-2 font-bold w-12 h-12 flex flex-col justify-center items-center shadow-md custom-clip z-30 rounded-tr-2xl md:rounded-tr-3xl rounded-bl-2xl md:rounded-bl-3xl">
    <span className="text-xs leading-tight">{currency_symbol}{discount_amount}</span>
    <span className="text-[10px] ">OFF</span>
  </div>
}



    <div className='absolute inset-0 bg-black/35 top-0 bottom-0 left-0 right-0' />
    <div className="ml-1 md:ml-4 text-white flex flex-col z-20 md:gap-3">
      <span className="text-lg sm:text-xl lg:text-4xl 2xl:text-4xl mt-4 font-bold line-clamp-2  ">{title}</span>
      <span className="text-sm sm:text-base lg:text-lg 2xl:text-xl mt-4 font-bold hidden md:inline-block  md:line-clamp-2  ">{short_description}</span>
      <div className=" md:mt-4 flex gap-3">
        <Button size={"sm"} className='rounded-full'>Explore Now</Button>
      </div>
    </div>

    {!is_all_time &&

<div className={`absolute ${badgeColor}  flex justify-between bottom-0 left-0 right-0 z-30 h-8`}>

  <span className={` text-xs font-semibold py-1 px-3 rounded`}>
    {statusText}
  </span>

</div>
}

 
  </div>
);}




export default VerticalOfferCarousel;
