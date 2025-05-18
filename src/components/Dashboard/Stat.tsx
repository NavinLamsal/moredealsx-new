import React from 'react'

const Stat = () => {
    const stat = [
        {
            name: "Total Points",
            value: "4,420",
            unit: "pts",
            icon: "/icons/points.svg"
        },
        {
            name: "Savings This Month",
            value: "$1,250",
            unit: "USD",
            icon: "/icons/savings.svg"
        },
        {
            name: "Active Deals",
            value: "18",
            unit: "deals",
            icon: "/icons/deals.svg"
        },
        {
            name: "Network Size",
            value: "44",
            unit: "people",
            icon: "/icons/network.svg"
        }
    ]


    return (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-5 mb-5">
            {stat.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-5 shadow-md shadow-black/30 border-l-4 border-primary dark:shadow-white/30">
                    <h3 className='text-sm text-muted-foreground mb-2 uppercase font-medium'>{item.name}</h3>
                    <div className="text-2xl font-extrabold text-primary ">{item.value} <span className='text-xs font-extrabold text-foreground'>{item.unit}</span></div>
                </div>
            ))}
        </div>
    )
}

export default Stat