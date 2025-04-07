"use client"
import { useQuery } from "@tanstack/react-query";
import OfferCarousel from "../carousel/offerCarousel"
import { fetchOfferList } from "@/lib/action/PublicCommonClient";







const offers = [
  {
    id: 1,
    title: 'Get upto 40% off on our platform ',
    description: 'The largest NFT marketplace is OpenSea. Established in 2017, it has grown to be the leading platform.',
    banner: 'https://cdn.pixabay.com/photo/2022/11/22/04/34/black-friday-7608705_1280.jpg',
  },
  {
    id: 2,
    title: 'Join The Future of Digital Collectibles',
    description: 'NFTs are revolutionizing digital ownership. Get started today and explore exclusive collections.',
    banner: 'https://cdn.pixabay.com/photo/2020/03/15/23/05/momos-4935232_1280.jpg',
  },
  {
    id: 3,
    title: 'Trade & Sell NFTs Seamlessly',
    description: 'With blockchain technology, trading and selling NFTs has never been easier. Start your journey now.',
    banner: 'https://cdn.pixabay.com/photo/2020/03/15/23/05/momos-4935232_1280.jpg',
  },
];

export default function Offers() {
  const country = typeof window !== "undefined" ? localStorage.getItem("country") : null;
  const { data: offerlist, isLoading, isError } = useQuery({
    queryKey: ["order Details", country],
    queryFn: async () => await fetchOfferList(country),
    staleTime: 360000,
    enabled: !!country
  });
  
  if (isLoading) {
    return <p>Loading...</p>
  }
  
  if (isError) {
    return <p>Error fetching order details.</p>
  }
  
  // console.log("data", offerlist)


  return (

  <>
  {(offerlist && offerlist?.length > 0) ?
    <OfferCarousel offers={offerlist} />
    :<OfferCarousel offers={offers}/>
  }
  

  </>
  )
}
