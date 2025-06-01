import { Button } from "@/components/ui/button";

const hotDeals = [
  {
    title: "Pasta Night Special",
    originalPrice: "$24.99",
    currentPrice: "$16.99",
    description: "All pasta dishes with garlic bread and salad",
    image: "/images/png/restro/pizza.png",
    badge: "LIMITED",
  },
  {
    title: "Wine & Appetizers",
    originalPrice: "$35.00",
    currentPrice: "$22.50",
    description: "2 glasses of wine + 3 appetizers of choice",
    image: "/images/png/restro/drink.png",
    badge: "HAPPY HOUR",
  },
  {
    title: "Family Feast",
    originalPrice: "$60.00",
    currentPrice: "$44.99",
    description: "2 large pizzas, 2 pastas, salad, and dessert",
    image: "/images/png/restro/pizza2.png",
    badge: "EXCLUSIVE",
  },
];

const HotDealsSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black dark:text-white text-black px-6 sm:py-12 py-6 max-w-7xl mx-auto">
      <div className="">
        <h2 className="sm:text-3xl text-xl font-bold dark:text-white text-gray-800 mb-2 uppercase  tracking-wider">
          HOT DEALS TODAY
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mb-8"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {hotDeals.map((deal, idx) => (
          <div
            key={idx}
            className="group dark:bg-gray-900 bg-yellow-50 rounded-xl shadow-lg overflow-hidden border dark:border-gray-700 transform transition duration-300 hover:-translate-y-2"
          >
            <div className="relative">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-56 object-cover"
              />
              {deal.badge && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
                  {deal.badge}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-gray-800 dark:text-yellow-500 font-bold text-lg">
                {deal.title}
              </h3>
              <div className="flex items-center gap-2 my-2">
                <span className="line-through dark:text-gray-400 text-gray-700 text-sm">
                  {deal.originalPrice}
                </span>
                <span className=" font-bold text-xl">{deal.currentPrice}</span>
              </div>
              <p className="text-sm dark:text-gray-300 text-gray-600 mb-4">
                {deal.description}
              </p>
              <Button className="bg-red-600 text-white w-full py-2 font-bold rounded hover:bg-red-700">
                CLAIM THIS DEAL
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotDealsSection;
