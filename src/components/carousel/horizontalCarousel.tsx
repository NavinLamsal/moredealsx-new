import { useRef, useState, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Heading from "../ui/heading";
import SectionTitle from "../Homes/sectionTiltle";
import Link from "next/link";
import DashboardSectionTitle from "../ui/DashboardSectionTitle";

type HorizontalCarouselProps = {
  title: string;
  center?: boolean;
  viewAll?: string;
  dashboard?: boolean
  children: ReactNode;
};

const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({ title, center, dashboard = false, viewAll, children }) => {
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
      {(!center && center) ?
        <div className="flex justify-between items-center mb-2">
          <Heading title={title} viewAll={viewAll} />

          {/* <h2 className="text-xl font-semibold">{title}</h2> */}
          {showNav && (
            <div className="flex space-x-2 mb-6 ml-2">
              <button onClick={() => scroll(-1)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scroll(1)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
        :
        <>
          <div className={`flex ${dashboard ? 'justify-start' : 'justify-center'}  items-center mb-2 relative`}>

            {dashboard ?
              <DashboardSectionTitle title={title}   />
              :

              <SectionTitle title={title} className="mb-2"/>
            }
            <div className="hidden md:flex absolute right-0 top-0">

              {showNav && (
                <div className="flex space-x-2 mb-6 ml-2">
                  <button onClick={() => scroll(-1)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={() => scroll(1)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              {viewAll && <Link href={viewAll} className="text-foreground dark:text-primary  hover:underline mt-2 ml-2">View All</Link>}
            </div>

          </div>
          <div className="flex justify-between items-center  md:hidden">
            {showNav ? (
              <div className="flex space-x-2 mb-6 ml-2">
                <button onClick={() => scroll(-1)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => scroll(1)} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                  <ChevronRight size={20} />
                </button>
              </div>
            )
          :
          <div></div>
          }

            {viewAll && <Link href={viewAll} className="text-foreground dark:text-primary   hover:underline ">View All</Link>}
          </div>
        </>
      }

      <div ref={scrollRef} className="flex flex-nowrap py-4 space-x-4 overflow-x-auto overflow-y-hidden 
      hide-scroll-bar  scroll-smooth">
        {children}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
