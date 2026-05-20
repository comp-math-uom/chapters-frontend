"use client";

import React, { useEffect, useState } from "react";
import BlogPreview from "@/app/components/blog/BlogPreview";
import blogService from "@/app/lib/services/blogService";
import CoverImage from '../../../public/img/blogCover.jpg';
import Image from 'next/image';
import { useNav } from "@/app/providers/NavigationProvider";
import { useRouter } from 'next/navigation';
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ErrorBlock from "@/app/components/common/ErrorBlock";
import Pagination from "@/app/components/common/Pagination";
import { useAuth } from '@/app/providers/Providers';

const PAGE_SIZE = 9;

export default function Home() {
    const [blogPreviews, setBlogPreviews] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { setNavActionButton } = useNav();
    const router = useRouter();
    const { auth, initialized } = useAuth();

    const loadPage = async (pageToLoad = 1) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const result = await blogService.getBlogPreviewsPage({ page: pageToLoad, limit: PAGE_SIZE });
            setBlogPreviews(result.items);
            setTotal(result.total);
            setPage(result.page);
        } catch (err) {
            console.error(err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPage(1);
    }, []);

    useEffect(() => {
        if (initialized && auth?.authenticated) {
            setNavActionButton({
                label: '+ New Post',
                action: () => router.push('/blog/new'),
            });
        } else {
            setNavActionButton({ label: '', action: () => { } });
        }
        return () => setNavActionButton({ label: '', action: () => { } });
    }, [router, setNavActionButton, initialized, auth?.authenticated]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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
            {isLoading ? (
                <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20 mt-8 md:mt-12 lg:mt-20">
                    <LoadingSpinner text="Loading blog posts..." />
                </div>
            ) : (
                <>
                    <div
                        style={{ paddingBottom: '20px' }}
                        className="container flex flex-wrap justify-center m-auto px-4 sm:px-8 md:px-12 lg:px-20 gap-4 sm:gap-6 md:gap-10 lg:gap-20 mt-8 md:mt-12 lg:mt-20"
                    >
                        {blogPreviews.map((blogPreview, index) => (
                            <BlogPreview key={blogPreview.blog_id || blogPreview.blogPost_id || index} blogPreview={blogPreview} />
                        ))}
                    </div>
                    <div className="container mx-auto" style={{ paddingBottom: '60px' }}>
                        <Pagination page={page} totalPages={totalPages} onChange={loadPage} />
                    </div>
                </>
            )}
            {isError && !isLoading && <ErrorBlock msg="We could not load data. Please try again later." />}
        </>
    );
}
