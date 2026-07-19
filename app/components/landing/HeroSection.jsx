import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function HeroSection() {
    return (
        <section className="py-8 sm:py-12 md:py-16 px-4 border-b border-slate-200">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
                <motion.div
                    className="w-full lg:w-1/2 lg:pr-8 xl:pr-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight leading-tight">
                        <motion.span
                            className="block text-slate-900"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            AI STUDENTS
                        </motion.span>
                        <motion.span
                            className="block text-primary-600"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            CHAPTER
                        </motion.span>
                    </motion.h1>
                    <motion.p
                        className="mb-4 sm:mb-6 text-slate-600 text-sm sm:text-base leading-relaxed"
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="relative w-full h-52 sm:h-64 lg:h-80">
                        <div className="absolute inset-0 -z-10 rounded-full bg-primary-100/60 blur-3xl scale-75" />
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
                    className="rounded-2xl p-4 sm:p-6 py-6 sm:py-10 bg-white border border-slate-200 shadow-card"
                    whileHover={{
                        boxShadow: "0px 20px 40px -12px rgba(30, 58, 138, 0.18)",
                        y: -5
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                    <motion.p
                        className="mb-4 text-sm sm:text-base text-slate-600 leading-relaxed"
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
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-50">
                                <Image src={"/img/dl.png"} alt="Deep Learning" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            <span className="mt-2 text-xs sm:text-sm font-medium text-slate-600">Deep Learning</span>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center"
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-50">
                                <Image src={"/img/int.png"} alt="Intelligence" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            <span className="mt-2 text-xs sm:text-sm font-medium text-slate-600">Intelligence</span>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center"
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-50">
                                <Image src={"/img/cs.png"} alt="Computer Science" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            <span className="mt-2 text-xs sm:text-sm font-medium text-slate-600">Computer Science</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default HeroSection;