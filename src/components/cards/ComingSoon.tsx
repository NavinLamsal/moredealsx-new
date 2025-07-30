import React from "react";

const ComingSoon = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[250px] bg-yellow-400 rounded-lg px-4 py-6 text-center">
      {/* Coming Soon Bar */}
      <div className="flex overflow-hidden rounded-full border border-black shadow-md mb-4">
        <span className="px-6 py-3 bg-black text-white text-lg font-semibold tracking-widest">
          COMING
        </span>
        <span className="px-6 py-3 bg-yellow-400 text-black text-lg font-semibold tracking-widest">
          SOON
        </span>
      </div>

      {/* Stay Tuned Text */}
      <p className="text-black text-base md:text-lg font-medium tracking-wide">
        Stay tuned
      </p>
    </div>
  );
};

export default ComingSoon;
