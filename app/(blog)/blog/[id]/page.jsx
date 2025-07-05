"use client";
import { notFound } from 'next/navigation';
import BlogHeader from "@/app/components/blog/BlogHeader";
import blogService from "@/app/lib/services/blogService";
import BlogContent from "@/app/components/blog/BlogContent";
import Image from "next/image";


export default async function Page({params}) {
    const blogId = Number(params.id);
    const blog = await blogService.getBlog(blogId);
    if (!blog) {
        return notFound();
    }
    return (
        <div className="container flex flex-wrap justify-center m-auto gap-4 md:gap-10 lg:gap-20 px-4 md:px-8 lg:px-20 xl:px-40 2xl:px-60">
            <BlogHeader blog={blog}/>
            <div className="w-full flex justify-center">
                <Image
                    src={blog.coverImage}
                    alt={"Cover Image"}
                    width={750}
                    height={500}
                    className="w-full md:w-[80%] lg:w-[750px] h-auto mb-8 md:mb-0 object-cover"
                    style={{maxHeight: '500px'}}
                />
            </div>
            <BlogContent blog={blog}/>
        </div>
    );
}