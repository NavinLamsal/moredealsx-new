import React from "react";

const FreeButton: React.FC = () => {
  return (
    <a href="/login" className="block w-full max-w-xs mx-auto">
      <div className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out">
        <h5 className="text-white text-lg font-bold text-center">SIGNUP FOR FREE</h5>
        <p className="text-white text-sm text-center mt-1">
          TAKE YOUR BUSINESS TO THE NEXT LEVEL
        </p>
      </div>
    </a>
  );
};

export default FreeButton;
