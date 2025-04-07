import Image from "next/image";
import moment from "moment";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getBlogDetails } from "@/lib/action/PubilcCommon";
import { Blog } from "@/lib/type/CommonType";
import CommentSection from "@/components/moreclub/Blog/CommentSection";
import FAQRecommendation from "@/components/moreclub/Blog/FAQRecommendation";

type Props = {
    params: Promise<{ slug: string }>;
};

// ✅ Improved Metadata Function
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const canonicalUrl = `https://moredealsclub.com/blog/${slug}`;

    try {
        const blogs: Blog = await getBlogDetails(slug);
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
                images: [...Object.values(blogs.image), ...previousImages],
            },
            twitter: {
                card: "summary_large_image",
                title: blogs.title,
                description: blogs.short_description,
                images: blogs.image,
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
        const blogs = await getBlogDetails(slug);

        return (
            <div className="max-w-5xl mx-auto">
                {/* Blog Image */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                    {blogs.title}
                </h1>
                <div className="relative w-full mb-6">
                    <Image
                        src={blogs.image}
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
                        Published on: {moment(blogs.publish).format("MMMM DD, YYYY")}
                    </p>

                    {/* Blog Body */}
                    <div
                        className="prose max-w-full prose-headings:text-card-foreground text-card-foreground prose-strong:text-card-foreground text-justify "
                        dangerouslySetInnerHTML={{ __html: blogs.body }}
                    />

                    {/* Author Section */}
                    <div className="border-t mt-8 pt-4">
                        <p className="font-semibold text-gray-700 dark:text-gray-300">{blogs.author}</p>
                    </div>
                    <CommentSection slug={blogs.slug} />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
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

// ✅ Optimized Page Component with Suspense
const Page = async ( { params }: Props) => {
    const {slug}= await params
    return (
        <div className="container mx-auto px-4 py-10">

            <div className="grid grid-cols-12 gap-3 max-w-6xl mx-auto">
                <div className="col-span-12 lg:col-span-8 ">

                    <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
                        <BlogDetail slug={slug} />
                    </Suspense>



                </div>
                <div className="col-span-12 lg:col-span-4">
                    {/* Support & Recent Posts */}
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-10">
                            <FAQRecommendation  title={slug}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Page;
