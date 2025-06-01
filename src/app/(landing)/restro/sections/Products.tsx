import { Button } from "@/components/ui/button";

const products = [
  {
    title: "Signature Pasta Sauce",
    originalPrice: "$12.99",
    image: "/images/png/restro/pizza3.png",
  },
  {
    title: "Artisan Olive Oil",
    originalPrice: "$18.99",
    image: "/images/png/restro/samosa.png",
  },
  {
    title: "Truffle Risotto Kit",
    originalPrice: "$24.99",
    image: "/images/png/restro/bread.png",
  },
  {
    title: "Gourmet Gift Basket",
    originalPrice: "$49.99",
    image: "/images/png/restro/hall.png",
  },
];

const Products: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black dark:text-white text-black px-6 sm:py-12 py-6 max-w-7xl mx-auto">
      <div className="">
        <h2 className="sm:text-3xl text-xl font-bold dark:text-white text-gray-800 mb-2 uppercase  tracking-wider">
          OUR PRODUCTS
        </h2>
        <div className="w-16 h-1 bg-yellow-400 mb-8"></div>
      </div>
      <div className="grid min-[490px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="dark:bg-gray-900 bg-yellow-50 rounded-xl shadow-lg overflow-hidden border dark:border-gray-700"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="p-4 flex flex-col items-center">
              <h3 className="dark:text-yellow-500 text-gray-800 font-bold text-lg">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 my-2">
                <span className=" font-bold text-xl">
                  {product.originalPrice}
                </span>
              </div>

              <Button className="bg-yellow-400 text-black px-8 py-2 font-bold rounded hover:bg-yellow-300">
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
