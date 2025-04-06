import { Blog } from '@/lib/type/CommonType'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { forwardRef } from 'react'

type BlogCardProps = { blog: Blog }

const BlogCard = forwardRef<HTMLDivElement, BlogCardProps>(({ blog }, ref) => {
    return (
        <div className="w-full px-4" ref={ref}>
            <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        width={370}
                        height={200}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="p-5">
                    {/* Published Date */}
                    <span className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded">
                        {moment(blog.publish).format("MMM DD, YYYY")} {/* 📅 Formatted date */}
                    </span>

                    {/* Blog Title */}
                    <h3 className="mt-3">
                        <Link
                            href={`/blog/${blog.slug}`}
                            className="text-xl sm:text-2xl font-semibold text-card-foreground hover:text-primary transition duration-300"
                        >
                            {blog.title}
                        </Link>
                    </h3>

                    {/* Blog Description */}
                    <p className="text-gray-700 text-sm mt-2">{blog.short_description}</p>
                </div>
            </div>
        </div>
    )
}
)

export default BlogCard
