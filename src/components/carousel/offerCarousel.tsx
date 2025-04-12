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

interface OfferCarouselProps {
  offers: Offer[]
}

const OfferCarousel: React.FC<OfferCarouselProps> = ({ offers }) => {
  const swiperRef = useRef<any>(null);

  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();

  return (
    <div className="max-w-4xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl relative">
      <button onClick={prevSlide} className="absolute top-1/2 left-4 z-20 bg-transparent text-white px-2 py-2 rounded-full shadow-md">❮</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 z-20 bg-transparent text-white px-2 py-2 rounded-full shadow-md">❯</button>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="rounded-2xl shadow-lg"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        speed={1000}
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={offer.id}>
            {offer.is_banner_only ?
              <OfferBanner {...offer} /> :
              <OfferBannerWithTitle {...offer} />
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// const OfferCard: React.FC<Offer> = ({ title, description, image, link }) => (
//   <div className="flex flex-row items-center p-6 rounded-2xl min-h-48 md:min-h-80 bg-cover bg-center max-w-4xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 3xl:min-h-[24rem] 4xl:min-h-[28rem]" style={{ backgroundImage: `url(${image})` }}>
//     <div className='hidden lg:inline-block w-2/3 '>
//       <img src={image} alt={title} className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto rounded-lg shadow-md bg-white" />
//     </div>
// <div className="ml-4 text-white flex flex-col">
//   <span className="text-base lg:text-xl font-bold line-clamp-2  ">{title}</span>
//   <p className="mt-2 text-sm line-clamp-2">{description}</p>
//   <div className="mt-4 flex gap-3">
//     <Button variant="secondary" size={"sm"}>Explore</Button>
//     <Button variant="default" size={"sm"}>Create Now</Button>
//   </div>
// </div>
//   </div>
// );

const OfferBanner: React.FC<Offer> = ({ title, banner, short_description, to_date, from_date, is_active, is_all_time }) => {
  
  const { statusText, badgeColor } = getOfferStatus(from_date, to_date)
  return(
  <div
    className="flex flex-row items-center p-6 rounded-2xl h-48 sm:h-64 md:h-80 xl:h-96 2xl:h-[28rem] bg-cover bg-center max-w-4xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 3xl:h-[30rem] 4xl:h-[32rem]"
    style={{ backgroundImage: `url(${banner})` }}
  >
    {!is_all_time &&

<div className={`absolute ${badgeColor}  flex justify-between bottom-0 left-0 right-0 z-30 h-8`}>

  <span className={` text-xs font-semibold py-1 px-3 rounded`}>
    {statusText}
  </span>

</div>
}
  </div>
);}

const OfferBannerWithTitle: React.FC<Offer> = ({ title, discount_percentage, discount_amount, currency_symbol, banner, short_description, to_date, from_date, is_active, price, is_all_time }) => {

  const { statusText, badgeColor } = getOfferStatus(from_date, to_date)
  return (
    <div
      className="relative flex flex-row  p-6 rounded-2xl h-48 sm:h-64 md:h-80 xl:h-96 2xl:h-[28rem]  bg-cover bg-center max-w-4xl xl:max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 3xl:h-[30rem] 4xl:h-[32rem]"
      style={{ backgroundImage: `url(${banner})` }}
    >





      {/* for price  */}
      {(price !== null && price !== 0) &&
        <div className='absolute bottom-24 right-24 z-30 hidden md:block'>

          <div className="relative inline-block bg-red-600 text-white font-extrabold text-xl px-6 py-4 rounded-lg shadow-lg skew-x-[6deg]">
            {/* Top arrows */}
            <div className="absolute -top-3 left-4 flex space-x-1 -rotate-[10deg]">
              <div className="w-2 h-2 bg-yellow-400 transform rotate-45"></div>
              <div className="w-2 h-2 bg-yellow-400 transform rotate-45"></div>
              <div className="w-2 h-2 bg-yellow-400 transform rotate-45"></div>
            </div>

            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-yellow-400 rounded-sm"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-yellow-400 rounded-sm"></div>

            {/* Main Text */}
            <div className="skew-x-[-6deg]">
              Only At <br /> <span className="text-yellow-300">{currency_symbol}{price}!</span>
            </div>

            {/* Speech tail */}
            <div className="absolute -bottom-3 left-6 w-4 h-4 bg-red-600 rotate-45"></div>
          </div>

        </div>
      }

      {(price !== null && price !== 0) &&
        <div className="absolute bottom-14 right-6 bg-gradient-to-l from-red-600 to-red-500 text-white px-2 py-1 md:px-3 md:py-2 font-bold w-12 h-12 md:w-20 md:h-20 flex flex-col justify-center items-center shadow-md custom-clip z-30 rounded-tr-2xl md:rounded-tr-3xl rounded-bl-2xl md:rounded-bl-3xl  md:hidden">
          <span className="text-[10px] md:text-xs">At</span>
          <span className="text-xs md:text-base xl:text-xl leading-tight">{currency_symbol}{price}</span>
        </div>
      }

      {(discount_percentage !== null && Number(discount_percentage) > 0) &&
        <div className="absolute top-0 right-6 custom-ribbon flex flex-col items-center justify-center text-white font-bold w-12 h-16 md:w-20 md:h-24 text-center z-30">
          <div className="text-xs md:text-sm xl:text-lg leading-none">-{discount_percentage}%</div>
          <div className="text-[10px] md:text-xs xl:text-sm">off</div>
        </div>
      }

      {(discount_amount !== null && Number(discount_amount) > 0) &&
        <div className="absolute bottom-14 right-6 bg-gradient-to-l from-red-600 to-red-500 text-white px-2 py-1 md:px-3 md:py-2 font-bold w-12 h-12 md:w-20 md:h-20 flex flex-col justify-center items-center shadow-md custom-clip z-30 rounded-tr-2xl md:rounded-tr-3xl rounded-bl-2xl md:rounded-bl-3xl">
          <span className="text-xs md:text-base xl:text-xl leading-tight">{currency_symbol}{discount_amount}</span>
          <span className="text-[10px] md:text-xs">OFF</span>
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
  );
}




export default OfferCarousel;
