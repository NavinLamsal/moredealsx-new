export default function TrackRecordSection() {
    return (
      <section className="relative container bg-primary text-white py-16 px-8 xl:rounded-2xl overflow-hidden mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 shadow-2xl">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
  
        {/* Content container */}
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Left content */}
          <div className="flex-1">
            <p className="text-blue-400 font-semibold text-sm uppercase mb-2">
              Our Motive
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            We're In The Business Of Helping You Save and Earn
            </h2>
            <p className="text-gray-300 mb-6">
            More Deals Club is your all-in-one platform for incredible savings and effortless earnings. Get the tools, support, and rewards you need to maximize your shopping and referral benefits. Join us today and start saving big while earning cash rewards with every referral!
            </p>
          </div>
  
          {/* Stats */}
          <div className="flex-1 grid grid-cols-2  md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 text-center">
            <div>
              <h3 className="text-3xl font-extrabold">8,000+</h3>
              <p className="text-gray-400">Users on the platform</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold">3%</h3>
              <p className="text-gray-400">Business on the platform</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold">99.9%</h3>
              <p className="text-gray-400">Leads</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold">$70M</h3>
              <p className="text-gray-400">Verified Business Users</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  