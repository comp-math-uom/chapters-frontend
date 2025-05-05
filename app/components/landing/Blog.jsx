import React from "react";
import Link from "next/link";
import Image from "next/image";

function Blog() {
    return (
        <div className="w-full my-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-32">
                <div className="w-full md:w-1/3">
                    <div className="relative">
                        <div className="absolute top-0 right-0 w-48 h-48 rounded-full -z-10 translate-x-1/4"></div>
                        <Image
                            src={'/img/blog.png'}
                            width="410"
                            height="385"
                            alt="AI Robot with Dashboard"
                            className="w-full max-w-md mx-auto"
                        />
                    </div>
                </div>

                <div className="w-full md:w-2/3 flex flex-col">
                    <h2 className="text-6xl font-bold mb-6">BLOGS</h2>
                    <p className="text-lg mb-8">
                        Gain insights and perspectives directly from our AI community. The
                        blog features articles from students and lecturers covering
                        emerging technologies, project analyses, learning experiences, and
                        thoughtful commentary on the AI landscape. Stay informed with
                        unique viewpoints from the forefront of our program.
                    </p>
                    <div>
                        <Link href="/blog">
                            <button className="px-6 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                                READ LATEST ARTICLES
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;