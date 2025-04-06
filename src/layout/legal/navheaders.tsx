"use client"
import { Calendar, File, FileText, Lock } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Navheaders = () => {
    const pathname = usePathname();

    const pathSegments = pathname.split('/').filter(Boolean);
let lastSegment = pathSegments[pathSegments.length - 1] || '';
  lastSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');

    const navItems = [
      { href: "/terms-and-condition", icon: <Calendar size={20} />, title: "Terms of Use" },
      { href: "/privacy-policy", icon: <Lock size={20} />, title: "Privacy Policy" },
      { href: "/license", icon: <File size={20} />, title: "License" },
    ];
   

  return (
    <>
    <header className="bg-navbar text-white text-center pt-16 pb-28 relative">
        <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90 h-32 md:h-auto"></span>
        <h1 className="text-2xl lg:text-4xl font-semibold mt-5 md:mt-6">{lastSegment}</h1>
      </header>

      {/* Navigation Bar */}
      <nav className="flex justify-center mt-[-40px] px-4">
        <div className="bg-white shadow-lg rounded-2xl px-6 py-4 flex flex-wrap justify-center md:flex md:space-x-8 md:p-4 transition-all duration-300 z-10">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} icon={item.icon} title={item.title} active={pathname === item.href} />
          ))}
        </div>
      </nav>
    </>
  )
}

export default Navheaders


const NavItem: React.FC<{ href: string; icon: React.ReactNode; title: string; active?: boolean }> = ({ href, icon, title, active = false }) => (
    <Link href={href} className={`flex items-center space-x-2 px-4 py-2 rounded-md ${active ? "text-purple-600 font-semibold" : "text-gray-600 hover:text-purple-500"}`}>
      {icon}
      <span>{title}</span>
    </Link>
  );