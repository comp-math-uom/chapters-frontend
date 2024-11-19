"use client";

import React, { useEffect, useState } from "react";
import BlogPreview from "@/app/components/blog/BlogPreview";
import blogService from "@/app/services/blogService";
import CoverImage from '../../../public/img/blogCover.jpg';
import Image from 'next/image'

export default function Home() {
    const [blogPreviews, setBlogPreviews] = useState([]);

    useEffect(() => {
        const fetchBlogPreviews = async () => {
            const blogPreviews = await blogService.getBlogPreviews();
            setBlogPreviews(blogPreviews);
        }

        fetchBlogPreviews();
    }, []);

    return (
        <>
            <div className="w-full h-[400px] relative">
                <Image
                    src={CoverImage}
                    alt='Blog Cover Image'
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="container flex flex-wrap justify-center m-auto px-20 gap-20 mt-20">
                {blogPreviews.map((blogPreview, index) => (
                    <BlogPreview key={index} blogPreview={blogPreview}/>
                ))}
            </div>
        </>
    );
}