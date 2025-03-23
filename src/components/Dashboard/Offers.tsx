
import OfferCarousel from "../carousel/offerCarousel"




const offers = [
  {
    id: 1,
    title: 'Discover The Largest NFTs Marketplace',
    description: 'The largest NFT marketplace is OpenSea. Established in 2017, it has grown to be the leading platform.',
    image: 'https://cdn.pixabay.com/photo/2020/03/15/23/05/momos-4935232_1280.jpg',
  },
  {
    id: 2,
    title: 'Join The Future of Digital Collectibles',
    description: 'NFTs are revolutionizing digital ownership. Get started today and explore exclusive collections.',
    image: 'https://cdn.pixabay.com/photo/2020/03/15/23/05/momos-4935232_1280.jpg',
  },
  {
    id: 3,
    title: 'Trade & Sell NFTs Seamlessly',
    description: 'With blockchain technology, trading and selling NFTs has never been easier. Start your journey now.',
    image: 'https://cdn.pixabay.com/photo/2020/03/15/23/05/momos-4935232_1280.jpg',
  },
];

export default function Offers() {
  return <OfferCarousel offers={offers} />;
}
