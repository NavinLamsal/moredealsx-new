// import React from 'react'
// import SectionTitle from './sectionTiltle'

// const trasureSection = () => {
//   return (

//     <section className="treasure">
//         <div className="container">
//             <div className="max-w-3xl mx-auto">
//                 <SectionTitle
//                 title="DEALS TREASURE"  
//                 />
//                 <p>Dig for hidden gems – Limited-time steals!</p>
                
//                 <div className="treasure-chest">
//                     <div className="lock"></div>
//                 </div>
                
//                 <a href="#" className="btn btn-gold">Open the Chest</a>
//             </div>
//         </div>
//     </section>
//   )
// }

// export default trasureSection

import React from "react";
import SectionTitle from "./sectionTiltle";

const TreasureSection = () => {
  return (
    <section
      className="py-20 text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <div className="max-w-3xl mx-auto text-white">
        <SectionTitle title="DEALS TREASURE" white={true} className="text-foreground dark:text-white" />
       
        <p className="mb-8">Dig for hidden gems – Limited-time steals!</p>

        <div className="w-52 h-52 mx-auto mb-6 bg-yellow-400 border-4 border-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden transition-transform duration-300 hover:scale-105 group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
          <div className="w-10 h-10 bg-gray-800 rounded-full relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gray-800 rounded-full" />
          </div>
        </div>

        <a
          href="#"
          className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition-colors"
        >
          Open the Chest
        </a>
      </div>
    </section>
  );
};

export default TreasureSection;
