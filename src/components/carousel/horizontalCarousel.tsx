import { useRef, useState, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Heading from "../ui/heading";

type HorizontalCarouselProps = {
  title: string;
  viewAll?: string;
  children: ReactNode;
};

const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({ title, viewAll, children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        setShowNav(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const scroll = (direction: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <Heading title={title}  viewAll={viewAll}/>
        {/* <h2 className="text-xl font-semibold">{title}</h2> */}
        {showNav && (
          <div className="flex space-x-2 mb-6 ml-2">
            <button onClick={() => scroll(-1)} className="p-2 bg-gray-200 rounded-full">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll(1)} className="p-2 bg-gray-200 rounded-full">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      <div ref={scrollRef} className="flex flex-nowrap py-4 space-x-4 overflow-x-auto overflow-y-hidden 
      hide-scroll-bar  scroll-smooth">
        {children}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
