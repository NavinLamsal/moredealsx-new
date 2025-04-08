import DetailComponent from "@/components/morefood/cards/OfferDetail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { OfferType } from "@/lib/type/morefood/restaurant";
import moment from "moment";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function OfferCard({ index, offer }: { index: number, offer: OfferType }) {

  const pathname = usePathname();
  const router = useRouter();
   const [showSheet, setShowSheet] = useState(false);
    const [showDialog, setShowDialog] = useState(false);


  const handleViewDetails = (show: string) => {

    if(pathname.includes( `/morefood/restaurant/${offer.restaurant_slug}`)){
      if (show === "sheet") {
        setShowSheet(true);
      }
      if (show === "dialog") {
        setShowDialog(true);
      }
    }else{
      router.push(`/morefood/restaurant/${offer.restaurant_slug}`);
    }
   
  };

  

  return (
    <>
    <div className="bg-green-300 rounded-lg  w-96 shadow-lg">
      <div className="flex items-center">

        <div className="flex-1 p-4 rounded-l-lg bg-green-500">
          <h2 className="text-lg font-bold text-black line-clamp-2" >{offer.name}</h2>
          <h2 className="text-sm text-black mt-1 line-clamp-1">{offer.description}</h2>
          <p className="text-sm text-black mt-1">Ends: {moment(offer.end_date).format("ddd, MM/D,")}. Terms apply</p>
          <div className="flex flex-1 items-center gap-2 mt-3">

            <button className=" bg-white text-black font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 hidden lg:block" onClick={() => handleViewDetails("dialog")}
          >
              Order now
            </button>
            <button className=" bg-white text-black font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-100 block lg:hidden" onClick={() => handleViewDetails("sheet")} 
          >
              Order now
            </button>
            <p className="text-lg font-bold text-black ">{offer.currency_symbol}&nbsp;{offer.price}</p>
          </div>
        </div>

        <div className="flex items-center justify-center w-24 h-full overflow-hidden rounded-md my-0 mx-1 pr-0"

        >
          <Image
            src={offer.banner || "/Images/morefood.jpg"}
            alt={offer.name}
            title={offer.name}
            width={200}
            height={200}
            className="object-cover w-full h-full bg-gray-300"
          />
        </div>
      </div>
    </div>
    
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-scroll p-0">
          <DetailComponent
            item={offer}
          />
        </SheetContent>
      </Sheet>

      {/* Dialog for Desktop */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px] md:max-w-md lg:max-w-lg xl:max-w-xl md:max-h-[60%] lg:max-h-[75%] overflow-y-scroll hide-scroll-bar p-0">
        <DetailComponent
            item={offer}    
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
