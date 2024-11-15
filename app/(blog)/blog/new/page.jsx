'use client';

import BlogEditor from "@/app/components/blog/BlogEditor";

export default function Page() {
    return (
        <div className="container flex flex-wrap justify-center m-auto px-56 gap-20 mt-20">
            <BlogEditor/>
        </div>
    );
}