import React from 'react'
import BackButton from '../back_button'
import DashboardSectionTitle from '../DashboardSectionTitle'
import { cn } from '@/lib/utils'

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

const PageHeadings = ({title,white, description}:{title:string, white?:boolean, description?:string}) => {
    return (
        <div
            className="flex flex-col items-start space-x-2">
           
            <div className='flex items-center gap-2 justify-between w-full'>
                <div>
                <h2 className={cn(
                          `text-lg md:text-xl  xl:text-2xl font-extrabold text-foreground relative inline-block  ${white ? "text-white" : ""}`,
                          montserrat.className
                        )}>
                            {title}
                        </h2>
                        <span className="block w-20 h-1 dark:bg-yellow-400   mt-2" />
                </div>
                <BackButton back={true}/>
            </div>
                {/* <DashboardSectionTitle title={title} /> */}
                {description && 
                <p className="text-muted-foreground mb-4">
                    {description}
                </p>}

        </div>
    )
}

export default PageHeadings
