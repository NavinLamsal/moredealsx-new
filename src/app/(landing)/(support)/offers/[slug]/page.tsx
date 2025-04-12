import Image from "next/image";
import moment from "moment";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getBlogDetails, getOfferDetails } from "@/lib/action/PubilcCommon";
import { Blog } from "@/lib/type/CommonType";
import CommentSection from "@/components/moreclub/Blog/CommentSection";
import FAQRecommendation from "@/components/moreclub/Blog/FAQRecommendation";
import { Offer, OfferDetails } from "@/lib/action/PublicCommonClient";
import { getOfferStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import OfferRecommendation from "@/components/moreclub/Blog/OfferRecomendation";
import Heading from "@/components/ui/heading";

type Props = {
    params: Promise<{ slug: string }>;
};

// ✅ Improved Metadata Function
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const canonicalUrl = `https://moredealsclub.com/offers/${slug}`;

    try {
        const blogs: OfferDetails = await getOfferDetails(slug);
        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: blogs.title,
            description: blogs.short_description,
            keywords: blogs.short_description,
            robots: "index, follow",
            openGraph: {
                url: canonicalUrl,
                title: blogs.title,
                description: blogs.short_description,
                type: "article",
                images: [...Object.values(blogs.banner), ...previousImages],
            },
            twitter: {
                card: "summary_large_image",
                title: blogs.title,
                description: blogs.short_description,
                images: blogs.banner,
            },
        };
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return {
            title: "Blog Not Found",
            description: "The requested blog post could not be found.",
        };
    }
}

// ✅ Optimized BlogDetail Component
async function BlogDetail({ slug }: { slug: string }) {
    try {
        const blogs = await getOfferDetails(slug);
        const { statusText, badgeColor } = getOfferStatus(blogs.from_date, blogs.to_date)
        return (
            <div className="max-w-5xl mx-auto">
                {/* Blog Image */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                    {blogs.title}
                </h1>
                <div className="relative w-full mb-6">
                    <Image
                        src={blogs.banner}
                        className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-lg"
                        alt={blogs.title}
                        width={900}
                        height={500}
                        priority
                    />
                </div>

                {/* Blog Content */}
                <div className="px-4 lg:px-0">


                    {/* Published Date (Formatted) */}
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {statusText}
                    </p>

                    <div
                        className="prose max-w-full prose-headings:text-card-foreground text-card-foreground prose-strong:text-card-foreground text-justify "

                    >
                        <p>{blogs.short_description}</p>
                    </div>

                    {/* Blog Body */}

                    {(blogs.price !== null && blogs.price !== 0) &&
                        <>
                            <span className="text-xs leading-tight">Only At {blogs.currency_symbol}{blogs.price}</span>
                        </>
                    }

                    {(blogs?.discount_percentage !== null && Number(blogs?.discount_percentage ?? 0) > 0) &&
                        <>
                            <div className="text-xs  leading-none">Discount {blogs?.discount_percentage}% off</div>
                        </>
                    }

                    {(blogs?.discount_amount !== null && Number(blogs?.discount_amount) > 0) &&
                        <>

                            <span className="text-xs leading-tight">Discount {blogs?.currency_symbol}{blogs?.discount_amount} off</span>
                        </>
                    }

                    <div
                        className="prose max-w-full prose-headings:text-card-foreground text-card-foreground prose-strong:text-card-foreground text-justify mt-4 "

                    >
                        <p>{blogs.description}</p>
                    </div>
                    {/* <div
                        className="prose max-w-full prose-headings:text-card-foreground text-card-foreground prose-strong:text-card-foreground text-justify "
                        dangerouslySetInnerHTML={{ __html: blogs.body }}
                    /> */}

                    {/* Author Section */}
                    <div className="border-t mt-8 pt-4">
                        <p className="font-semibold text-gray-700 dark:text-gray-300">Location: {blogs.address ?? "N/A"}</p>
                    </div>
                    {blogs.url && blogs.url !== "" &&
                        <div>
                            <p className="font-semibold text-gray-700 dark:text-gray-300"> Visit <a href={blogs.url}><Button variant="link">{blogs.url}</Button></a></p>
                        </div>
                    }
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Published on: {moment.utc(blogs.created_at).local().format("MMMM DD, YYYY h:mm A")}
                    </p>
                    {blogs.updated_at && blogs.created_at !== blogs.updated_at && <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Updated on: {moment.utc(blogs.updated_at).local().format("MMMM DD, YYYY h:mm A")}
                    </p>}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
        return (
            <div className="text-center py-10">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Offer Not Found
                </h2>
                <p className="text-gray-500">The requested offer could not be retrieved.</p>
            </div>
        );
    }
}

// ✅ Optimized Page Component with Suspense
const Page = async ({ params }: Props) => {
    const { slug } = await params
    return (
        <div className="container mx-auto px-4 py-10">

            <div className="grid grid-cols-12 gap-3 max-w-6xl mx-auto">
                <div className="col-span-12 lg:col-span-8 ">

                    <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
                        <BlogDetail slug={slug} />
                    </Suspense>



                </div>
                <div className="col-span-12 lg:col-span-4">
                <div className="px-2">

                <Heading title="Offers You May Like"/>
                </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-10">
                        
                        <OfferRecommendation  title={slug}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Page;
