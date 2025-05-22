import React from 'react'
import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({ subsets: ['latin'] })

const Logo = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-12 h-12 relative mr-2 md:mr-4">
                <span className='absolute  font-extrabold  -translate-y-1/2 w-8 h-8 text-primary -rotate-45 text-7xl'>+</span>
            </div>
            <div className={`${montserrat.className} uppercase text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-wide text-white `}>MORE<span className='text-primary'>DEALS</span>X</div>
        </div>
    )
}

export default Logo

export const SmallLogo = () => {
    return(
    <div className="flex items-center justify-center">
        <div className="w-10 h-10 relative mr-2 md:mr-3">
            <span className='absolute  font-extrabold  -translate-y-1/2 w-6 h-6 text-primary -rotate-45 text-7xl'>+</span>
        </div>
        <div className={`${montserrat.className} uppercase text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wide text-white `}>MORE<span className='text-primary'>DEALS</span>X</div>
    </div>
    )

}
