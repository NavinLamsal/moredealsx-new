import { CategoryListType } from '@/lib/type/morefood/restaurant';
import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef } from 'react'
import {Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type PlatformCardProps = CategoryListType



const PlatformCard = forwardRef<HTMLDivElement, PlatformCardProps>(({ name, icon, slug }, ref) => {
    return (
        <Link href={`/morefood/category/${slug}`}  >
            <div ref={ref} className="flex flex-col  items-center active:scale-75 transition-transform duration-150">
                <Avatar className='h-20 w-20'>
                    <AvatarImage src={icon} alt={name} width={50} height={50} className="size-20 bg-primary p-4 rounded-full" />
                    <AvatarFallback className="text-2xl h-20 w-20 size-20 font-extrabold bg-primary p-4 rounded-full text-white">{name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm mt-1 font-medium ">{name}</span>
            </div>
        </Link>

    )
});

PlatformCard.displayName = "PlatformCard";

export default PlatformCard
