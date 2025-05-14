import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function Blog() {
    return (
        <div className="w-full my-8 md:my-16 ml-4 md:ml-0">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-32">
                <motion.div
                    className="w-full md:w-1/3 mt-8 md:mt-0"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="relative">
                        <div className="absolute top-0 right-0 w-48 h-48 rounded-full -z-10 translate-x-1/4"></div>
                        <motion.div
                            animate={{
                                rotate: [0, 5, 0, -5, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut"
                            }}
                        >
                            <Image
                                src={'/img/blog.png'}
                                width="410"
                                height="385"
                                alt="AI Robot with Dashboard"
                                className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full md:w-2/3 flex flex-col"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        BLOGS
                    </motion.h2>
                    <motion.p
                        className="text-base md:text-lg mb-6 md:mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Gain insights and perspectives directly from our AI community. The
                        blog features articles from students and lecturers covering
                        emerging technologies, project analyses, learning experiences, and
                        thoughtful commentary on the AI landscape. Stay informed with
                        unique viewpoints from the forefront of our program.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/blog">
                            <button className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                                READ LATEST ARTICLES
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Blog;