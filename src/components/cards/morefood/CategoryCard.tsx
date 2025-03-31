import { CategoryListType } from '@/lib/type/morefood/restaurant';
import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef } from 'react'

type CategoryCardProps = CategoryListType



const CategoryCard = forwardRef<HTMLDivElement, CategoryCardProps>(({ name, icon, slug }, ref) => {
    return (
        <Link href={`/morefood/category/${slug}?title=category`}  >
            <div ref={ref} className="flex flex-col  items-center active:scale-75 transition-transform duration-150">
                <Image src={icon} alt={name} width={50} height={50} className="size-20 bg-morefoodPrimary p-1 rounded-full" />
                <span className="text-sm mt-1 font-medium">{name}</span>
            </div>
        </Link>

    )
});

CategoryCard.displayName = "CategoryCard";

export default CategoryCard
