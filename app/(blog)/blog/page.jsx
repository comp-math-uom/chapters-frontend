"use client";

import React, { useEffect, useState } from "react";
import BlogPreview from "@/app/components/blog/BlogPreview";
import blogService from "@/app/services/blogService";
import CoverImage from '../../../public/img/blogCover.jpg';
import Image from 'next/image'
import { useNav } from "@/app/providers/NavigationProvider";
import { useRouter } from 'next/navigation';

export default function Home() {
    const [blogPreviews, setBlogPreviews] = useState([]);
    const {setNavActionButton} = useNav();
    const router = useRouter();

    useEffect(() => {
        const fetchBlogPreviews = async () => {
            const blogPreviews = await blogService.getBlogPreviews();
            setBlogPreviews(blogPreviews);
        }

        fetchBlogPreviews();
    }, []);


    useEffect(() => {
        setNavActionButton({
            label: 'Write',
            action: () => router.push('/blog/new')
        });

        return () => setNavActionButton({
            label: '', action: () => {
            }
        });
    }, [router, setNavActionButton]);

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
            <div className="container flex flex-wrap justify-center m-auto px-4 sm:px-8 md:px-12 lg:px-20 gap-4 sm:gap-6 md:gap-10 lg:gap-20 mt-8 md:mt-12 lg:mt-20">
                {blogPreviews.map((blogPreview, index) => (
                    <BlogPreview key={index} blogPreview={blogPreview}/>
                ))}
            </div>
        </>
    );
}