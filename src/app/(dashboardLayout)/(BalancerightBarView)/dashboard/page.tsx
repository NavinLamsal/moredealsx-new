import { auth } from "@/auth"
import Offers from "@/components/Dashboard/Offers"
// import QuickLinks from "@/components/Dashboard/QuickLinks"
import SessionUpdate from "@/components/Dashboard/SessionUpdate"
import PopularEvent from "@/components/Events/PopularEvent"
import TrendingEvents from "@/components/Events/TrendingEvent"
import BusinessSetupModal from "@/components/form/moredealsclub/BusinessRegistration/BusinessRegisterForm"
import DealsSection from "@/components/Home/popularDeals"
import WalletInfo, { QuickLinks } from "@/components/moreclub/wallets/WalletInfo"
import PopularResturants from "@/components/morefood/popularRestaurantList"
import PopularSalons from "@/components/moresalons/popularSalons"
import SessionUdpate from "@/components/test/sessionUdpate"





export default async function Page() {
  return (    
    <div className="flex-1 space-y-4  pt-6">
     <BusinessSetupModal />

     <Offers />
     <TrendingEvents/>
   
    <div>

      {/* <PopularEvent/> */}
      {/* <SessionUdpate/> */}

    </div>
    </div>

    

    
 

  

  )
}



// export default function NFTMarketplace() {
//   return (
//     <div className="flex flex-col xl:flex-row gap-4 p-4">
//       {/* Left Side - Main Content */}
//       <div className="w-full xl:w-8/12 space-y-4">
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-2xl p-6">
//           <h1 className="text-2xl font-bold">Discover The Largest NFTs Marketplace</h1>
//           <p className="mt-2 text-sm">
//             The largest NFT marketplace is OpenSea. Established in 2017, OpenSea has grown into the leading platform for digital assets.
//           </p>
//           <div className="mt-4 flex gap-3">
//             <button className="bg-white text-blue-600 px-4 py-2 rounded-lg">Explore</button>
//             <button className="bg-blue-500 px-4 py-2 rounded-lg">Create Now</button>
//           </div>
//         </div>

//         {/* Trending Bids */}
//         <div className="grid grid-cols-3 gap-4">
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold">24,000</h3>
//             <p className="text-sm text-gray-500">Artworks</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold">82,000</h3>
//             <p className="text-sm text-gray-500">Auction</p>
//           </div>
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h3 className="text-lg font-semibold">800</h3>
//             <p className="text-sm text-gray-500">Creators</p>
//           </div>
//         </div>

//         {/* Trending NFTs */}
//         <div>
//           <h2 className="text-xl font-semibold">Trending NFTs</h2>
//           <div className="grid grid-cols-4 gap-4">
//             <NFTCard title="Fantastic Alien" />
//             <NFTCard title="New Figures" />
//             <NFTCard title="New Figures" />
//             <NFTCard title="New Figures" />
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Sidebar */}
//       <div className="w-full xl:w-4/12 space-y-4">
//         {/* ETH Price Chart */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold">ETH Price</h3>
//           <div className="h-32 bg-gray-100 rounded-lg"></div>
//         </div>

//         {/* Statistics */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold">Statistics</h3>
//           <p>Total Art Sold: 145</p>
//           <p>Total Earnings: 750 ETH</p>
//         </div>

//         {/* Featured Creators */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold">Featured Creators</h3>
//           <div className="flex gap-4 mt-2">
//             <CreatorCard name="Theresa Webb" />
//             <CreatorCard name="Arlene McCoy" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Example NFT Card Component
function NFTCard({ title }: { title: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-32 bg-gray-300 rounded-lg"></div>
      <h4 className="mt-2 font-semibold">{title}</h4>
      <p className="text-sm text-gray-500">Price: 1.44 ETH</p>
      <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg w-full">Buy Now</button>
    </div>
  );
}

// Example Creator Card Component
function CreatorCard({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <p className="text-sm font-semibold">{name}</p>
    </div>
  );
}



