"use client";

import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import BlogPreview from "@/app/components/blog/BlogPreview";
import blogService from "@/app/lib/services/blogService";
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
        <div className="container flex flex-col justify-center m-auto px-4 sm:px-6 md:px-10 lg:px-20">
            <Box width="full" py={16}>
                <VStack spacing={6} align="center">
                    <Box maxW="2xl" textAlign="center">
                        <Heading as="h1" size={["2xl", "3xl", "4xl"]} fontWeight="bold" className="font-anton" color="slate.900" letterSpacing="tight">
                            BLOG
                        </Heading>
                        <Text mt={4} fontSize="lg" color="slate.500" className="font-anybody">
                            Insights, tutorials and stories from our AI community.
                        </Text>
                    </Box>
                </VStack>
            </Box>

            {isLoading && <LoadingSpinner text="Loading blog posts..." />}
            {isError && !isLoading && <ErrorBlock msg="We could not load data. Please try again later." />}
            {!isLoading && !isError && blogPreviews.length === 0 && (
                <Box textAlign="center" py={16} color="slate.500">
                    <Text fontSize="lg">No blog posts published yet. Check back soon.</Text>
                </Box>
            )}
            {!isLoading && !isError && blogPreviews.length > 0 && (
                <>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} pb={4}>
                        {blogPreviews.map((blogPreview, index) => (
                            <BlogPreview key={blogPreview.blog_id || blogPreview.blogPost_id || index} blogPreview={blogPreview} />
                        ))}
                    </SimpleGrid>
                    <Box pb={16}>
                        <Pagination page={page} totalPages={totalPages} onChange={loadPage} />
                    </Box>
                </>
            )}
        </div>
    );
}
