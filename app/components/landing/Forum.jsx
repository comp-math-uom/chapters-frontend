import React from "react";
import Link from "next/link";
import Image from "next/image";

function Forum() {
    return (
        <div className="w-full my-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-32">
                <div className="w-full md:w-2/3 flex flex-col">
                    <h2 className="text-6xl font-bold mb-6">FORUM</h2>
                    <p className="text-lg mb-8">
                        A space for connection and knowledge exchange. Join students, faculty, and AI enthusiasts to
                        discuss concepts, share resources, tackle challenges, and explore the evolving world of
                        Artificial Intelligence. Engage in thoughtful conversations within our curated community.
                    </p>
                    <div>
                        <Link href="/blog">
                            <button
                                className="px-6 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                                VIEW THE FORUM
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-full md:w-1/3">
                    <div className="relative">
                        <div
                            className="absolute top-0 right-0 w-48 h-48 rounded-full -z-10 translate-x-1/4"></div>
                        <Image
                            src={'/img/frm.png'}
                            width="459"
                            height="460"
                            alt="AI Robot with Dashboard"
                            className="w-full max-w-md mx-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forum;