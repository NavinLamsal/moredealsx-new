import NewsletterForm from "@/components/form/moredealsclub/Newsletter";
import { CompanyMeta } from "@/lib/type/CommonType";
import Link from "next/link";
import React, { Suspense } from "react";

const Footer = ({data}:{data:CompanyMeta}) => {
  return (
    <footer className=" py-10 bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 border-b border-gray-600 pb-10">
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-1 md:col-span-3 sm:col-span-2 lg:col-span-2">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img src={data?.white_logo} alt="More Deals Logo" className="w-32 hidden dark:block" />
              <img src={data?.black_logo} alt="More Deals Logo" className="w-32 block dark:hidden" />
            </div>
            <p className="text-muted-foreground mb-2">{data?.description}</p>
            <p className="text-muted-foreground">Email: {data?.email}</p>
          </div>

          {/* Join Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Join the community</h3>
            <Suspense fallback={<div>Loading...</div>}>
            <NewsletterForm />
            </Suspense>
          </div>

          </div>

          {/* Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Explore</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="#" className="hover:text-purple-500 ">About Us</Link></li>
              <li><Link href="/event" className="hover:text-purple-500 ">Events</Link></li>
              <li><Link href="/offers" className="hover:text-purple-500 ">Offers</Link></li>
              <li><Link href="#" className="hover:text-purple-500 ">Our Products</Link></li>
              <li><Link href="#" className="hover:text-purple-500 ">Our Partners</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Marketplace</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li><a href="#" className="hover:text-purple-500 ">Art</a></li>
              <li><a href="#" className="hover:text-purple-500 ">Cards</a></li>
              <li><a href="#" className="hover:text-purple-500 ">Collectibles</a></li>
              <li><a href="#" className="hover:text-purple-500 ">Domain</a></li>
              <li><a href="#" className="hover:text-purple-500 ">Photos</a></li>
              <li><a href="#" className="hover:text-purple-500 ">Sports</a></li>
              <li><a href="#" className="hover:text-purple-500 ">Videos</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="/license" className="hover:text-purple-500 ">License</Link></li>
              <li><Link href="/faq" className="hover:text-purple-500 ">FAQ's</Link></li>
              <li><Link href="/support" className="hover:text-purple-500 ">Support</Link></li>
              <li><Link href="/terms-and-condition" className="hover:text-purple-500 ">Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-purple-500 ">Privacy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-sm text-muted-foreground">
          <p>2024 © All rights reserved by MoreTech Global</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-purple-500 ">Privacy Policy</Link>
            <Link href="#" className="hover:text-purple-500 ">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

