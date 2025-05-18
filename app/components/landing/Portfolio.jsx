import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function Portfolio() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-8 md:py-12 px-4">
            <motion.div
                className="max-w-6xl w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="overflow-hidden"
                >
                    <Image
                        src={'/img/portfolio.png'}
                        alt="Portfolio Illustration"
                        width={1081}
                        height={381}
                        className="mx-auto w-full h-auto"
                    />
                </motion.div>
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 mt-4 md:mt-0">
                    <motion.div
                        className="w-full md:w-2/5 flex flex-col text-center md:text-right"
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full font-black mt-2 md:mt-6">PORTFOLIO</h1>
                    </motion.div>
                    <motion.div
                        className="w-full md:w-3/5 flex flex-col"
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-700 text-center md:text-left">
                            Explore the results of our learning. This portfolio presents a diverse collection of
                            projects by University of Moratuwa AI students, ranging from in-depth research to practical
                            applications. Witness the technical skills, creative approaches, and problem-solving
                            capabilities we cultivate.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/portfolio">
                                    <button
                                        className="mt-4 md:mt-6 inline-block border-2 border-black px-4 sm:px-6 py-2 font-bold rounded-full hover:bg-black hover:text-white transition">
                                        BROWSE PROJECTS
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default Portfolio;