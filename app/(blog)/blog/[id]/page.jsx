"use client";
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import BlogHeader from "@/app/components/blog/BlogHeader";
import blogService from "@/app/lib/services/blogService";
import BlogContent from "@/app/components/blog/BlogContent";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import Image from "next/image";
import { useNav } from '@/app/providers/NavigationProvider';
import BlogComment from "@/app/components/blog/BlogComment";
import Navbar from "@/app/components/common/Navbar";


export default function Page({params}) {
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFoundError, setNotFoundError] = useState(false);
    const {setNavActionButton} = useNav();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchBlogComments = async () => {
            try {
                const apiResult = await blogService.getBlogComments();
                setComments(apiResult || []);
            } catch (error) {
                console.error("Error fetching blog comments:", error);
                setComments([]);
            }
        };
        fetchBlogComments();
    }, []);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setIsLoading(true);
                const blogData = await blogService.getBlogByIdFromAPI(params.id);
                console.log("Fetched blog data:", blogData);
                

                if (!blogData) {
                    setNotFoundError(true);
                } else {
                    setBlog(blogData);
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                setNotFoundError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [params.id]);


    if (isLoading) {
        return (
            <div className="container mx-auto px-4 md:px-8 lg:px-20 xl:px-40 2xl:px-60 mt-8">
                <LoadingSpinner text="Loading blog post..." />
            </div>
        );
    }

    if (notFoundError || !blog) {
        return notFound();
    }

    return (
        <div className="container flex flex-wrap justify-center m-auto gap-4 md:gap-10 lg:gap-20 px-4 md:px-8 lg:px-20 xl:px-40 2xl:px-60">
            <BlogHeader blog={blog}/>
            <div className="w-full flex justify-center">
                <Image
                    src={blog.post_image}
                    alt={"Cover Image"}
                    width={750}
                    height={500}
                    className="w-full md:w-[80%] lg:w-[750px] h-auto mb-8 md:mb-0 object-cover"
                    style={{maxHeight: '500px'}}
                />
            </div>
            <BlogContent blog={blog}/>
            <BlogComment comments={comments} setComments={setComments}/>
        </div>
    );
}