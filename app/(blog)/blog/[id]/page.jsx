"use client";

import {notFound} from 'next/navigation';
import { notFound } from 'next/navigation';
import BlogHeader from "@/app/components/blog/BlogHeader";
import blogService from "@/app/services/blogService";
import BlogContent from "@/app/components/blog/BlogContent";


export default async function Page({ params }) {
    const blogId = Number(params.id);
    const blog = await blogService.getBlog(blogId);
    if (!blog) {
        return notFound();
    }
    return (
        <div className="container flex flex-wrap justify-center m-auto px-20 gap-20">
            <BlogHeader blog={blog}/>
            <BlogContent blog={blog}/>
        </div>
    );
}