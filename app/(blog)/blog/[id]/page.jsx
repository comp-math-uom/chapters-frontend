"use client";
import {notFound} from 'next/navigation';
import BlogHeader from "@/app/components/blog/BlogHeader";
import blogService from "@/app/services/blogService";
import BlogContent from "@/app/components/blog/BlogContent";
import Image from "next/image";


export default async function Page({ params }) {
    const blogId = Number(params.id);
    const blog = await blogService.getBlog(blogId);
    if (!blog) {
        return notFound();
    }
    return (
        <div className="container flex flex-wrap justify-center m-auto gap-20 px-80">
            <BlogHeader blog={blog}/>
                <Image src={blog.coverImage} alt={"Cover Image"} width={750} height={500} style={{ objectFit: "cover", width: '750px', height: '500px' }} />
            <BlogContent blog={blog}/>
        </div>
    );
}