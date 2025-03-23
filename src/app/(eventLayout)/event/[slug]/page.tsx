import ImageCarousel from "@/components/carousel/ImageCarousel";
import EventBooking from "@/components/Events/EventBooking";
import EventsMap from "@/components/Events/EventsMap";
// import MapboxNavigationComponent from "@/components/MapBox/MapboxNavigationComponent";
// import MapboxLocation from "@/components/MapBox/MapView";
import { getEventDetails } from "@/lib/action/PubilcCommon";
import { Calendar, MapPin } from "lucide-react";
import moment from "moment";
import { Metadata, ResolvingMetadata } from "next";


import { Suspense } from "react";





type Props = {

  params: Promise<{ slug: string }>
};

// ✅ Improved Metadata Function
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const canonicalUrl = `https://moredealsclub.com/event/${slug}`;

  try {
    const events = await getEventDetails(slug);
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: events.name,
      description: events.description,
      keywords: events.description,
      robots: "index, follow",
      openGraph: {
        url: canonicalUrl,
        title: events.name,
        description: events.description,
        type: "article",
        images: [...Object.values(events.event_photo.map((item) => item.image)), ...previousImages],
      },
      twitter: {
        card: "summary_large_image",
        title: events.name,
        description: events.description,
        images: [...Object.values(events.event_photo.map((item) => item.image)), ...previousImages],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Event Not Found",
      description: "The requested Event could not be found.",
    };
  }
}



async function EventDetailPage({ slug }: { slug: string }) {
  try {
    const events = await getEventDetails(slug);

    return (
      <div className="font-sans ">
        {/* Event Banner */}

        <Suspense>
          <ImageCarousel images={[{ id: events.id, event: events.id, image: events.banner }, ...events.event_photo]} title={events.name} description={`${events.location} | ${moment(events.start_date).format("ddd, MMM D, YYYY")}`} />
        </Suspense>


        <div className="text-black dark:text-white  flex-col p-4 rounded-lg flex lg:hidden text-center">
          <div className="border-b border-primary lg:border-b-0 py-4">
            <h1 className="text-lg  lg:text-xl font-bold mb-4">{events.name}</h1>
            <div className="flex items-center justify-center gap-3 ">
              {events.event_type.map((item, index) => (
                <p key={index} className="inline-flex px-1 py-0.5 rounded text-sm bg-[hsla(264,68%,49%,0.2)] text-primary">{item}</p>
              ))}
            </div>
          </div>

          {/* <p className="mt-2 text-sm line-clamp-2">{events.location} | {moment(events.start_date).format("ddd, MMM D, YYYY")}</p> */}

        </div>

        {/* Event Details */}
        <div className="max-w-5xl mx-auto p-0 md:p-4">
          <div className="lg:flex items-center gap-3 hidden">
            {events.event_type.map((item, index) => (
              <p key={index} className="inline-flex px-1 py-0.5 rounded text-sm bg-[hsla(264,68%,49%,0.2)] text-primary">{item}</p>
            ))}

          </div>
          <div className="flex flex-col-reverse lg:flex-row gap-6">
            {/* Left Section */}
            <div className="flex-1 ">
              {/* Description */}
              <div className="border-y border-primary py-2 lg:border-y-0">
                <h2 className="text-xl font-bold mb-4">Inside the Event</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {events.description}
                </p>

              </div>

              {/* Additional Info */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Highlights</h3>
                <h4 className="text-base font-medium mb-4">
                  {events.event_highlights_title}
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed" >
                  {events.event_highlights_description}
                </p>

              </div>
            </div>

            {/* Right Section (Booking) */}
            <div className="md:w-[300px]">
              <div className="bg-card rounded-lg shadow-md p-4">
                <h3 className="text-lg font-bold mb-4">Pricing & Booking</h3>
                <p className="text-sm text-muted-foreground ">
                  Price: {events.currency.symbol}&nbsp;{events.price}
                </p>

                <Suspense>
                  <EventBooking slug={slug} />
                </Suspense>
              </div>
              <div className="mt-6 bg-card rounded-lg shadow-md p-4">
                <h3 className="text-lg font-bold mb-4">Venue & Time</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 flex gap-2 items-center">
                  <MapPin size={14} className="text-primary text-xs md:text-sm" />  {events.location}
                </p>
                <p>

                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 flex flex-1 gap-2 items-center">
                  <Calendar size={14} className="text-primary text-xs md:text-sm" /><strong> Start From:</strong> {moment(events.start_date).format("ddd, MMM D, YYYY , h:mm A")}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 flex flex-1 gap-2 items-center">
                  <Calendar size={14} className="text-red-500 text-xs md:text-sm" /><strong> Ends At:</strong>{moment(events.end_date).format("ddd, MMM D, YYYY , h:mm A")}
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white py-6 mt-8">
        <EventsMap lat={events.lat} lng={events.lng}/>
        </footer>
      </div>
    );

  } catch (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Blog Not Found
        </h2>
        <p className="text-gray-500">The requested blog could not be retrieved.</p>
      </div>
    );
  }




}



const Page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params;
  return (
    <div className="">

      <div className="grid grid-cols-12 gap-3 max-w-6xl mx-auto">
        <div className="col-span-12">

          <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
            <EventDetailPage slug={slug} />
          </Suspense>



        </div>
        {/* <div className="col-span-12 lg:col-span-4">
                      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-10">
                              <FAQRecommendation />
                      </div>
                  </div> */}
      </div>

    </div>
  );
};

export default Page
