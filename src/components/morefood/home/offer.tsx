import OfferCarousel from "@/components/carousel/offerCarousel";


const offers = [
    {
      id: 1,
      title: 'Exclusive Discounts on Fresh Produce!',
      description: 'Get up to 30% off on farm-fresh vegetables and fruits. Limited time offer!',
      banner: 'https://cdn.pixabay.com/photo/2022/11/22/04/34/black-friday-7608705_1280.jpg',
    },
    {
      id: 2,
      title: 'Buy One Get One Free - Gourmet Burgers!',
      description: 'Order a delicious gourmet burger and get another one absolutely free!',
      banner: 'https://cdn.pixabay.com/photo/2019/04/22/08/37/burger-4145977_1280.jpg',
    },
    {
      id: 3,
      title: 'Midnight Cravings? We Got You Covered!',
      description: 'Order late-night snacks with a 20% discount on all orders above $15.',
      banner: 'https://cdn.pixabay.com/photo/2014/05/03/14/21/meals-337073_1280.jpg',
    },
    {
      id: 4,
      title: 'Get Free Delivery on Your First Order!',
      description: 'Sign up today and enjoy free delivery on your first food order.',
      banner: 'https://cdn.pixabay.com/photo/2018/05/15/09/01/foodora-3402507_1280.jpg',
    },
    {
      id: 5,
      title: 'Healthy Meal Plans - 10% Off!',
      description: 'Subscribe to our healthy meal plans and get 10% off your first month.',
      banner: 'https://cdn.pixabay.com/photo/2023/09/25/07/55/salad-8274421_1280.jpg',
    },
  ];
  

export default function Offers() {
  return <OfferCarousel offers={offers} />;
}
