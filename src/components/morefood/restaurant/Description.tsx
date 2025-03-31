'use client';
import Heading from "@/components/ui/heading";
import { useState, useEffect, useRef } from "react";

const DescriptionSection = ({ description, name }: { description:string, name:string }) => {
  const [showMore, setShowMore] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = 24; // adjust this value to match your line height
      const maxHeight = lineHeight * 5;
      const textHeight = textRef.current.offsetHeight;

      if (textHeight > maxHeight) {
        setIsTruncated(true);
      }
    }
  }, [textRef]);

  return (
    <div className="bg-inherit rounded-md drop-shadow-md ">
     <Heading title={`About ${name}`}/>
      <p
        ref={textRef}
        className={`${
          !showMore ? "line-clamp-5" : ""
        } overflow-hidden text-ellipsis leading-6 text-base`}
      >
        {description}
      </p>
      {isTruncated && (
        <button
          className="text-dark-P_text hover:underline"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default DescriptionSection;