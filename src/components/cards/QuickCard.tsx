import Image from 'next/image'
import Link from 'next/link';
import React from 'react'


interface QuickCardProps {
    category: {
        id: number,
        title: string,
        url:string,
        image: string,
        dark: string,
        visibility: Boolean
        background: string,
        foreground: string,
    };
}

const QuickCard: React.FC<QuickCardProps> = ({ category }) => {
    return (
        <Link
            href={category.url}
            className={`flex flex-col items-center p-4 ${category.background} bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200`}
        >
            <Image src={category.image} alt={category.title} className="w-16 h-16 mb-3 rounded-full object-cover dark:hidden block" width={100} height={100} />
            <Image src={category.dark} alt={category.title} className="w-16 h-16 mb-3 rounded-full object-cover hidden dark:block" width={100} height={100} />
            <h3 className={`text-lg font-medium ${category.foreground}`}>{category.title}</h3>

        </Link>
    )
}

export default QuickCard
