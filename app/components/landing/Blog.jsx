import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function Blog() {
    return (
        <div className="w-full my-8 md:my-16">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-32">
                <motion.div
                    className="w-full md:w-1/3 mt-8 md:mt-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 rounded-full bg-primary-100/50 blur-3xl scale-75" />
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.h2
                        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight text-slate-900"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        BLOGS
                    </motion.h2>
                    <motion.p
                        className="text-base md:text-lg mb-6 md:mb-8 text-slate-600 leading-relaxed"
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
                            <button className="px-4 sm:px-6 py-2 sm:py-3 font-medium border-2 border-slate-900 rounded-full shadow-sm hover:bg-slate-900 hover:text-white hover:shadow-md transition-all duration-300">
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