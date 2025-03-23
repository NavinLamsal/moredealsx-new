import Image from "next/image";

export default function MobileAppShowcase() {
  return (

    <section className="relative text-black  overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between p-8 md:p-16 before:absolute before:inset-0 before:bg-[url('https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_960_720.jpg')] before:bg-cover before:bg-center before:opacity-40 before:z-0">
      
    {/* Left Content */}
    <div className="flex-1 text-center md:text-left relative z-10">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
        Experience <span className="text-secondary-500">Seamless</span> <br /> Access – Get Our Mobile App!
      </h1>
      <p className="text-gray-300 mb-6">
        We are now available in the Google Play Store!
      </p>

      {/* Play Store & App Store Buttons */}
      <div className="flex space-x-4 mt-6">
        {/* Play Store Button */}
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg shadow hover:opacity-80 transition"
        >
          <img src="/images/png/play.png" alt="Google Play" className="w-6 h-6" />
          <div className="text-left">
            <p className="text-xs">GET IT ON</p>
            <p className="font-bold">Google Play</p>
          </div>
        </a>

        {/* App Store Button */}
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg shadow hover:opacity-80 transition"
        >
          <img src="/images/png/app.png" alt="App Store" className="w-6 h-6" />
          <div className="text-left">
            <p className="text-xs">Download on the</p>
            <p className="font-bold">App Store</p>
          </div>
        </a>
      </div>
    </div>

    {/* Right Content - Mobile Screens */}
    <div className="flex-1 flex justify-center items-center mt-8 md:mt-0 relative z-10">
      <div className="relative w-64 h-64 md:w-96 md:h-96">
        {/* Background Circle */}
        <div className="absolute inset-0 bg-secondary-500 dark:bg-secondary-700 rounded-full opacity-20 z-0"></div>

        {/* Phones with Images */}
        <div className="absolute inset-0 flex justify-center items-center space-x-4">
          <div className="bg-black w-32 h-64 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transform rotate-[-15deg] overflow-hidden">
            <Image src="/images/jpeg/app2.jpeg" alt="App Preview 1" width={144} height={288} quality={100} className="w-full h-full object-cover px-1 rounded-2xl" />
          </div>
          <div className="bg-black w-36 h-72 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 z-10 overflow-hidden">
            <Image src={"/images/jpeg/app1.jpeg"} alt="App Preview 2" width={144} height={288} quality={100} className="w-full h-full object-cover px-1 rounded-2xl " />
          </div>
          <div className="bg-black w-32 h-64 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transform rotate-[15deg] overflow-hidden">
            <Image src="/images/jpeg/app3.jpeg" alt="App Preview 3" width={144} height={288} quality={100} className="w-full h-full object-cover px-1 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
</section>


  );
}
