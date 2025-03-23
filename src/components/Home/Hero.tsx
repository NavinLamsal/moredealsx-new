"use client"
import { CompanyMeta } from '@/lib/type/CommonType'
import React, { useEffect, useRef } from 'react'
import { Button } from '../ui/button'

const Hero = ({data}:{data:CompanyMeta}) => {

    const iframeRef = useRef<HTMLIFrameElement>(null)

    const adjustIframeHeight = () => {
        const iframe = iframeRef.current
        if (iframe) {
            const aspectRatio = 9 / 16 // 16:9 aspect ratio
            const width = iframe.clientWidth
            const height = width * aspectRatio
            iframe.style.height = `${height}px`
        }
    }

    useEffect(() => {
        adjustIframeHeight()
        window.addEventListener('resize', adjustIframeHeight)

        return () => {
            window.removeEventListener('resize', adjustIframeHeight)
        }
    }, [])

    return (
        <div>
            <Header logo={data.white_logo}/>
            <section className="relative py-24 lg:py-36 bg-gradient-to-r from-primary to-secondary">
                <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 flex flex-col lg:flex-row gap-10 lg:gap-12">
                    <span
                        className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
                    <HeroContent title={data.description}/>
                    <HeroMedia iframeRef={iframeRef} />
                </div>
            </section>
        </div>
    )
}

export const Header = ({logo}:{logo:string}) => (
    <header className="absolute inset-x-0 top-0 z-50 pb-6 pt-0">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12">
            <nav className="flex justify-between items-center gap-6">
                <Logo logo={logo}/>
                <GetStartedButton />
            </nav>
        </div>
    </header>
)

export const Logo = ({logo}:{logo:string}) => (
    <a href="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo"  className='w-20 md:w-24 lg:w-28' />
    </a>
)

const GetStartedButton: React.FC = () => (
    <Button
       variant={"secondary"}
       size={"lg"}
        className='rounded-full bg-red-500 text-white font-semibold hover:bg-red-600'
    >
        Get Started
    </Button>
)

const HeroContent = ({title}:{title:string}) => (
    <div className="relative flex flex-col items-center text-center lg:text-left lg:py-7 lg:flex-1 lg:w-1/2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-sidebar-foreground">
            {title}
        </h1>
        <a href="/login" className="mt-5">
            <div className="bg-red-600 px-4 py-2 rounded-lg">
                <h3 className="text-white text-xl font-bold text-center">SIGNUP FOR FREE</h3>
                <p className="text-white text-center font-thin text-base lg:text-xl">
                    TAKE YOUR BUSINESS TO THE NEXT LEVEL
                </p>
            </div>
        </a>
    </div>
)

const HeroMedia: React.FC<{ iframeRef: React.RefObject<HTMLIFrameElement | null> }> = ({ iframeRef }) => (
    <div className="flex flex-1 lg:w-1/2 relative lg:max-w-none mx-auto max-w-3xl">
        <div className="lg:absolute lg:w-full lg:h-full rounded-3xl">
            <iframe
                ref={iframeRef}
                id="ytplayer"
                src="https://www.youtube.com/embed/pZ5rVUQGiy4?autoplay=0&loop=1&controls=0&showinfo=0&modestbranding=1&rel=0"
                title="Membersclub - Save and Make Money with More Deals Club"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full rounded-3xl"
            ></iframe>
        </div>
    </div>
)

export default Hero

