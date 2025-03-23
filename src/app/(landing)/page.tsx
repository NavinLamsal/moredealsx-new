import MobileAppShowcase from "@/components/Home/appPromotion";
import CallToAction from "@/components/Home/CallToAction";
import BentoGrids from "@/components/Home/DentoGrids";
import Hero from "@/components/Home/Hero";
import HowItWorksSection from "@/components/Home/Howitworks";
import ESewaLayout from "@/components/Home/NewHero";
import DealsSection from "@/components/Home/popularDeals";
import Pricing from "@/components/Home/pricing";
import TrackRecordSection from "@/components/Home/Stats";
import PopularRestaurant from "@/components/morefood/PopularRestaurant";
import PopularResturants from "@/components/morefood/PopularRestaurant";
import PopularHotels from "@/components/moreliving/popularHotels";
import PopularSalons from "@/components/moresalons/popularSalons";
import { getMetadata } from "@/lib/action/PubilcCommon";
import { CompanyMeta } from "@/lib/type/CommonType";

export default async function Home() {

    const MetaDatas : CompanyMeta = await getMetadata();

    const Infodata1 = [
      {
        image: "https://res.cloudinary.com/dcsd8ukzn/image/upload/v1/media/company_logos/Members_Club_1_kom9cy",
        heading: "Boost Your Savings and Earnings with More Deals Club!",
        subheadings: [
          {
            title: "All-In-One Platform for Ultimate Benefits",
            description:
              "More Deals Club gives you everything you need to save money and earn rewards effortlessly. Manage your referrals, track your rewards, and enjoy exclusive discounts all in one place.",
          },
    
          {
            title: "Sign Up Today and Start Earning!",
            description:
              "Join More Deals Club now and unlock the ultimate platform for savings and rewards. Don't miss out on the easiest way to grow your wallets!",
          },
        ],
        // testimonial: {
        //   text: "I have personally provided HighLevel to all of my elite clients in my mentorship program, and they have been utilizing it for prospecting, sales, fulfillment, keeping things closer, making sure prospects never slip through the cracks, and utilizing things to save their time. If you’re considering using HighLevel, use it. It’s going to help your business scale!",
        //   author: "Alex Schlinsky",
        //   position: "Founder of Prospecting On Demand™",
        //   image: "/path-to-testimonial-image1.png", // replace with actual path
        // },
      },
      {
        image: "https://res.cloudinary.com/dcsd8ukzn/image/upload/v1/media/company_logos/Members_Club_1_kom9cy",
        heading: "Supercharge Your Savings and Earnings with More Deals Club!",
        subheadings: [
          {
            title: "Everything You Need in One Platform",
            description:
              "More Deals Club offers a complete solution for maximizing your savings and rewards. Easily manage your referrals, track rewards, and access exclusive discounts all in one place.",
          },
    
          {
            title: "Sign Up Today and Start Earning!",
            description:
              "Join More Deals Club now and experience the ultimate platform for effortless savings and earnings. Don’t wait ! Unlock your benefits today!",
          },
        ],
      },
      {
        image: "https://res.cloudinary.com/dcsd8ukzn/image/upload/v1/media/company_logos/Members_Club_1_kom9cy",
        heading: "For Users",
        subheadings: [
          {
            title: "Daily Discounts",
            description: "Enjoy exclusive offers and discounts every single day.",
          },
          {
            title: "Earn Rewards",
            description: "Refer friends and earn cash rewards effortlessly.",
          },
          {
            title: "Sign Up Today and Start Earning!",
            description:
              "Join More Deals Club now and experience the ultimate platform for effortless savings and earnings. Don’t wait—unlock your benefits today!",
          },
        ],
      },
    ];
   

  return (
   <>
   <ESewaLayout/>
   {/* <Hero data={MetaDatas} /> */}
   <div className="max-w-8xl mx-auto flex flex-col">
    
   <DealsSection/>
   <PopularRestaurant />
   <PopularSalons/>
   <PopularHotels/>
   <HowItWorksSection/>

   <CallToAction/>
   <MobileAppShowcase/>
   <BentoGrids/>
   {/* <InfoContainer data={Infodata1}/> */}
   <TrackRecordSection/>
   <Pricing/>
   {/* <InfoContainer data={Infodata1}/> */}
   
   </div>
   </>
  );
}
