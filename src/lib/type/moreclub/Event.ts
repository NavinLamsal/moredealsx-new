export interface EventList {
    promoted?: boolean
    slug: string
    name: string
    location:string 
    price: string
    currency: {
       symbol: string ,
       icon: string
       },
    event_type: string[],
    banner: string,
    seat_available: number
    id: string;
    start_date: string;
}


export interface BookedEventList {
   id: number;
   event: EventList;
}


export interface EventDetail {
    id: string;
    user: string;
    name: string;
    event_type: string[],
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    price: number;
    event_highlights_title: string;
    event_highlights_description: string;
    currency: Currency;
    event_photo: EventPhoto[];
    event_fee: number;
    max_limit: number;
    seat_available: number;
    lat: number;
    lng: number;
}


export interface Currency{
    name: string,
   code: string,
    symbol: string,
}
    

export interface EventPhoto {
    id: string;
    event:string
    image: string;
}

export interface EventDetails{
        id:number // 1,
        user:string // "64d3b2f1-8296-4140-ad92-0aebe5b07659",
        name:string // "Book a night with Nawaj Ansari",
        description:string // "cdokjnc dcpdjnc dcdcdclknd cdckjndbj cdckjnbjd cdclknd bcdckndbj c",
        location:string // "Pokhara, Lakeside",
        start_date:string // "2025-03-22T05:19:21",
        end_date:string // "2025-03-25T05:19:24",
        price:string // "100.00",
        event_type: string[],
        event_highlights_title:string // "lcdkjinhb hcdclkjndbj mc dcnbdh c dc.lkjdnbj hcndcdhbhc dc;dnbjc ndc.ld;kjnbcj ndc",
        event_highlights_description:string // "vfjiov  dr iie hierge lgre ger su legrgr huer e hgrhu  gr  grhuer huf us u",
        currency:string
        // currency:{
        //     id:number // 1,
        //     name:string // "American Dollar",
        //     symbol:string // "$",
        //     code:string // "USD",
        //     icon:string // "https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/country/icon/united-states-of-america-logo-png-transparent_kslxks"
        // },
        banner:string;
        images: [
            {
                id:number // 1,
                event:number // 1,
                image:string // "https://res.cloudinary.com/dmginqfq4/image/upload/v1/media/event_images/472843809_1124809832442911_3281534456587284890_n_bvbywl"
            }
        ],
        max_limit:number // 10,
        seat_available:number // 10,
        lat:string // "90.900909",
        lng:string // "80.909090",
        event_booked:string // false


    }

