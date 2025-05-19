// "use client"
// import { useQuery } from "@tanstack/react-query";
// import OfferCarousel from "../carousel/offerCarousel"
// import { fetchOfferList } from "@/lib/action/PublicCommonClient";
// import { Offers as Offerlist } from "@/data.json";
// import VerticalOfferCarousel from "../carousel/HorizontalOfferCarousel";


// export default function SmallOffers() {
//   const country = typeof window !== "undefined" ? localStorage.getItem("country") : null;
//   const { data: offerlist, isLoading, isError } = useQuery({
//     queryKey: ["offer list", country],
//     queryFn: async () => await fetchOfferList(country),
//     staleTime: 360000,
//     enabled: !!country
//   });

//   if (isLoading) {
//     return <OfferCarousel offers={Offerlist} />
  
//   }

//   if (isError) {
//     return <OfferCarousel offers={Offerlist} />
//   }



//   return (

//     <>
//       {(offerlist && offerlist?.length > 0) ?
//         <VerticalOfferCarousel offers={[...Offerlist, ...offerlist]} />
//         :
//         <VerticalOfferCarousel offers={Offerlist} />
//       }

//     </>
//   )
// }
