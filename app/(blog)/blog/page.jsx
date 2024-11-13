"use client";

import React, {useEffect, useState} from "react";
import BlogPreview from "@/app/components/blog/BlogPreview";
import {Box, Image} from "@chakra-ui/react";
import blogService from "@/app/services/blogService";

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
            <Box boxSize='sm'>
                <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
            </Box>
        <div className="container flex flex-wrap justify-center m-auto px-20 gap-20">
            {blogPreviews.map((blogPreview, index) => (
                <BlogPreview key={index} blogPreview={blogPreview}/>
            ))}
        </div>
        </>
    );
}