
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function Forum() {
    return (
        <div className="w-full my-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-32">
                <motion.div
                    className="w-full md:w-2/3 flex flex-col"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.h2
                        className="text-6xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        FORUM
                    </motion.h2>
                    <motion.p
                        className="text-lg mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        A space for connection and knowledge exchange. Join students, faculty, and AI enthusiasts to
                        discuss concepts, share resources, tackle challenges, and explore the evolving world of
                        Artificial Intelligence. Engage in thoughtful conversations within our curated community.
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
                            <button
                                className="px-6 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                                VIEW THE FORUM
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="w-full md:w-1/3"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="relative">
                        <div
                            className="absolute top-0 right-0 w-48 h-48 rounded-full -z-10 translate-x-1/4"></div>
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        >
                            <Image
                                src={'/img/frm.png'}
                                width="459"
                                height="460"
                                alt="AI Robot with Dashboard"
                                className="w-full max-w-md mx-auto"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Forum;