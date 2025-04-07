import Link from 'next/link'
import React from 'react'

const Heading = ({ title, viewAll }: { title: string, viewAll?: string  }) => {
    return (
        <div className="flex justify-between items-center mb-6 w-full">
            <h2 className="text-xl  font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
            <>
            {viewAll && <Link href={viewAll} className="text-blue-600 hover:underline">View All</Link>}
            </>
        </div>
    )
}

export default Heading




export const HeadingChild = ({ children  }: { children: React.ReactNode  }) => {
    return (
        <div className="flex justify-between items-center mb-6 w-full">
            <h2 className="text-xl  font-semibold text-gray-800 dark:text-gray-100">{children}</h2>
            {/* <>
            {viewAll && <Link href={viewAll} className="text-blue-600 hover:underline">View All</Link>}
            </> */}
        </div>
    )
}


