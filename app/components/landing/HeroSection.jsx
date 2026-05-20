import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function HeroSection() {
    return (
        <section className="py-8 sm:py-12 md:py-16 px-4 border-b border-gray-200">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
                <motion.div
                    className="w-full lg:w-1/2 lg:pr-8 xl:pr-16"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                        <motion.span
                            className="block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            AI STUDENTS
                        </motion.span>
                        <motion.span
                            className="block text-blue-500"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            CHAPTER
                        </motion.span>
                    </motion.h1>
                    <motion.p
                        className="mb-4 sm:mb-6 text-gray-700 text-sm sm:text-base"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        We are the AI Student Chapter at the University of Moratuwa. We focus on artificial intelligence, robotics and computer science events, with a focus on providing opportunities to students. Explore our projects, achievements and blogs to see what our community has been building and sharing.
                    </motion.p>
                </motion.div>
                <motion.div
                    className="w-full lg:w-1/2 mt-6 lg:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="relative w-full h-52 sm:h-64 lg:h-80">
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <Image
                                src={'/img/hero-section.png'}
                                alt="AI Students Illustration"
                                fill
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="container mx-auto mt-6 sm:mt-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.9 }}
            >
                <motion.div
                    className="rounded-lg p-4 sm:p-6 py-6 sm:py-10 border-black border-[1px]"
                    whileHover={{
                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                        y: -5
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                    <motion.p
                        className="mb-4 text-sm sm:text-base"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                    >
                        Our work spans the breadth of modern artificial intelligence -
                        from deep learning models and intelligent systems research to
                        applied computer science projects that solve real problems. The
                        chapter exists to share what we learn, recognise the achievements
                        of our peers, and connect AI students with the wider community.
                    </motion.p>
                    <motion.div
                        className="flex flex-wrap justify-around gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                    >
                        <motion.div
                            className="flex flex-col items-center"
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Image src={"/img/dl.png"} alt="Deep Learning" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                            <span className="mt-2 text-xs sm:text-sm">Deep Learning</span>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center"
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Image src={"/img/int.png"} alt="Intelligence" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                            <span className="mt-2 text-xs sm:text-sm">Intelligence</span>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center"
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Image src={"/img/cs.png"} alt="Computer Science" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                            <span className="mt-2 text-xs sm:text-sm">Computer Science</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default HeroSection;