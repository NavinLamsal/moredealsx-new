import React from 'react'
import DashboardSectionTitle from '../ui/DashboardSectionTitle'


const membershipData = [
    {
        title: "Restaurants",
        icon: "🍽️",
        points: "4,200 pts",
        tier: "Gold Tier",
        tierColor: "destructive", // ShadCN class reference
    },
    {
        title: "Hotels",
        icon: "🏨",
        points: "3,750 pts",
        tier: "Silver Tier",
        tierColor: "muted", // Customize as per theme
    },
    {
        title: "Salons",
        icon: "✂️",
        points: "2,980 pts",
        tier: "Silver Tier",
        tierColor: "muted", // Customize as per theme
    },
    {
        title: "Stores",
        icon: "🛍️",
        points: "1,850 pts",
        tier: "Bronze Tier",
        tierColor: "secondary", // Customize as per theme
    },
];



export const Partners = () => {
    return (
        <div>
            <DashboardSectionTitle title="OUR PARTNERS" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10 gap-4">
                {membershipData.map((membership, index) => (
                    <div key={index} className="bg-card rounded-lg overflow-hidden shadow-sm shadow-black/30 dark:shadow-white/30">
                        {/* <div className="bg-primary text-primary-foreground text-center p-4">
                            <h3 className='font-semibold uppercase '>{membership.title}</h3>
                        </div> */}
                        <div className="p-5 text-center">
                            <div className="text-4xl text-primary mb-4">{membership.icon}</div>
                            
                            <h3 className='font-semibold text-foreground mb-3'>{membership.title}</h3>
                            <span className='font-normal uppercase text-primary mb-3'>{membership.title}</span>
                        </div>
                    </div>
                ))}

            </div></div>
    )
}
