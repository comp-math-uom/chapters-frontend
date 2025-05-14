import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function WeAre() {
    return (
        <motion.div
            className="w-full bg-black text-white rounded-3xl p-6 sm:p-8 md:p-12 my-8 md:my-16 ml-4 md:ml-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        WE ARE
                    </motion.h2>
                    <motion.p
                        className="text-base md:text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        As the B.Sc. Hons in Artificial Intelligence cohort at the
                        University of Moratuwa, we embrace the opportunity to
                        lead and innovate. We established this platform as a
                        space to showcase our abilities, foster learning, and
                        build a lasting resource for the AI community in Sri Lanka
                        and beyond. We are driven by intellectual curiosity and
                        the commitment to excellence.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <motion.div
                        className="bg-white p-4 sm:p-6 rounded-3xl w-full max-w-xs sm:max-w-sm md:max-w-md"
                        whileHover={{
                            y: -10,
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        <Image
                            width="429"
                            height="303"
                            src={'/img/weare.png'}
                            alt="AI Students Illustration"
                            className="w-full h-auto"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default WeAre;