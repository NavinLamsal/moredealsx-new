"use client"
import { useQuery } from "@tanstack/react-query";
import OfferCarousel from "../carousel/offerCarousel"
import { fetchOfferList } from "@/lib/action/PublicCommonClient";
import { Offers as Offerlist } from "@/data.json";








export default function Offers() {
  const country = typeof window !== "undefined" ? localStorage.getItem("country") : null;
  const { data: offerlist, isLoading, isError } = useQuery({
    queryKey: ["order Details", country],
    queryFn: async () => await fetchOfferList(country),
    staleTime: 360000,
    enabled: !!country
  });

  if (isLoading) {
    return <OfferCarousel offers={Offerlist} />
  
  }

  if (isError) {
    return <OfferCarousel offers={Offerlist} />
  }




  return (

    <>
      {(offerlist && offerlist?.length > 0) ?
        <OfferCarousel offers={[...Offerlist, ...offerlist]} />
        :
        <OfferCarousel offers={Offerlist} />
      }

    </>
  )
}
