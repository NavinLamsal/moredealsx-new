
import Image from "next/image";
import { forwardRef } from "react";

type CrmCardProps = {banner: string, name: string, url: string};

const CrmCard = forwardRef<HTMLDivElement, CrmCardProps>(({ banner,   name, url,}, ref) => {

  return (
    <a href={url} target="_blank">
      <div
        ref={ref}
        className="w-full min-w-xs max-w-xs rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:shadow-xl hover:bg-card active:bg-card"
      >
        <div className="relative w-full h-40">
          <Image
            src={banner}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold  truncate">{name}</h3>
        </div>
      </div>
    </a>
  );
});

CrmCard.displayName = "CrmCard";

export default CrmCard;
