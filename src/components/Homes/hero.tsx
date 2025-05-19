import React from 'react'
import { Button } from '../ui/button'
import {Montserrat} from 'next/font/google'

const montserrat = Montserrat({subsets: ['latin']})

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center"
    style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
    <div className="max-w-2xl px-5">
        <h1 className={`text-4xl md:text-5xl xl:text-6xl  font-extrabold mb-5 uppercase text-primary ${montserrat.className}`}>DOMINATE YOUR SAVINGS</h1>
        <p className='mb-7 text-foreground text-2xl font-medium'>Premium discounts. Zero compromises.</p>
        <div className="flex justify-center flex-wrap gap-5">
            <Button variant={'destructive'} size={"lg"} className='font-bold text-xl '>Explore Trending Offers</Button>
            <Button  variant={"default"} size={"lg"} className='font-bold text-xl'>Join Premium</Button>
        </div>
    </div>
</section>
  )
}

export default Hero